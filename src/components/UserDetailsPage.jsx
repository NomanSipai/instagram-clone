import React from "react";

const UserPost = () => {
  return (
    <section className="relative pt-36 pb-24">
      <img
        src="https://pagedone.io/asset/uploads/1705471739.png"
        alt="cover-image"
        className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
      />
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center relative z-10 mb-2.5">
          <img
            src="https://pagedone.io/asset/uploads/1705471668.png"
            alt="user-avatar-image"
            className="border-4 border-solid border-white rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5"></div>
        <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
          Jenny Wilson
        </h3>
        <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
          A social media influencers and singer
        </p>
      </div>
    </section>
  );
};

export default UserPost;
