type PostPageProps = {
  params: {
    id: number
  }
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {
  return (
    <div>
      <h1>Post {params.id}</h1>
    </div>
  )
}

export default PostPage
