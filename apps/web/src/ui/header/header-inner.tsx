'use client'

import type { InferResponseType } from 'hono/client'

import { useDialog } from '@/hook/useDialog'
import { client } from '@/lib/api'

import { HeaderDialog } from './header-dialog'
import { HeaderTop } from './header-top'

type HeaderInnerProps = {
  boardGroups: InferResponseType<typeof client.boards.grouped.$get>
}

export const HeaderInner: React.FC<HeaderInnerProps> = ({ boardGroups }) => {
  const { Dialog, open, close } = useDialog()

  return (
    <>
      <HeaderTop boardGroups={boardGroups} openNavDialog={open} />
      <HeaderDialog boardGroups={boardGroups} dialog={Dialog} close={close} />
    </>
  )
}
