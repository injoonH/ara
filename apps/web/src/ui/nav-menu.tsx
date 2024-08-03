import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronDown } from 'react-feather'

import styles from './nav-menu.module.css'

export const NavMenu: React.FC<{ children: ReactNode }> = ({ children }) => (
  <nav className={styles.rootNav}>
    <ul className={styles.rootList}>{children}</ul>
  </nav>
)

export const NavMenuLink: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => (
  <li>
    <Link href={href} className={styles.listItem}>
      {title}
    </Link>
  </li>
)

// TODO: Add accessibility features
export const NavMenuGroup: React.FC<{
  title: string
  children: ReactNode
  chevron?: boolean
}> = ({ title, children, chevron = true }) => (
  <li className={styles.dropdownGroup}>
    <div tabIndex={0} className={styles.dropdownGroupTitleWrapper}>
      <span className={styles.listItem}>{title}</span>
      {chevron && (
        <ChevronDown
          width={12}
          height={12}
          className={styles.dropdownChevron}
        />
      )}
    </div>
    <div className={styles.dropdownListWrapper}>
      <ul className={styles.dropdownList}>{children}</ul>
    </div>
  </li>
)

export const NavMenuGroupItem: React.FC<{ href: string; title: string }> = ({
  href,
  title,
}) => (
  <li>
    <Link href={href} className={styles.dropdownLink}>
      {title}
    </Link>
  </li>
)
