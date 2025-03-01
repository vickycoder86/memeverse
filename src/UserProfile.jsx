import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "Meme Lover",
    bio: "I love memes!",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_y7FUcigfm_Q8bhbNnrBqqOd4v3C8V6_JtA&s",
  });
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [newProfile, setNewProfile] = useState({ ...profile });

  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    setUploadedMemes(storedUploads);
    const storedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    setLikedMemes(storedLikes);
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setProfile(newProfile);
    setEditing(false);
  };



  return (
    <div className="min-h-screen p-5 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src={profile.profilePic} alt="Profile" className="w-24 h-24 rounded-full" />
          {editing ? (
            <>
              <input
                type="text"
                className="mt-3 p-2 border rounded-md w-full text-black"
                value={newProfile.name}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
              />
              <textarea
                className="mt-3 p-2 border rounded-md w-full text-black"
                value={newProfile.bio}
                onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
              />
              <button onClick={handleSave} className="mt-3 p-2 bg-green-500 text-white rounded-md">
                Save
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mt-2">{profile.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
              <button onClick={handleEdit} className="mt-3 p-2 bg-blue-500 text-white rounded-md">
                Edit Profile
              </button>
              
            </>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold">Your Uploaded Memes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {uploadedMemes.length > 0 ? (
            uploadedMemes.map((meme, index) => (
              <img key={index} src={meme.url} alt="Uploaded Meme" className="w-full rounded-lg shadow-md" />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No uploaded memes yet.</p>
          )}
        </div>
      </div>

      <div className="mt-6 max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold">Liked Memes</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {likedMemes.length > 0 ? (
            likedMemes.map((meme, index) => (
              <img key={index} src={meme.url || meme} alt="Liked Meme" className="w-full rounded-lg shadow-md" />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No liked memes yet.</p>
          )}
        </div>
      </div>
      <Link to={`/`}>
            <button className="p-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600">
              Back to meme
            </button>
          </Link>
    </div>
  );
};

export default UserProfile;
