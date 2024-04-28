import { Button } from "@/components/ui/button"
import FireEmoji from "@souhaildev/reactemojis/src/components/fire";
import HeartEmoji from "@souhaildev/reactemojis/src/components/heart-eyes";
import CoolEmoji from "@souhaildev/reactemojis/src/components/cool";
import SparklesEmoji from "@souhaildev/reactemojis/src/components/sparkles";

export default function Home({connect}: {connect: () => void}): React.ReactElement {
  return (
    <div className='container space-y-20'>
      <div className='space-y-10 lg:w-2/4 mx-auto pt-20'>
        <div className='flex gap-3 item-center justify-between'>
          <HeartEmoji className='mx-auto' emojiStyle='2' style={{width: 170, height: 170}} />
          <FireEmoji className='mx-auto' style={{width: 170, height: 170}} />
          <CoolEmoji className='mx-auto' emojiStyle='2' style={{width: 170, height: 170}} />
        </div>
        <h1 className='text-3xl md:text-6xl xl:text-8xl font-black'>RandomCaller</h1>
        <h6 className='text-md text-neutral-400'>meet random users and start talking with them to practice your english and learn the culture of other people around the world.</h6>
      </div>

      <Button 
        className='dark w-80 h-20 mx-auto rounded-full text-xl font-bold shadow-2xl bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-gradient-to-r transition-all hover:from-pink-600 hover:to-yellow-400 animate__animated animate__pulse animate__infinite flex items-center gap-2 text-neutral-50'
        onClick={connect}
      >
        <span>Start Random Call</span>
        <SparklesEmoji style={{width: 40, height: 40}} />
      </Button>
    </div>
  )
}