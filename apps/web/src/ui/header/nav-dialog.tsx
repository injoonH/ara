import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronDown } from 'react-feather'

import styles from './nav-dialog.module.css'

export const Nav: React.FC<{ children: ReactNode }> = ({ children }) => (
  <nav>
    <ul className={styles.rootList}>{children}</ul>
  </nav>
)

export const NavLink: React.FC<{
  href: string
  title: string
  onClick: () => void
}> = ({ href, title, onClick }) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={clsx(styles.navLink, styles.listItem)}
    >
      {title}
    </Link>
  </li>
)

export const NavDivider: React.FC = () => (
  <li aria-hidden>
    <hr className={styles.divider} />
  </li>
)

export const NavGroup: React.FC<{
  title: string
  onClick: () => void
  children: ReactNode
  expanded?: boolean
  chevron?: boolean
}> = ({ title, onClick, children, expanded, chevron = true }) => (
  <li>
    <button
      onClick={onClick}
      aria-expanded={expanded}
      className={styles.dropdownButton}
    >
      <span className={styles.listItem}>{title}</span>
      {chevron && <ChevronDown size={12} className={styles.chevron} />}
    </button>
    <ul className={styles.dropdownList}>{children}</ul>
  </li>
)

export const NavGroupItem: React.FC<{
  href: string
  title: string
  onClick: () => void
}> = ({ href, title, onClick }) => (
  <li>
    <Link href={href} onClick={onClick} className={styles.dropdownLink}>
      {title}
    </Link>
  </li>
)
