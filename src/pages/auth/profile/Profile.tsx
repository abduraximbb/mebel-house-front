import { useCheckTokenQuery } from '@/redux/api/customer-api'

const Profile = () => {
  const {data} = useCheckTokenQuery(null)
  console.log(data?.client?.id)
  
  return (
    <div>Profile</div>
  )
}

export default Profile