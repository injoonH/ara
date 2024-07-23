import type { Metadata } from 'next'

import { pretendard } from '@/font'
import '@/style/global.css'

export const metadata: Metadata = {
  title: 'Ara',
  description: 'The official community service platform of KAIST',
}

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="ko-KR">
    <body className={pretendard.className}>{children}</body>
  </html>
)

export default RootLayout
