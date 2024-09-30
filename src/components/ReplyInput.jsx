import React, { useState } from "react";

const ReplyInput = ({ onSubmit }) => {
  const [reply, setReply] = useState("");

  const handleChange = (e) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim()) {
      onSubmit(reply);
      setReply(""); // Clear the input after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={reply}
        onChange={handleChange}
        placeholder="Write your reply..."
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
        Submit Reply
      </button>
    </form>
  );
};

export default ReplyInput;
