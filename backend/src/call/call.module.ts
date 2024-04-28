import { Module } from '@nestjs/common';
import { CallService } from './call.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'availableUsersQueue',
    }),
    BullModule.registerQueue({
      name: 'callQueue',
    }),
  ],
  controllers: [],
  providers: [CallService],
})
export class CallModule {}
