import { client } from '@/lib/api'

import { HeaderInner } from './header-inner'

export const Header: React.FC = async () => {
  const res = await client.boards.grouped.$get()
  const boardGroups = await res.json()

  return <HeaderInner boardGroups={boardGroups} />
}
