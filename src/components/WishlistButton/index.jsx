import { useDispatch, useSelector } from 'react-redux'
import { useAddWishlistItemMutation, useRemoveWishlistItemFromServerMutation } from '../../redux/api/wishlistApi.js'
import { toggleWishlistItem } from '../../redux/features/wishlistSlice.js'

function WishlistButton({ className, product }) {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const isSaved = useSelector((state) => state.wishlist.items.some((item) => item._id === product._id))
  const [addWishlistItem, addState] = useAddWishlistItemMutation()
  const [removeWishlistItem, removeState] = useRemoveWishlistItemFromServerMutation()

  const toggleWishlist = async () => {
    dispatch(toggleWishlistItem(product))
    if (!isAuthenticated) return

    try {
      if (isSaved) await removeWishlistItem(product._id).unwrap()
      else await addWishlistItem(product._id).unwrap()
    } catch {
      dispatch(toggleWishlistItem(product))
    }
  }

  return (
    <button
      className={className}
      type="button"
      aria-label={`${isSaved ? 'Remove' : 'Save'} ${product.name} ${isSaved ? 'from' : 'to'} wishlist`}
      aria-pressed={isSaved}
      disabled={addState.isLoading || removeState.isLoading}
      onClick={toggleWishlist}
      style={isSaved ? { color: '#ff3515' } : undefined}
    >
      {isSaved ? '♥' : '♡'}
    </button>
  )
}

export default WishlistButton
