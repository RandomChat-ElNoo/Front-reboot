import React, { useEffect, useState } from 'react'
import LinkWarningModal from './LinkWarningModal'
import usePageStore from '../../store/usePageStore'
import useOptionStore from '../../store/useOptionStore'

interface ReplaceUrlProps {
  text: string
  className: string
  isImage: boolean
  isMine: boolean
}

export default function ReplaceUrl({
  text,
  className,
  isImage,
  isMine,
}: ReplaceUrlProps) {
  const [linkWarningModal, setLinkWarningModal] = useState(false)
  const [useImgTag, setUseImgTag] = useState(false)
  const { isGroupChatImgPreview, isRandomChatImgPreview } = useOptionStore()
  const { page } = usePageStore()
  const color = isMine ? 'bg-chat-box-me' : 'bg-chat-box'
  const urlRegex =
    /(?:https:\/\/)(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}(?:[-a-zA-Z0-9@:%_+.~#?&/=]*)/g

  const handleClickLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setLinkWarningModal(true)
  }
  const handleImg = () => {
    window.open(text)
  }

  const parts = text.split(urlRegex)

  const matches = text.match(urlRegex)

  useEffect(() => {
    const isImg = parts.length === 2 && matches?.length === 1 && isImage
    if (!isImg) {
      setUseImgTag(false)
    }

    if (page === 1) {
      setUseImgTag(isImg && isGroupChatImgPreview)
    }

    if (page === 2) {
      setUseImgTag(isImg && isRandomChatImgPreview)
    }
  }, [isImage, page])

  const linkifiedText = parts.reduce(
    (acc, part, index) => {
      acc.push(part)
      if (!(matches && matches[index])) return acc
      acc.push(
        <>
          <LinkWarningModal
            link={matches[index]}
            open={linkWarningModal}
            setter={setLinkWarningModal}
          />
          {useImgTag ? (
            <button className="h-fit w-fit" onClick={handleImg}>
              <img
                className="h-auto max-h-450pxr w-full max-w-700pxr object-contain"
                key={index}
                src={matches[index]}
              />
            </button>
          ) : (
            <>
              <a
                key={index}
                href={matches[index]}
                onClick={handleClickLink}
                className={`${className} text-blue-400 hover:underline`}
              >
                {matches[index]}
              </a>
            </>
          )}
        </>,
      )

      return acc
    },
    [] as (string | JSX.Element)[],
  )

  return useImgTag ? (
    <>{linkifiedText}</>
  ) : (
    <div
      className={`${color} max-w-500pxr text-wrap break-words rounded-[15px] px-15pxr py-7pxr`}
    >
      {linkifiedText}
    </div>
  )
}
