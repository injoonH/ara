type UserPageProps = {
  params: {
    username: string
  }
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  return (
    <div>
      <h1>User {params.username}</h1>
    </div>
  )
}

export default UserPage
