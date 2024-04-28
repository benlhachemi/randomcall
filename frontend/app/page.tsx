'use client'

import { io, Socket } from 'socket.io-client'
import Home from '@/components/home'
import SearchBox from '@/components/search-box'
import ConnectingBox from '@/components/connecting-box'
import ConnectingDoneBox from '@/components/connected-done-box'
import SearchFailedBox from '@/components/search-failed-box'
import SearchDoneBox from '@/components/search-done-box'
import { useState, useRef } from 'react'
import sleep from '@/components/sleep'
import { SocketResponse } from '@/types'
import { useRouter } from 'next/navigation'

export default function HomePage(): React.ReactElement {
  // variables
  const [step, setStep] = useState<'NOT_STARTED' | 'CONNECTING' | 'CONNECTED' | 'SEARCHING' | 'SEARCH_FAILED' | 'SEARCH_DONE'>('NOT_STARTED')
  let socketInstance = useRef<Socket | null | undefined>(null)
  let socketResponse = useRef<SocketResponse | null>(null)
  const router = useRouter()

  // functions
  const connect = async (): Promise<void> => {
    // switch state to connecting
    setStep('CONNECTING')
    // @ts-ignore
    const socket = io(process.env.BACKEND_ENDPOINT)

    socket.on('connect', async () => {
      await sleep(5000)
      setStep('CONNECTED')

      // send request to server to start matchmaking
      await sleep(3000)
      setStep('SEARCHING')
      socket.emit('events', null)
    })

    socket.on('events', async (event: SocketResponse) => {
      await sleep(5000)
      if (event.room?.roomURL) {
        router.push(event.room?.roomURL)
        return 0
      }
      if (event.isUserFound) {
        socketInstance.current = socket
        socketResponse.current = event
        return 0
      }
      setStep('SEARCH_FAILED')
    })

    socket.on('call', async (event: SocketResponse) => {
      if (!event.room?.roomURL) {
        setStep('SEARCH_DONE')
        await sleep(3000)
        return 0
      }
      router.push(event.room?.roomURL)
    })
  }


  // returns
  if (step === 'NOT_STARTED') return <Home connect={connect} />
  if (step === 'CONNECTING') return <ConnectingBox />
  if (step === 'CONNECTED') return <ConnectingDoneBox />
  if (step === 'SEARCHING') return <SearchBox />
  if (step === 'SEARCH_FAILED') return <SearchFailedBox />
  if (step === 'SEARCH_DONE') return <SearchDoneBox />
  return <div>error</div>
}