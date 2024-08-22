import clsx from 'clsx'
import type { Metadata } from 'next'

import { jetBrainsMono, pretendard } from '@/font'
import '@/style/editor.css'
import '@/style/global.css'
import { Footer } from '@/ui/footer/footer'
import { Header } from '@/ui/header/header'

export const metadata: Metadata = {
  title: 'Ara',
  description: 'The official community service platform of KAIST',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html
    lang="ko-KR"
    className={clsx(pretendard.variable, jetBrainsMono.variable)}
  >
    <body>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
