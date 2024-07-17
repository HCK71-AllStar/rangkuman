import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
// import { Image, Transformation, CloudinaryContext } from "cloudinary-react";

export function CmsUploadPhotos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("imgUrl", file);
    }
    try {
      const response = await axios.post(`/${id}/photos/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log("Uploaded images:", response.data);
      navigate("/cms/rooms");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/cms/rooms" className="border border-blue-500 py-2 px-6 mb-5 text-blue-500 inline-block rounded hover:bg-blue-500 hover:text-white transition duration-300">
        Back
      </Link>
      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-gray-100 p-6 rounded shadow-md">
        <input type="file" multiple onChange={handleFileChange} className="mb-4 p-2 border border-gray-300 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Upload
        </button>
      </form>
    </div>
  );
}
