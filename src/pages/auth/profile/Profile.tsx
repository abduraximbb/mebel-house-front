import { clearOtp } from '@/redux/features/otp-slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Profile = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(clearOtp())
    }, [])
  return (
    <div>Profile</div>
  )
}

export default Profile