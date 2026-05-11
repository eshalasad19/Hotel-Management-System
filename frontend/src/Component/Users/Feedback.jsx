
import { useState } from 'react';
import { apiRequest } from './userData';
export default function Feedback() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await apiRequest('/feedbacks', {
        method: 'POST',
        body: JSON.stringify({ rating: Number(rating), review })
      });
      setMessage('Feedback submitted successfully.');
      setReview('');
      setRating(5);
    } catch (err) {
      setError(err.message || 'Feedback submit nahi hua.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="user-page">
      <div className="user-page-head">
        <div>
          <div className="user-kicker">Feedback</div>
          <h1 className="user-page-title">Share your stay experience</h1>
          <p className="user-page-subtitle">Your rating and review will be sent to the hotel team.</p>
        </div>
      </div>
      <div className="user-grid cols-2">
        <form className="user-card user-card-pad user-form" onSubmit={handleSubmit}>
          {message && <div className="user-alert success">{message}</div>}
          {error && <div className="user-alert error">{error}</div>}
          <div className="user-field">
            <label>Rating</label>
            <div className="user-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={rating === value ? 'active' : ''}
                  onClick={() => setRating(value)}
                  aria-label={`${value} star rating`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div className="user-field">
            <label htmlFor="review">Review</label>
            <textarea
              id="review"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              placeholder="Write your review"
              required
            />
          </div>
          <button className="user-btn user-btn-primary" type="submit" disabled={loading}>
            <i className="ri-send-plane-line"></i>
            {loading ? 'Submitting...' : 'Submit feedback'}
          </button>
        </form>
        <aside className="user-card user-card-pad">
          <h2>Guest Care</h2>
          <p style={{ color: 'var(--user-muted)' }}>Feedback helps the hotel team improve room comfort, service speed, and guest support.</p>
          <div className="user-grid" style={{ marginTop: 18 }}>
            <div className="user-alert"><strong>Room comfort</strong><div>Cleanliness, bedding, temperature, and noise level.</div></div>
            <div className="user-alert"><strong>Service quality</strong><div>Reception, housekeeping, food service, and response time.</div></div>
            <div className="user-alert"><strong>Overall stay</strong><div>Value, ambience, facilities, and checkout experience.</div></div>
          </div>
        </aside>
      </div>
    </section>
  );
}