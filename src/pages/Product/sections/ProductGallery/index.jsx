import { useState } from 'react'
import styles from './ProductGallery.module.css'
import WishlistButton from '../../../../components/WishlistButton'

function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0])

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>
        <mark>−{product.discount}%</mark>
        <WishlistButton className={styles.wishlistButton} product={product} />
        <img src={selectedImage} alt={product.name} />
      </div>
      <div className={styles.thumbs}>
        {product.images.map((image, index) => (
          <button className={image === selectedImage ? styles.selected : undefined} type="button" onClick={() => setSelectedImage(image)} key={`${image}-${index}`}>
            <img src={image} alt={`${product.name} view ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductGallery
