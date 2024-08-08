import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { getRelativeFormattedDate } from '@/lib/date'

import styles from './post-row.module.css'

export const PostRowList: React.FC<{ children: ReactNode }> = ({
  children,
}) => <ul className={styles.list}>{children}</ul>

type PostRowProps = {
  postId: number
  title: string
  left?: ReactNode
  subInfo?: {
    author?: string
    view?: number
    createdAt?: Date
  }
}

export const PostRow: React.FC<PostRowProps> = ({
  postId,
  title,
  left,
  subInfo,
}) => (
  <li>
    <Link href={`/post/${postId}`} className={styles.row}>
      {left}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {subInfo && (
          <ul className={styles.subInfoList}>
            {subInfo.author && <li>{subInfo.author}</li>}
            {subInfo.view && <li>조회 {subInfo.view}</li>}
            {subInfo.createdAt && (
              <li>{getRelativeFormattedDate(subInfo.createdAt, 'ko-KR')}</li>
            )}
          </ul>
        )}
      </div>
    </Link>
  </li>
)

export const PostRowProfile: React.FC<{ src: string; alt: string }> = ({
  src,
  alt,
}) => (
  <Image src={src} alt={alt} width={36} height={36} className={styles.image} />
)

export const PostRowProfileWithPreview: React.FC<{
  primary: { src: string; alt: string }
  secondary: { src: string; alt: string }
}> = ({ primary, secondary }) => (
  <div className={styles.imageContainer}>
    <Image
      src={primary.src}
      alt={primary.alt}
      width={36}
      height={36}
      className={styles.primaryImage}
    />
    <Image
      src={secondary.src}
      alt={secondary.alt}
      width={20}
      height={20}
      className={styles.secondaryImage}
    />
  </div>
)
