import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white text-center p-5">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! Looks like you took a wrong turn.</p>
      <img
        src="https://i.imgflip.com/1bij.jpg"
        alt="Funny Meme"
        className="w-64 rounded-lg shadow-lg mb-4"
      />
      <p className="text-lg mb-4">
        But hey, at least enjoy this meme before you go back!
      </p>
      <Link
        to="/"
        className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Take me Home
      </Link>
    </div>
  );
};

export default NotFound;
