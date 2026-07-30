import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCartItem } from '../../redux/features/cartSlice.js'

function CartButton({ children = 'Add to Cart', className, disabled = false, onAdded, product, quantity = 1 }) {
  const dispatch = useDispatch()
  const [isAdded, setIsAdded] = useState(false)
  const existingQuantity = useSelector((state) =>
    state.cart.cartItems.find((item) => item.product === product._id)?.quantity ?? 0,
  )

  const addToCart = () => {
    dispatch(setCartItem({
      product: product._id,
      name: product.name,
      alt: product.alt || product.name,
      image: product.image || product.images?.[0],
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      quantity: existingQuantity + quantity,
    }))
    setIsAdded(true)
    onAdded?.()
  }

  useEffect(() => {
    if (!isAdded) return undefined
    const timer = window.setTimeout(() => setIsAdded(false), 1600)
    return () => window.clearTimeout(timer)
  }, [isAdded])

  return (
    <button className={className} disabled={disabled} onClick={addToCart} type="button" aria-live="polite">
      {isAdded ? '✓ Added to Cart' : children}
    </button>
  )
}

export default CartButton
