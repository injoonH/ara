import Link from 'next/link'
import type { ReactNode } from 'react'

import styles from './board-aside.module.css'

export const BoardAside: React.FC<{ children: ReactNode }> = ({ children }) => (
  <aside className={styles.aside}>{children}</aside>
)

export const BoardAsideSection: React.FC<{
  title: string
  children: ReactNode
}> = ({ title, children }) => (
  <section className={styles.section}>
    <h3 className={styles.title}>{title}</h3>
    <ul className={styles.list}>{children}</ul>
  </section>
)

export const BoardAsideLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => (
  <li>
    <Link href={href} className={styles.link}>
      {title}
    </Link>
  </li>
)
