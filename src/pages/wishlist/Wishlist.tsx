import Products from '@/components/products/Products'
import { RootState } from '@/redux'
import { useGetWishlistQuery } from '@/redux/api/wishlist-api'
import { useSelector } from 'react-redux'

const Wishlist = () => {
    const id = useSelector((state: RootState)=> state.user.value.id)
    const wishlist = useSelector((state: RootState)=> state.wishlist.value)
    const token = useSelector((state: RootState)=> state.token.access_token)
    
    const {data} = useGetWishlistQuery(String(id))
    console.log({data: wishlist});
    
    
  return (
    <div>
        <Products data={token ? data : {data: wishlist}} showMore={true} title="Your Wishlist"/>
    </div>
  )
}

export default Wishlist