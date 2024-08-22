import type { InferResponseType } from 'hono/client'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, Menu } from 'react-feather'

import { client } from '@/lib/api'

import styles from './header-top.module.css'
import {
  NavMenu,
  NavMenuGroup,
  NavMenuGroupItem,
  NavMenuLink,
} from './nav-menu'

type HeaderTopProps = {
  boardGroups: InferResponseType<typeof client.boards.grouped.$get>
  openNavDialog: () => void
}

export const HeaderTop: React.FC<HeaderTopProps> = ({
  boardGroups,
  openNavDialog,
}) => (
  <header className={styles.header}>
    {/* Logo */}
    <Link href="/" className={styles.logo}>
      <Image src="/image/ara-logo.svg" alt="Ara" width={45} height={25} />
    </Link>

    {/* Navigation */}
    <div className={styles.nav}>
      <NavMenu>
        <NavMenuLink title="전체" href="/board/all" />
        <NavMenuLink title="인기" href="/board/top" />
        {boardGroups.map(({ id, name, boards }) => {
          if (boards.length === 0) {
            return null
          }
          if (boards.length === 1) {
            return (
              <NavMenuLink
                key={id}
                title={name}
                href={`/board/${boards[0]!.slug}`}
              />
            )
          }
          return (
            <NavMenuGroup key={id} title={name}>
              {boards.map(({ id, name, slug }) => (
                <NavMenuGroupItem
                  key={id}
                  title={name}
                  href={`/board/${slug}`}
                />
              ))}
            </NavMenuGroup>
          )
        })}
      </NavMenu>
    </div>

    {/* Right Section */}
    <div className={styles.rightSection}>
      {/* Post submit */}
      <Link href="/submit" className={styles.postSubmitButton}>
        게시물 작성하기
      </Link>

      {/* User */}
      <Link href="/user/user42" className={styles.avatar}>
        {/* TODO: Remove mock image file */}
        <Image
          src="/image/user-avatar.svg"
          alt="User avatar"
          width={24}
          height={24}
        />
      </Link>

      <Link href="/submit" className={styles.iconButton}>
        <Edit size={20} />
      </Link>
      <button onClick={openNavDialog} className={styles.iconButton}>
        <Menu size={20} />
      </button>
    </div>
  </header>
)
