import axios from "axios";
import React, { useContext, useState } from "react";
import myContext from "../Store/context";
import API from "../utils/api";

function Upload({ setOpen }) {
  const { authState } = useContext(myContext);

  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleVideoChange = (e) => setVideoFile(e.target.files[0]);
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", description);

      // Split and append tags (choose method based on backend handling)
      tags
        .split(",")
        .map((tag) => tag.trim())
        .forEach((tag) => {
          formData.append("tags[]", tag); // Use this if backend expects an array
        });

      formData.append("thumbnail", imageFile);
      formData.append("video", videoFile);

      // Send form-data request
      const response = await API.post(
        `http://localhost:8000/api/video/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data, "--> Video data uploaded");
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload. Please try again.");
    }
  };

  return (
    <div className="absolute top-0 right-0 h-full w-full bg-[#000000e1] flex items-center justify-center">
      {/* Wrapper */}
      <div className="w-[600px] bg-white p-5 rounded-lg relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-2 right-5 font-bold text-2xl text-red-600"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-4">Upload a New Video</h1>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Video Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Video:</label>
            <input
              type="file"
              accept="video/*"
              className="w-full border border-gray-300 rounded-lg p-2"
              name="video"
              onChange={handleVideoChange}
              required
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Description:</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">
              Separate the tags with commas:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-2"
              name="thumbnail"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
