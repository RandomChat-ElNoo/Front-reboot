import { CloseOutlined } from '@ant-design/icons'
import { EMOJI_ARRAY } from '../../constant/emoji'

interface EmojiProps {
  onClickEmoji: (emojiName: string) => void
  closeEmoji: () => void
}

export default function EmojiBox({ onClickEmoji, closeEmoji }: EmojiProps) {
  return (
    <div className="flex w-full max-w-340pxr flex-col">
      <section className="flex h-40pxr w-full flex-row items-center justify-between bg-background-sidebar-bottom px-10pxr">
        <div />
        <p className="text-18pxr">이모지</p>
        <CloseOutlined
          onClick={closeEmoji}
          style={{ fontSize: '28px', color: 'white' }}
        />
      </section>
      <section className="grid h-230pxr grid-cols-3 gap-5pxr overflow-y-scroll bg-background-sidebar p-10pxr">
        {EMOJI_ARRAY.map((item) => (
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
