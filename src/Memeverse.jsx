import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MemeVerse = () => {
  const [memes, setMemes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        setMemes(response.data.data.memes.slice(0, 10));
      })
      .catch((error) => console.error("Error fetching memes:", error));
  }, []);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-blue-600"
      } min-h-screen flex flex-col items-center px-4`}
    >
      <header className="w-full p-5 text-center shadow-md bg-white dark:bg-gray-800 dark:text-white rounded-b-lg flex justify-between items-center">
        <h1 className="text-4xl font-extrabold">MemeVerse</h1>
        {/* <Link to={`/MemeExplorer`}><h1 className="text-4xl font-extrabold">MemeExplorer</h1></Link> */}
        {/* <Link to={`/MemeUpload`}><h1 className="text-4xl font-extrabold">Meme-Upload</h1></Link> */}
        <Link to={`/UserProfile`}>
          <img
            className="w-12 rounded-md"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ4qSRZgiuO9RnzO-CfhMlJrSe23bsHqOvog&s"
            title="User details"
          />
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full shadow-md transition-all"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </header>
      <main className="p-5 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <Link
            to={`/meme/${meme.id}`}
            key={meme.id}
            className="block p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:scale-105 transition"
          >
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-52 object-cover rounded-md"
            />
            <p className="text-lg font-semibold text-center mt-2">
              {meme.name}
            </p>
          </Link>
        ))}
      </main>
      <Link to={`/MemeExplorer`}>
        <h1 className="text-4xl font-extrabold text-black">
          Explore more memes Click hear...
        </h1>
      </Link>
    </div>
  );
};

export default MemeVerse;
