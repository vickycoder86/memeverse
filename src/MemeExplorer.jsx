import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { Link } from "react-router-dom";

const MemeExplorer = () => {
  const [memes, setMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("trending");
  const [sortBy, setSortBy] = useState("likes");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      let fetchedMemes = response.data.data.memes;

      if (category === "new") {
        fetchedMemes = fetchedMemes.reverse();
      } else if (category === "classic") {
        fetchedMemes = fetchedMemes.slice(0, 10);
      }

      if (sortBy === "likes") {
        fetchedMemes = fetchedMemes.sort((a, b) => b.width - a.width);
      } else if (sortBy === "date") {
        fetchedMemes = fetchedMemes.reverse();
      }

      if (searchTerm) {
        fetchedMemes = fetchedMemes.filter((meme) =>
          meme.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setMemes(fetchedMemes.slice(0, page * 10));
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMemes();
  }, [category, sortBy, searchTerm, page]);

  const handleSearch = useCallback(
    debounce((term) => setSearchTerm(term), 500),
    []
  );

  return (
    <div className="min-h-screen flex flex-col items-center px-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="w-full p-5 text-center shadow-md bg-white dark:bg-gray-800 rounded-b-lg">
        <h1 className="text-4xl font-extrabold">Meme Explorer</h1>
        <input
          type="text"
          placeholder="Search memes..."
          className="mt-4 p-2 w-full max-w-md border rounded-md text-black"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="flex gap-4 mt-4">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-md text-black"
          >
            <option value="trending">Trending</option>
            <option value="new">New</option>
            <option value="classic">Classic</option>
            <option value="random">Random</option>
          </select>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md text-black"
          >
            <option value="likes">Sort by Likes</option>
            <option value="date">Sort by Date</option>
          </select>
          <Link to={`/`}>
            <button className="p-2 ml-4 bg-green-500 text-white rounded-md hover:bg-green-600">
              Back to meme
            </button>
          </Link>
          <Link to={`/MemeUpload`}>
            <button className="p-2 ml-24 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              Upload Meme
            </button>
          </Link>
        </div>
      </header>
      <main className="p-5 w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <Link to={`/meme/${meme.id}`} key={meme.id}>
            <div
              key={meme.id}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-center mt-2 font-semibold text-lg">
                {meme.name}
              </p>
            </div>
          </Link>
        ))}
      </main>
      {loading && (
        <p className="text-center text-lg mt-4">Loading more memes...</p>
      )}
      <button
        onClick={() => setPage(page + 1)}
        className="mt-6 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Load More
      </button>
    </div>
  );
};

export default MemeExplorer;
