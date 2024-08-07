import { BoardAside, BoardAsideLink, BoardAsideSection } from '@/ui/board-aside'

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

const BoardPage: React.FC<BoardPageProps> = ({ params }) => {
  return (
    <div className={styles.allWrapper}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>무슨 게시판 ({params.slug})</h1>
        </div>
      </main>
      <BoardAside>
        <BoardAsideSection title="인기">
          {top.map(({ href, title }) => (
            <BoardAsideLink key={href} href={href} title={title} />
          ))}
        </BoardAsideSection>
        <BoardAsideSection title="호주머니">
          {pocket.map(({ href, title }) => (
            <BoardAsideLink key={href} href={href} title={title} />
          ))}
        </BoardAsideSection>
      </BoardAside>
    </div>
  )
}

export default BoardPage
