import React, { useState, useEffect } from "react";
import StarRating from "../pages/StarRating";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

const ReviewComponent = ({ articleId }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [usernames, setUsernames] = useState({});
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (articleId) loadReviews();
  }, [articleId]);

  const loadReviews = async () => {
    try {
      const response = await appwriteService.getReviewsByArticle(articleId);
      if (response && response.documents) {
        setReviews(response.documents);
        fetchUsernames(response.documents);
      }
    } catch (error) {
      console.error("Error loading reviews:", error);
    }
  };

  const fetchUsernames = async (reviews) => {
    const usernameMap = {};
    const uniqueUserIds = [...new Set(reviews.map((r) => r.userId))];
    try {
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          try {
            const user = await authService.getUserById(userId);
            usernameMap[userId] = user?.name || `User ${userId.slice(-4)}`;
          } catch {
            usernameMap[userId] = `User ${userId.slice(-4)}`;
          }
        })
      );
      setUsernames(usernameMap);
    } catch (err) {
      console.error("Error in username fetching:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData || !comment.trim() || rating === 0) return;
    setLoading(true);

    try {
      if (editingId) {
        await appwriteService.updateReview(editingId, {
          rating,
          comment: comment.trim(),
        });
      } else {
        const newReview = {
          articleId,
          userId: userData.$id,
          rating,
          comment: comment.trim(),
          createdAt: new Date().toISOString(),
        };
        await appwriteService.createReview(newReview);
      }

      resetForm();
      await loadReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setComment("");
    setRating(0);
    setEditingId(null);
  };

  const handleEdit = (review) => {
    setEditingId(review.$id);
    setComment(review.comment);
    setRating(review.rating);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await appwriteService.deleteReview(reviewId);
      await loadReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-12 px-2 sm:px-4">
      {userData && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 border border-gray-100">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
            {editingId ? "Edit Your Review" : "Leave a Review"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center">
              <StarRating rating={rating} onChange={setRating} />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Your Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="3"
                placeholder="Share your thoughts..."
                required
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="submit"
                disabled={loading || rating === 0 || !comment.trim()}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 ${loading || rating === 0 || !comment.trim()
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
              >
                {loading
                  ? editingId
                    ? "Updating..."
                    : "Submitting..."
                  : editingId
                    ? "Update Review"
                    : "Post Review"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4 mt-20">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews ({reviews.length})
        </h3>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.$id}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-200"
                  alt="User avatar"
                />
                <div>
                  <p className="font-medium text-gray-800 text-sm md:text-base">
                    {usernames[review.userId] || `User ${review.userId.slice(-4)}`}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <StarRating rating={review.rating} readOnly />
                  <span className="text-xs md:text-sm text-gray-600 ml-2">
                    ({review.rating}/5)
                  </span>
                </div>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {review.comment}
                </p>
              </div>

              {userData?.$id === review.userId && (
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-200 transition"
                  >
                    <i className="ri-pencil-fill"></i>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.$id)}
                    className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200 transition"
                  >
                    <i className="ri-chat-delete-fill"></i>
                    Delete
                  </button>
                </div>

              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center text-sm mt-6">
            No reviews yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
