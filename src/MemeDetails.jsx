import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchMeme = async () => {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      const foundMeme = data.data.memes.find((m) => m.id === id);
      setMeme(foundMeme);
    };

    fetchMeme();

    const storedLikes = localStorage.getItem(`meme_likes_${id}`);
    if (storedLikes) setLikes(parseInt(storedLikes));

    const storedComments = localStorage.getItem(`meme_comments_${id}`);
    if (storedComments) setComments(JSON.parse(storedComments));
  }, [id]);

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`meme_likes_${id}`, newLikes);
    let likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];

    // Check if the meme is already liked
    if (!likedMemes.some((m) => m.id === meme.id)) {
      likedMemes.push(meme);
      localStorage.setItem("likedMemes", JSON.stringify(likedMemes));
    }
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(
      `meme_comments_${id}`,
      JSON.stringify(updatedComments)
    );
    setNewComment("");
  };

  if (!meme)
    return <p className="text-center mt-10">Loading meme details...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="w-full p-5 text-center shadow-md bg-white dark:bg-gray-800 rounded-b-lg">
        <h1 className="text-4xl font-extrabold">Meme Details</h1>
      </header>
      <main className="p-5 w-full max-w-3xl flex flex-col items-center">
        <img
          src={meme.url}
          alt={meme.name}
          className="w-full max-w-md rounded-lg shadow-lg"
        />
        <h2 className="mt-4 text-2xl font-bold">{meme.name}</h2>
        <button
          onClick={handleLike}
          className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          ❤️ {likes} Likes
        </button>
        <div className="w-full max-w-md mt-6">
          <h3 className="text-xl font-semibold">Comments</h3>
          <div className="mt-2 space-y-2">
            {comments.map((comment, index) => (
              <p
                key={index}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
              >
                {comment}
              </p>
            ))}
          </div>
          <textarea
            className="mt-4 p-2 w-full border rounded-md text-black"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={addComment}
            className="mt-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Comment
          </button>
          <Link to={`/`}>
            <button className="mt-2 p-2 ml-4 bg-green-500 text-white rounded-md hover:bg-green-600">
              Back to meme
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MemeDetails;
