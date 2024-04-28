// imports
import MonocleEmoji from "@souhaildev/reactemojis/src/components/monocle";

export default function SearchBox(): React.ReactElement {
  // variables

  // functions

  // returns
  return (
    <div className='animate__bounceIn container items-center flex justify-center py-44'>
      <div className="w-5/6 lg:w-2/4 mx-auto rounded-3xl shadow-2xl bg-neutral-50 bg-opacity-20 backdrop-blur-md container py-16">
        <div className="w-full h-full flex items-center justify-center text-3xl font-bold">
          <div className="flex flex-col gap-5 items-center">
            <MonocleEmoji className='mx-auto' emojiStyle='2' style={{width: 200, height: 200}} />
            <span className="animate__animated animate__pulse animate__infinite">Searching for an available user</span>
          </div>
        </div>
      </div>
    </div>
  )
}