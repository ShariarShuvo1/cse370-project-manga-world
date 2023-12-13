import "./../Homepage/Homepage.css";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import User from "../../Model/User";
import UserController from "../../Controller/UserController";
import ProfilePictureController from "../../Controller/ProfilePictureController";
import ProfilePicture from "../../Model/ProfilePicture";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WishlistController from "../../Controller/WishlistController";
import OngoingViewer from "./OngoingViewer";
import WishlistViewer from "./WishlistViewer";
import AlreadyReadViewer from "./AlreadyReadViewer";
import FollowingViewer from "./FollowingViewer";
import AccountSettingViewer from "./AccountSettingViewer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { authorised, userId, userType } = useContext(Auth);
  const [user, setUser] = useState<User>();
  const [profilePicture, setProfilePicture] = useState<ProfilePicture>();
  const [currentlySelected, setCurrentlySelected] =
    useState<string>("Currently Reading");
  let navigate = useNavigate();

  useEffect(() => {
    if (authorised === "false") {
      navigate("/home");
    }
  }, [authorised]);

  useEffect(() => {
    if (authorised && userId) {
      UserController.getUserById(userId).then((res) => {
        setUser(res.data);
        let tempUser: User = res.data;
        ProfilePictureController.getUserProfilePicture(tempUser).then(
          (PPres) => {
            setProfilePicture(PPres.data);
          }
        );
      });
    }
  }, [userId, authorised]);

  const profilePictureChange = (newProfilePicture: ProfilePicture) => {
    setProfilePicture(newProfilePicture);
  };

  return (
    <div className="background_image_home">
      <div className="bg-black bg-opacity-75 min-h-screen">
        {user && (
          <div className="flex">
            <div className="bg-black p-4 text-white max-w-sm min-h-screen">
              <LazyLoadImage
                className="h-64 w-64 rounded-3xl content-center"
                src={profilePicture?.picture}
                alt={user.name}
                height={256}
                width={256}
                placeholderSrc={require("./../../Assets/Images/Placeholders/manga-placeholder.png")}
              />
              <div className=" text-3xl font-bold text-center mt-4">
                {user.name}
              </div>

              <div
                onClick={() => {
                  setCurrentlySelected("Currently Reading");
                }}
                className={` ${
                  currentlySelected === "Currently Reading"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                } mt-4 font-bold rounded p-4 text-lg text-center`}
              >
                Currently Reading
              </div>
              <div
                onClick={() => {
                  setCurrentlySelected("Wishlist");
                }}
                className={` ${
                  currentlySelected === "Wishlist"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                } mt-4 font-bold rounded p-4 text-lg text-center`}
              >
                Wishlist
              </div>
              <div
                onClick={() => {
                  setCurrentlySelected("Completed");
                }}
                className={` ${
                  currentlySelected === "Completed"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                } mt-4 font-bold rounded p-4 text-lg text-center`}
              >
                Completed
              </div>
              <div
                onClick={() => {
                  setCurrentlySelected("Following");
                }}
                className={` ${
                  currentlySelected === "Following"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                } mt-4 font-bold rounded p-4 text-lg text-center`}
              >
                Following
              </div>

              <div
                onClick={() => {
                  setCurrentlySelected("Account Settings");
                }}
                className={` ${
                  currentlySelected === "Account Settings"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
                } mt-4 font-bold rounded p-2 text-lg text-center`}
              >
                Account Settings
              </div>
            </div>
            <div className="ms-10 flex-grow">
              {currentlySelected === "Currently Reading" && (
                <OngoingViewer userId={userId} />
              )}

              {currentlySelected === "Wishlist" && (
                <WishlistViewer userId={userId} />
              )}
              {currentlySelected === "Completed" && (
                <AlreadyReadViewer userId={userId} />
              )}
              {currentlySelected === "Following" && (
                <FollowingViewer userId={userId} />
              )}
              {currentlySelected === "Account Settings" && (
                <AccountSettingViewer
                  user={user}
                  profilePicture={profilePicture}
                  profilePictureChange={profilePictureChange}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
