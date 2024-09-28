import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const CreatePost = () => {
  const { register, handleSubmit, reset } = useForm();
  const [image, setImage] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("description", data.description);
    if (image) {
      formData.append("image", image);
    }

    console.log("formData", formData);

    try {
      const res = await axios.post(
        "http://192.168.1.77:3000/api/posts/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response" + res);

      toast.success(res.data.message);
      reset();
      setImage(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create post";
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white"
    >
      <div>
        <label htmlFor="description" className="block">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          className="border p-2 w-full"
          rows="4"
        />
      </div>
      <div>
        <label htmlFor="image" className="block">
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Post
      </button>
    </form>
  );
};

export default CreatePost;
