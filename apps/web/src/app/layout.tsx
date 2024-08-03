import type { Metadata } from 'next'

import { pretendard } from '@/font'
import '@/style/global.css'
import { Header } from '@/ui/header'

export const metadata: Metadata = {
  title: 'Ara',
  description: 'The official community service platform of KAIST',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="ko-KR">
    <body className={pretendard.className}>
      <Header />
      {children}
    </body>
  </html>
)

export default RootLayout
