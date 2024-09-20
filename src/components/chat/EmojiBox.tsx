import { CloseOutlined } from '@ant-design/icons'

interface EmojiProps {
  onClickEmoji: (emojiName: string) => void
  closeEmoji: () => void
}

const emojiArray = [
  { name: 'hi', src: '/imgs/emojis/angry.png' },
  { name: 'bye', src: '/imgs/emojis/bye.png' },
  { name: 'lol', src: '/imgs/emojis/lol.png' },
  { name: 'angry', src: '/imgs/emojis/angry.png' },
  { name: 'dizzy', src: '/imgs/emojis/dizzy.png' },
  { name: 'freak', src: '/imgs/emojis/freak.png' },
]

export default function EmojiBox({ onClickEmoji, closeEmoji }: EmojiProps) {
  return (
    <div className="flex w-full max-w-340pxr flex-col bg-background-sidebar">
      <section className="flex h-40pxr w-full flex-row items-center justify-between px-10pxr">
        <div />
        <p className="text-18pxr">이모지</p>
        <CloseOutlined
          onClick={closeEmoji}
          style={{ fontSize: '28px', color: 'white' }}
        />
      </section>
      <section className="grid h-230pxr grid-cols-3 gap-5pxr overflow-y-scroll p-10pxr">
        {emojiArray.map((item) => (
          <button
            onClick={() => {
              onClickEmoji(item.name)
            }}
            className="aspect-square w-full shrink-0"
            key={item.name}
          >
            <img className="aspect-square object-contain" src={item.src} />
          </button>
        ))}
      </section>
    </div>
  )
}
