import Image from 'next/image'
import Link from 'next/link'

import { client } from '@/lib/api'
import {
  NavMenu,
  NavMenuGroup,
  NavMenuGroupItem,
  NavMenuLink,
} from '@/ui/nav-menu'

import styles from './header.module.css'

export const Header: React.FC = async () => {
  const res = await client.boards.grouped.$get()
  const boardGroups = await res.json()

  return (
    <div>
      <header className={styles.header}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image src="/image/ara-logo.svg" alt="Ara" width={45} height={25} />
        </Link>

        {/* Navigation */}
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

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Post submit */}
          <Link href="/post/submit" className={styles.postSubmitButton}>
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
        </div>
      </header>
    </div>
  )
}
