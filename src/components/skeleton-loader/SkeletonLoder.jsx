import React from "react";

const SkeletonLoder = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="animate-pulse">
        <div className="w-full h-48 bg-gray-300" />
        <div className="p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="ml-2 w-1/3 h-4 bg-gray-300 rounded" />
          </div>
          <div className="mt-2 h-6 bg-gray-300 rounded" />
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded" />
              <span className="ml-2 w-12 h-4 bg-gray-300 rounded" />
            </div>
            <div className="ml-4 flex items-center">
              <div className="w-5 h-5 bg-gray-300 rounded" />
              <span className="ml-2 w-12 h-4 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoder;
