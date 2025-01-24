import { useCheckTokenQuery } from '@/redux/api/customer-api'

const Profile = () => {
  const {} = useCheckTokenQuery(null)
  
  return (
    <div>Profile</div>
  )
}

export default Profile