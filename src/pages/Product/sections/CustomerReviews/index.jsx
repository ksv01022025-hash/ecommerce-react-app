import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useSubmitReviewMutation } from '../../../../redux/api/productsApi.js'
import styles from './CustomerReviews.module.css'

function CustomerReviews({ productId, rating, reviews, reviewCount }) {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const ownReview = reviews.find((review) => String(review.user?._id || review.user) === user?._id)
  const [selectedRating, setSelectedRating] = useState(ownReview?.rating || 5)
  const [comment, setComment] = useState(ownReview?.comment || '')
  const [message, setMessage] = useState('')
  const [submitReview, submitState] = useSubmitReviewMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    try {
      const result = await submitReview({ productId, rating: Number(selectedRating), comment: comment.trim() }).unwrap()
      setMessage(result.message || 'Review submitted successfully.')
    } catch (error) {
      setMessage(error.data?.message || 'Unable to submit your review. Please try again.')
    }
  }

  return (
    <article className={styles.reviews}>
      <h2>Customer Reviews ({reviewCount})</h2>
      <div className={styles.rating}>
        <b>{rating.toFixed(1)}</b>
        <span className={styles.stars}>★★★★★<small>Based on {reviewCount} reviews</small></span>
      </div>

      <section className={styles.reviewForm}>
        <h3>{ownReview ? 'Update Your Review' : 'Write a Review'}</h3>
        {!isAuthenticated ? (
          <p>Please <Link to="/login" state={{ from: `/product/${productId}` }}>log in</Link> to review this product.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Rating
              <select value={selectedRating} onChange={(event) => setSelectedRating(event.target.value)}>
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Very Good</option>
                <option value="3">3 — Good</option>
                <option value="2">2 — Fair</option>
                <option value="1">1 — Poor</option>
              </select>
            </label>
            <label>
              Comment
              <textarea
                maxLength="1000"
                onChange={(event) => setComment(event.target.value)}
                placeholder="Share your experience with this product"
                rows="4"
                value={comment}
              />
            </label>
            <button disabled={submitState.isLoading} type="submit">
              {submitState.isLoading ? 'Submitting…' : ownReview ? 'Update Review' : 'Submit Review'}
            </button>
            {message && <p className={submitState.isError ? styles.error : styles.success} role="status">{message}</p>}
          </form>
        )}
      </section>

      <hr />
      {reviews.length === 0 && <p>No customer reviews yet.</p>}
      {reviews.map((review) => (
        <p key={review._id || `${review.name}-${review.createdAt}`}>
          <b>{review.name} </b><em>✓ Verified Buyer</em><br />
          <span className={styles.stars}>{'★'.repeat(review.rating)}</span> {review.createdAt && new Date(review.createdAt).toLocaleDateString('en-IN')}<br /><br />
          {review.comment}
        </p>
      ))}
    </article>
  )
}

export default CustomerReviews
