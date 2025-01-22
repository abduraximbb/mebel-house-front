import useOnlineStatus from '@/hooks/useOnlineStatus';
import "./NetworkStatus.scss"

const NetworkStatus = () => {
    const status = useOnlineStatus()
    const statusClass = status ? "bg-green-500" : "bg-red-500"

  return (
    <p className={`text-center fixed top-0 left-0 h-6 flex items-center justify-center z-[101] w-full text-white text-sm ${statusClass} ${status ? "animete-hide" : ""}`}>{status ? "online":"offline"}</p>
  )
}

export default NetworkStatus