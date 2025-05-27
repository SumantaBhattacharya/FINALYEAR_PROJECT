import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Query } from 'appwrite';
import authService from '../../appwrite/auth';
import service from '../../appwrite/config';
import Button from '../Button';
import Spinner from '../../assets/Spinner@1x-1.0s-211px-211px.svg';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          const postsData = await service.getPosts([
            Query.equal('userId', userData.$id)
          ]);
          setPosts(postsData.documents || []);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user or posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleReadMore = (post) => {
    const slugOrId = post.slug || post.$id;
    if (slugOrId) {
      navigate(`/post/${slugOrId}`);
    } else {
      alert('This post does not have a valid slug or ID.');
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadedFile = await service.uploadFile(file);
      const fileId = uploadedFile.$id;

      // Save fileId to user prefs
      await authService.account.updatePrefs({ profilePicture: fileId });

      // Fetch updated user info
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
    } catch (err) {
      console.error("Failed to upload profile picture", err);
      alert("Error uploading profile picture");
    } finally {
      setUploading(false);
    }
  };

  const getProfilePictureUrl = () => {
    const fileId = user?.prefs?.profilePicture;
    return fileId ? service.getFilePreview(fileId) : null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={Spinner} alt="Loading..." className="w-20 h-20 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-300 rounded-lg shadow-md mt-8 mb-8">
      <div className="text-center mb-8">
        {getProfilePictureUrl() ? (
          <img
            src={getProfilePictureUrl()}
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-white shadow"
          />
        ) : (
          <div className="w-32 h-32 mx-auto rounded-full bg-gray-400 mb-4 flex items-center justify-center text-white font-bold text-xl shadow">
            ?
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
          className="mb-4"
        />
        {uploading && <p className="text-blue-600">Uploading...</p>}

        <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Posts</h2>
        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map(post => (
              <li
                key={post.$id}
                className="p-4 bg-gray-100 rounded-md shadow hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-bold">{post.title || "Untitled Post"}</h3>
                <p className="text-gray-600">
                  {post.content ? post.content.substring(0, 100) + '...' : "No content available."}
                </p>
                <Button
                  onClick={() => handleReadMore(post)}
                  className="mt-2 bg-[#A2BFD7]"
                >
                  Read More
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You have not created any posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
