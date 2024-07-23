type BoardPageProps = {
  params: {
    slug: string
  }
}

const BoardPage: React.FC<BoardPageProps> = ({ params }) => {
  return (
    <div>
      <h1>Board {params.slug}</h1>
    </div>
  )
}

export default BoardPage
