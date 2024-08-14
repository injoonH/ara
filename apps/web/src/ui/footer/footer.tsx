import Image from 'next/image'
import Link from 'next/link'

import styles from './footer.module.css'

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <Link href="https://sparcs.org" target="_blank" className={styles.logo}>
      <Image
        src="/image/footer-sparcs-logo.svg"
        alt="SPARCS"
        width={85}
        height={25}
      />
    </Link>
    <ul className={styles.linkList}>
      <li>
        <Link href="/terms" className={styles.link}>
          이용약관
        </Link>
      </li>
      <li aria-hidden>
        <hr className={styles.divider} />
      </li>
      <li>
        <Link href="/policy" className={styles.link}>
          개인정보처리방침
        </Link>
      </li>
      <li aria-hidden>
        <hr className={styles.divider} />
      </li>
      <li>
        <Link href="/contributors" className={styles.link}>
          만든 사람들
        </Link>
      </li>
      <li aria-hidden>
        <hr className={styles.divider} />
      </li>
      <li>
        <button type="button" className={styles.link}>
          채팅 문의
        </button>
      </li>
    </ul>
    <p className={styles.caution}>
      본 서비스 내의 모든 게시물은 KAIST 학내 구성원만 접근 가능하며, 외부로의
      무단 유출 및 전재를 금합니다.
    </p>
    <p>
      기타 문의:{' '}
      <a href="mailto:ara@sparcs.org" className={styles.email}>
        ara@sparcs.org
      </a>
    </p>
  </footer>
)
