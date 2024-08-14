'use client'

import type { InferResponseType } from 'hono/client'
import { useState } from 'react'
import { X } from 'react-feather'

import type { DialogProps } from '@/hook/useDialog'
import { client } from '@/lib/api'

import styles from './header-dialog.module.css'
import { Nav, NavDivider, NavGroup, NavGroupItem, NavLink } from './nav-dialog'

type HeaderDialogProps = {
  boardGroups: InferResponseType<typeof client.boards.grouped.$get>
  dialog: React.FC<DialogProps>
  close: () => void
}

export const HeaderDialog: React.FC<HeaderDialogProps> = ({
  boardGroups,
  dialog: Dialog,
  close,
}) => {
  const [openedGroup, setOpenedGroup] = useState<number | null>(null)

  return (
    <Dialog className={styles.dialog}>
      <button onClick={close} className={styles.closeButton}>
        <X size={20} />
      </button>
      <Nav>
        <NavLink title="전체" href="/board/all" onClick={close} />
        <NavLink title="인기" href="/board/top" onClick={close} />
        <NavDivider />
        {boardGroups.map(({ id, name, boards }) => {
          if (boards.length === 0) {
            return null
          }
          if (boards.length === 1) {
            return (
              <NavLink
                key={id}
                title={name}
                href={`/board/${boards[0]?.slug}`}
                onClick={close}
              />
            )
          }
          return (
            <NavGroup
              key={id}
              title={name}
              onClick={() =>
                setOpenedGroup((curr) => (curr === id ? null : id))
              }
              expanded={openedGroup === id}
            >
              {boards.map(({ id, name, slug }) => (
                <NavGroupItem
                  key={id}
                  title={name}
                  href={`/board/${slug}`}
                  onClick={close}
                />
              ))}
            </NavGroup>
          )
        })}
      </Nav>
    </Dialog>
  )
}
