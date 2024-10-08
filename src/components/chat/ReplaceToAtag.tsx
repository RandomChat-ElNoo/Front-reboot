import React, { useEffect, useState } from 'react'
import LinkWarningModal from './LinkWarningModal'
import useOptionStore from '../../store/useOptionStore'
import useGlobalStateStore from '../../store/useGlobalStateStore'
import isImageFile from '../../utills/isImageFile'

interface ReplaceToAtagProps {
  text: string
  className: string
  isMine: boolean
}

export default function ReplaceToAtag({
  text,
  className,
  isMine,
}: ReplaceToAtagProps) {
  const [linkWarningModal, setLinkWarningModal] = useState(false)
  const [isImgUrl, setIsImgUrl] = useState(false)
  const [useImgTag, setUseImgTag] = useState(false)
  const { isGroupChatImgPreview, isRandomChatImgPreview } = useOptionStore()
  const { page } = useGlobalStateStore()
  const color = isMine ? 'bg-chat-box-me' : 'bg-chat-box'
  const urlRegex =
    /(?:https:\/\/)(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}(?:[-a-zA-Z0-9@:%_+.~#?&/=]*)/g

  const handleClickLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault()
    setLinkWarningModal(true)
  }
  const handleClickImg = () => {
    setLinkWarningModal(true)
  }

  const parts = text.split(urlRegex)

  const matches = text.match(urlRegex)

  useEffect(() => {
    const setIsImg = async () => {
      const isImgUrl = await isImageFile(text)
      setIsImgUrl(isImgUrl)
    }

    // url이 하나인지
    const isOnlyOneUrl = parts.join('') === '' && matches?.length === 1

    if (isOnlyOneUrl) {
      setIsImg()
    }

    if (page === 1) {
      setUseImgTag(isImgUrl && isGroupChatImgPreview)
    }

    if (page === 2) {
      setUseImgTag(isImgUrl && isRandomChatImgPreview)
    }
  }, [isImgUrl, text, page])

  const linkifiedText = parts.reduce(
    (acc, part, index) => {
      acc.push(part)
      if (!(matches && matches[index])) return acc
      acc.push(
        <span key={Math.random()}>
          <LinkWarningModal
            link={matches[index]}
            open={linkWarningModal}
            setter={setLinkWarningModal}
          />
          <a
            href={matches[index]}
            onClick={handleClickLink}
            className={`${className} text-blue-400 hover:underline`}
          >
            {matches[index]}
          </a>
        </span>,
      )

      return acc
    },
    [] as (string | JSX.Element)[],
  )

  return useImgTag ? (
    <>
      <button className="h-fit w-fit" onClick={handleClickImg}>
        <img
          className="h-auto max-h-450pxr w-full max-w-700pxr object-contain"
          src={text}
          onLoad={() => {
            window.scrollTo(0, document.body.scrollHeight)
          }}
        />
      </button>
      <LinkWarningModal
        link={text}
        open={linkWarningModal}
        setter={setLinkWarningModal}
      />
    </>
  ) : (
    <div
      className={`${color} max-w-500pxr text-wrap break-words rounded-[15px] px-15pxr py-7pxr`}
    >
      {linkifiedText}
    </div>
  )
}
