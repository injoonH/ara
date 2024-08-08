import { db } from '@/db'
import { board, boardGroup } from '@/db/schema/board'

export const seedBoards = async () => {
  await db.delete(board)
  await db.delete(boardGroup)

  await db.insert(boardGroup).values([
    { id: 1, nameKo: '자유', nameEn: 'Free' },
    { id: 2, nameKo: '공지', nameEn: 'Notice' },
    { id: 3, nameKo: '단체', nameEn: 'Group' },
    { id: 4, nameKo: '거래', nameEn: 'Trade' },
    { id: 5, nameKo: '소통', nameEn: 'Communication' },
  ])
  await db.insert(board).values([
    {
      slug: 'free',
      nameKo: '자유',
      nameEn: 'Free',
      groupId: 1,
    },
    {
      slug: 'management-announcement',
      nameKo: '운영 공지',
      nameEn: 'Management Announcement',
      groupId: 2,
    },
    {
      slug: 'portal-announcement',
      nameKo: '포탈 공지',
      nameEn: 'Portal Announcement',
      groupId: 2,
    },
    {
      slug: 'facility-announcement',
      nameKo: '입주 업체 공지',
      nameEn: 'Facility Announcement',
      groupId: 2,
    },
    {
      slug: 'student-group',
      nameKo: '학생 단체',
      nameEn: 'Student Group',
      groupId: 3,
    },
    {
      slug: 'club',
      nameKo: '동아리',
      nameEn: 'Club',
      groupId: 3,
    },
    {
      slug: 'real-estate',
      nameKo: '부동산',
      nameEn: 'Real Estate',
      groupId: 4,
    },
    {
      slug: 'second-hand-trade',
      nameKo: '중고 거래',
      nameEn: 'Second Hand Trade',
      groupId: 4,
    },
    {
      slug: 'recruitment',
      nameKo: '구인',
      nameEn: 'Recruitment',
      groupId: 4,
    },
    {
      slug: 'talk-to-school',
      nameKo: '학교에게 전합니다',
      nameEn: 'Talk to School',
      groupId: 5,
    },
    {
      slug: 'kaist-news',
      nameKo: '카이스트 신문',
      nameEn: 'KAIST News',
      groupId: 5,
    },
    {
      slug: 'ara-feedback',
      nameKo: 'Ara 피드백',
      nameEn: 'Ara Feedback',
      groupId: 5,
    },
  ])
}
