import { useState } from 'react'
import { useSubmitContactMessageMutation } from '../../../../redux/api/contactApi.js'
import styles from './ContactForm.module.css'

export default function ContactForm() {
  const [messageText, setMessageText] = useState('')
  const [feedback, setFeedback] = useState({ type: '', text: '' })
  const [submitContactMessage, requestState] = useSubmitContactMessageMutation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setFeedback({ type: '', text: '' })
    try {
      const result = await submitContactMessage(Object.fromEntries(new FormData(form))).unwrap()
      setFeedback({ type: 'success', text: result.message })
      form.reset()
      setMessageText('')
    } catch (error) {
      setFeedback({ type: 'error', text: error.data?.message || 'Unable to send your message. Please try again.' })
    }
  }

  return <form className={styles.card} onSubmit={handleSubmit}>
    <h2>Send Us a Message</h2><p className={styles.subtext}>Fill out the form below and we&apos;ll get back to you.</p>
    <div className={styles.grid}>
      <label>Full Name <em>*</em><input maxLength={80} minLength={2} name="fullName" placeholder="Enter your full name" required /></label>
      <label>Email Address <em>*</em><input maxLength={254} name="email" type="email" placeholder="Enter your email address" required /></label>
      <label>Phone Number<input maxLength={20} name="phone" pattern="[+0-9 ()-]{10,20}" placeholder="Enter your phone number" /></label>
      <label>Subject <em>*</em><select name="subject" defaultValue="" required><option value="" disabled>Select a subject</option><option>Order support</option><option>Returns &amp; refunds</option><option>Product inquiry</option></select></label>
    </div>
    <label className={styles.message}>Message <em>*</em><textarea maxLength={500} minLength={10} name="message" onChange={(event) => setMessageText(event.target.value)} placeholder="Type your message here..." required value={messageText} /><small>{messageText.length}/500</small></label>
    <button disabled={requestState.isLoading} type="submit">{requestState.isLoading ? 'Sending…' : '➤ Send Message'}</button>
    {feedback.text && <p className={feedback.type === 'error' ? styles.error : styles.success} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.text}</p>}
    <p className={styles.privacy}>♢ Your information is safe with us. We respect your privacy.</p>
  </form>
}
