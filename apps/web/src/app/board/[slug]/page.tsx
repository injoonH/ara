import { notFound } from 'next/navigation'

import { client } from '@/lib/api'
import { BoardAside, BoardAsideLink, BoardAsideSection } from '@/ui/board-aside'
import { PostRow, PostRowList, PostRowProfileWithPreview } from '@/ui/post-row'

import styles from './page.module.css'

const top = [
  {
    href: '#',
    title: 'Lorem ipsum dolor sit amet',
  },
  {
    href: '#',
    title: 'Praesent maximus eros',
  },
  {
    href: '#',
    title: 'Fusce in libero sollicitudin, dignissim sem eget, tincidunt',
  },
  {
    href: '#',
    title: 'Praesent mollis justo id nibh semper eleifend.',
  },
  {
    href: '#',
    title: 'Morbi accumsan',
  },
]
const pocket = [
  {
    href: '#',
    title: 'Nulla sed eros tincidunt',
  },
  {
    href: '#',
    title: 'Nullam cursus lorem vel turpis vestibulum finibus id vitae nisi.',
  },
  {
    href: '#',
    title: 'Donec',
  },
  {
    href: '#',
    title: 'Cras ornare dolor nec malesuada luctus.',
  },
  {
    href: '#',
    title: 'Sed blandit ex nec ipsum sagittis, sed commodo turpis suscipit.',
  },
]

type BoardPageProps = {
  params: {
    slug: string
  }
}

const BoardPage: React.FC<BoardPageProps> = async ({ params }) => {
  const boardRes = await client.boards.slug[':slug'].$get({
    param: { slug: params.slug },
  })

  if (!boardRes.ok) {
    notFound()
  }

  const board = await boardRes.json()

  return (
    <div className={styles.allWrapper}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>{board.name}</h1>
        </div>
        <PostRowList>
          {[...Array(15)].map((_, i) => (
            <PostRow
              key={i}
              postId={i}
              title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum porro reiciendis vitae exercitationem asperiores est libero facere iure velit suscipit?"
              left={
                <PostRowProfileWithPreview
                  primary={{ src: '/image/game.svg', alt: 'game' }}
                  secondary={{ src: '/image/user-avatar.svg', alt: 'profile' }}
                />
              }
              subInfo={{
                author: 'Lorem Ipsum',
                view: 42,
                createdAt: new Date('2003-06-17'),
              }}
            />
          ))}
        </PostRowList>
      </main>
      <BoardAside>
        <BoardAsideSection title="인기">
          {top.map(({ href, title }, idx) => (
            <BoardAsideLink key={idx} href={href} title={title} />
          ))}
        </BoardAsideSection>
        <BoardAsideSection title="호주머니">
          {pocket.map(({ href, title }, idx) => (
            <BoardAsideLink key={idx} href={href} title={title} />
          ))}
        </BoardAsideSection>
      </BoardAside>
    </div>
  )
}

export default BoardPage
