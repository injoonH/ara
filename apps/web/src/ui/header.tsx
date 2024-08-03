import Image from 'next/image'
import Link from 'next/link'

import {
  NavMenu,
  NavMenuGroup,
  NavMenuGroupItem,
  NavMenuLink,
} from '@/ui/nav-menu'

import styles from './header.module.css'

export const Header: React.FC = () => {
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
          <NavMenuLink title="자유" href="/board/free" />
          <NavMenuGroup title="공지">
            <NavMenuGroupItem
              title="운영 공지"
              href="/board/management-announcement"
            />
            <NavMenuGroupItem
              title="포탈 공지"
              href="/board/portal-announcement"
            />
            <NavMenuGroupItem
              title="입주 업체 공지"
              href="/board/internal-announcement"
            />
            <NavMenuGroupItem title="광고" href="/board/advertisement" />
          </NavMenuGroup>
          <NavMenuGroup title="학생단체 및 동아리">
            <NavMenuGroupItem title="학생 단체" href="/board/students" />
            <NavMenuGroupItem title="동아리" href="/board/club" />
          </NavMenuGroup>
          <NavMenuGroup title="거래">
            <NavMenuGroupItem title="부동산" href="/board/real-estate" />
            <NavMenuGroupItem
              title="중고 거래"
              href="/board/second-hand-trade"
            />
            <NavMenuGroupItem title="구인" href="/board/recruitment" />
          </NavMenuGroup>
          <NavMenuGroup title="소통">
            <NavMenuGroupItem
              title="학교에게 전합니다"
              href="/board/talk-to-school"
            />
            <NavMenuGroupItem title="카이스트 신문" href="/board/news" />
            <NavMenuGroupItem title="Ara 피드백" href="/board/ara-feedback" />
          </NavMenuGroup>
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
