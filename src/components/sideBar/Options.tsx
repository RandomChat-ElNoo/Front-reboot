import { CloseOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Input, Switch } from 'antd'
import useOptionStore from '../../store/useOptionStore'
import { useState } from 'react'

interface OptionsProps {
  closeOption: () => void
}

/**
 * 사이드바 하단에 있는 옵션창
 * @param closeOption 옵션 닫는 함수
 */

export default function Options({ closeOption }: OptionsProps) {
  const {
    avatar,
    setAvatar,
    isRandomChatImgPreview,
    setIsRandomChatImgPreview,
    isGroupChatImgPreview,
    setIsGroupChatImgPreview,
  } = useOptionStore()
  const [avatarInputValue, setAvatarInputValue] = useState('')

  const setAvatarState = () => {
    if (avatarInputValue === '') {
      setAvatar('기타')
      return
    }

    setAvatar(avatarInputValue)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2CDB75',
        },
        components: {
          Switch: {
            handleSize: 18,
          },
        },
      }}
    >
      <div className="w-full">
        <section className="flex h-40pxr flex-row items-center justify-between bg-background-sidebar-bottom px-10pxr">
          <UnorderedListOutlined style={{ fontSize: '28px', color: 'white' }} />
          <p className="text-18pxr text-white">옵션</p>
          <CloseOutlined
            onClick={closeOption}
            style={{ fontSize: '28px', color: 'white' }}
          />
        </section>
        <section className="flex w-full flex-col gap-10pxr bg-background-sidebar px-10pxr py-20pxr">
          <p className="text-18pxr text-white">이미지 미리보기</p>
          <div className="flex flex-row items-center justify-between">
            <p className="text-16pxr text-white">전체 채팅</p>
            <Switch
              defaultValue={isRandomChatImgPreview}
              onChange={() => {
                setIsRandomChatImgPreview(!isRandomChatImgPreview)
              }}
              className="h-22pxr w-44pxr bg-black"
            />
          </div>
          <div className="flex flex-row items-center justify-between">
            <p className="text-16pxr text-white">랜덤 채팅</p>
            <Switch
              defaultValue={isGroupChatImgPreview}
              onChange={() => {
                setIsGroupChatImgPreview(!isGroupChatImgPreview)
              }}
              className="h-22pxr w-44pxr bg-black"
            />
          </div>
          <div className="flex flex-col gap-5pxr">
            <div className="flex flex-row items-center justify-between">
              <p className="text-18pxr text-white">아바타</p>
              <Button
                disabled={avatar === avatarInputValue}
                onClick={setAvatarState}
                className="rounded-full bg-button-green text-white disabled:bg-button-green disabled:opacity-70"
              >
                적용
              </Button>
            </div>
            <Input
              className="rounded-[10px]"
              maxLength={10}
              onChange={(e) => {
                setAvatarInputValue(e.target.value)
              }}
              onPressEnter={setAvatarState}
              defaultValue={avatar}
              count={{ max: 10, show: true }}
            />
          </div>
        </section>
      </div>
    </ConfigProvider>
  )
}
