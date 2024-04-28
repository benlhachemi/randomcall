import { Injectable } from '@nestjs/common';
import { User, Room, SocketResponse } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(5555, { cors: { origin: '*' } })
export class CallService {
  @WebSocketServer()
  private readonly server: Server;

  constructor(
    @InjectQueue('availableUsersQueue')
    private availableUsersQueue: Queue<User>,
    @InjectQueue('callQueue') private callQueue: Queue<Room>,
  ) {}

  // initiate a new room for two users
  private async initRoom(
    currentUser: User,
    availableUser: User,
  ): Promise<Room> {
    // create a new room instance
    const room: Room = {
      roomId: uuidv4().substring(0, 5),
      availableUser,
      currentUser,
      roomURL: `/room?roomID=${uuidv4().substring(0, 5)}`,
    };

    // save room to DB
    await this.callQueue.add(room);

    return room;
  }

  // search for available users on the queue (redis)
  private async findAvailableUser(): Promise<User | null> {
    // check DB for available users
    const isUserAvailable: number = await this.availableUsersQueue.count();

    // case 1: no user was found
    if (!isUserAvailable) return null;

    // case 2: DB is not empty
    // we get the ID of the first user on the waiting queue
    const { data } = await this.availableUsersQueue.getNextJob();

    // we return the user
    return data;
  }

  // remove found user from the queue (redis)
  private async unregisterAvailableUser(user: User): Promise<void> {
    await this.availableUsersQueue.removeJobs(user.id);
  }

  // add current user to the queue (redis)
  private async registerAvailableUser(user: User): Promise<void> {
    await this.availableUsersQueue.add(user, { jobId: user.id });
  }

  // main service
  @SubscribeMessage('events')
  public async matchMaking(
    @MessageBody() data?: string,
    @ConnectedSocket() client?: Socket,
  ): Promise<any> {
    // new websocket request to start the game
    console.log('NEW WEBSOCKET REQUEST WAS RECEIVED');

    // create an user instance for current user
    const id = uuidv4().substring(0, 5);
    const currentUser: User = { id, socketId: client.id };

    // call findAvailableUser method
    const availableUser: User = await this.findAvailableUser();

    // case 1: user not found
    if (!availableUser) {
      // we need to register current user on the 'available users' list
      await this.registerAvailableUser(currentUser);

      // let the client knwo that no available user foud and that he's now on queue
      const socketResponse: SocketResponse = {
        isUserFound: false,
        message: 'no user was found. you are now on queue',
        room: null,
      };
      client.emit('events', socketResponse);
      return 0;
    }

    // case 2: user found

    // init a room
    const room = await this.initRoom(currentUser, availableUser);

    // create a socketResponse object
    const socketResponse: SocketResponse = {
      isUserFound: true,
      message: 'an available user was found.',
      room,
    };

    // we need now to remove the found user from the 'available users' list
    await this.unregisterAvailableUser(availableUser);

    // we need to inform the user on queue that another user was found
    // Retrieve the socket instance using the ID
    const socket = this.server.sockets.sockets.get(availableUser.socketId);
    if (!socket) return console.log('socket not connected'); // TODO: handle socket no longer connected (user left)
    socket.emit('call', socketResponse);

    client.emit('events', socketResponse);
    return 0;
  }
}
