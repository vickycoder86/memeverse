import React, { useState } from "react";

const MemeUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(reader.result); // Store image as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    // Create new meme object
    const newMeme = { url: image, caption };

    // Get existing memes from localStorage
    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const updatedMemes = [...storedMemes, newMeme];

    // Save updated memes to localStorage
    localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));

    alert("Meme Uploaded Successfully!");

    // Clear input fields
    setImage(null);
    setCaption("");
    setPreview(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="w-full p-5 text-center shadow-md bg-white dark:bg-gray-800 rounded-b-lg">
        <h1 className="text-4xl font-extrabold">Upload Your Meme</h1>
      </header>
      <main className="p-5 w-full max-w-3xl flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
        />
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Meme Preview"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        )}
        <textarea
          className="p-2 w-full max-w-md border rounded-md text-black"
          placeholder="Add a funny caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button
          onClick={handleUpload}
          className="mt-4 p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Upload Meme
        </button>
      </main>
    </div>
  );
};

export default MemeUpload;
