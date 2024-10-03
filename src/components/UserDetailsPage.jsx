import { useContext } from "react";
import UserContext from "./context/UserContext";
import UserUpdate from "./UserUpdate";
const UserPost = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { user, handleUserUpdateData, toggleUserUpdateModal } =
    useContext(UserContext);

  console.log("userDetails", userDetails);
  console.log("user", user);
  let userDetailsId = userDetails?.user?.id;
  let userId = user?.id;

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Profile Header */}
      {toggleUserUpdateModal && <UserUpdate />}
      <div className="flex items-center border-b border-gray-300 pb-4">
        <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {`${userDetails?.user?.first_name[0]} ${userDetails?.user?.last_name[0]}`}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}</h1>
          <p className="mt-2 text-gray-600 flex flex-col items-center">
            <div> {userDetails?.post.length}</div>
            <div className="mb-4">posts</div>
          </p>
          {userDetailsId === userId && (
            <button
              to="/userupdate"
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleUserUpdateData}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {userDetails?.post?.map((item) => {
          return (
            <div key={item?.id} className="flex flex-col m-5">
              <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.image_url}
                  alt="Post 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>{item.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPost;
