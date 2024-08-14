import type { Metadata } from 'next'

import { pretendard } from '@/font'
import '@/style/global.css'
import { Footer } from '@/ui/footer/footer'
import { Header } from '@/ui/header/header'

export const metadata: Metadata = {
  title: 'Ara',
  description: 'The official community service platform of KAIST',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="ko-KR">
    <body className={pretendard.className}>
      <Header />
      {children}
      <Footer />
    </body>
  </html>
)

export default RootLayout
