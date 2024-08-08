import { queryClient } from '@/db'

import { seedBoards } from './board'

const seed = async () => {
  await seedBoards()
}

seed()
  .then(() => {
    console.log('Seed complete')
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    queryClient.end()
  })
