import { Link, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery, useGetProductsQuery } from '../../redux/api/productsApi.js'
import styles from './App.module.css'
import Benefits from './sections/Benefits/index.jsx'
import Breadcrumbs from './sections/Breadcrumbs/index.jsx'
import CustomerReviews from './sections/CustomerReviews/index.jsx'
import ProductDetails from './sections/ProductDetails/index.jsx'
import ProductGallery from './sections/ProductGallery/index.jsx'
import ProductInfo from './sections/ProductInfo/index.jsx'
import Recommendations from './sections/Recommendations/index.jsx'

const normalizeProduct = (product) => ({
  ...product,
  images: [...new Set([product.image, ...(product.images ?? [])].filter(Boolean))].length
    ? [...new Set([product.image, ...(product.images ?? [])].filter(Boolean))]
    : ['https://placehold.co/800x800?text=Shopora'],
  specifications: [
    ['Brand', product.brand || 'Shopora'],
    ['Category', product.category || 'Uncategorized'],
    ['Availability', product.stock > 0 ? 'In Stock' : 'Out of Stock'],
  ],
  highlights: product.highlights?.length
    ? product.highlights
    : ['Premium quality product', 'Carefully selected by Shopora', 'Eligible for easy returns'],
  longDescription: product.longDescription || product.description,
})

export default function Product() {
  const { id } = useParams()
  const detailsQuery = useGetProductDetailsQuery(id, { skip: !id })
  const product = detailsQuery.data?.product ? normalizeProduct(detailsQuery.data.product) : null
  const relatedQuery = useGetProductsQuery(
    { category: product?.category, limit: 5, sort: 'rating' },
    { skip: !product?.category },
  )
  const recommendations = (relatedQuery.data?.products ?? [])
    .filter((item) => item._id !== product?._id)
    .slice(0, 4)

  if (!id) {
    return <main className={styles.status}><p>Select a product from the Shop page.</p><Link to="/shop">Go to Shop</Link></main>
  }

  if (detailsQuery.isLoading) return <main className={styles.status}>Loading product…</main>

  if (detailsQuery.error) {
    return (
      <main className={styles.status} role="alert">
        <p>{detailsQuery.error.data?.message || 'Unable to load this product.'}</p>
        <button onClick={detailsQuery.refetch} type="button">Try Again</button>
        <Link to="/shop">Back to Shop</Link>
      </main>
    )
  }

  if (!product) return <main className={styles.status}>Product not found.</main>

  return (
    <main className={styles.wrap}>
      <Breadcrumbs items={['Home', product.category, product.name]} />
      <section className={styles.product}>
        <ProductGallery key={product._id} product={product} />
        <ProductInfo product={product} />
      </section>
      <section className={styles.details}>
        <ProductDetails product={product} />
        <CustomerReviews key={product._id} productId={product._id} reviews={product.reviews ?? []} rating={product.ratings ?? 0} reviewCount={product.reviews?.length ?? product.reviewCount ?? 0} />
      </section>
      {relatedQuery.isLoading && <p className={styles.relatedStatus}>Loading recommendations…</p>}
      {!relatedQuery.isLoading && recommendations.length > 0 && <Recommendations products={recommendations} />}
      <Benefits />
    </main>
  )
}
