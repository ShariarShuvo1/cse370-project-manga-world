import User from "../../Model/User";
import ProfilePicture from "../../Model/ProfilePicture";
import React, { useContext, useEffect, useRef, useState } from "react";
import ProfilePictureController from "../../Controller/ProfilePictureController";
import AuthenticationController from "../../Controller/AuthenticationController";
import UserController from "../../Controller/UserController";
import { Auth } from "../../Auth/Auth";
import { useNavigate } from "react-router-dom";

interface AccountSettingViewerProps {
  user: User;
  profilePicture: ProfilePicture | undefined;
  profilePictureChange: (newProfilePicture: ProfilePicture) => void;
}

function AccountSettingViewer(props: AccountSettingViewerProps) {
  const { user, profilePicture, profilePictureChange } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [picture, setPicture] = useState<string | undefined>();
  const [deleteSelected, setDeleteSelected] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  let navigate = useNavigate();

  const { authorised, setAuthorised, setUserId, setUserType } =
    useContext(Auth);

  useEffect(() => {
    if (authorised === "false") {
      navigate("/home");
    }
  }, [authorised]);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters");
    } else {
      setPasswordError("");
    }
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onProfilePictureUpdate = () => {
    if (picture) {
      if (profilePicture) {
        profilePicture.picture = picture;
        ProfilePictureController.updateProfilePicture(profilePicture).then(
          (res) => {
            profilePictureChange(res.data);
          }
        );
      } else {
        let tempProfilePicture = {
          picture: picture,
          user: user,
        };
        ProfilePictureController.updateProfilePicture(tempProfilePicture).then(
          (res) => {
            profilePictureChange(res.data);
          }
        );
      }
      if (fileInputRef.current) {
        (fileInputRef.current as any).value = "";
      }
      setPicture(undefined);
    }
  };

  const deleteAccount = () => {
    if (password.length >= 4 && !passwordError) {
      let credentials = {
        email: user.email,
        password: password,
      };
      AuthenticationController.login(credentials)
        .then((response) => {
          const userData: User = response.data;
          UserController.deleteUser(userData.userId).then((res) => {
            setAuthorised("false");
            setUserId("");
            setUserType("");
          });
        })
        .catch((error) => {
          setLoginError("Invalid Password");
        });
    }
  };

  return (
    <div
      className={`flex items-center justify-center mt-10 ${
        deleteSelected && "h-screen"
      }`}
    >
      {deleteSelected ? (
        <div className=" text-center bg-black bg-opacity-75 p-10 rounded">
          <div className="mb-4">
            <div className="mb-2">
              <label
                className="block text-white text-left text-sm font-bold mb-2"
                htmlFor="password"
              >
                Confirm With Your Password
              </label>
              <input
                className="shadow border rounded py-3 px-4 text-black focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              )}
            </div>
            <div
              onClick={deleteAccount}
              className={` ${
                !passwordError && password.length >= 4
                  ? "bg-red-800 hover:rounded-lg hover:bg-red-600 hover:cursor-pointer hover:border-2 hover:border-pink-600 hover:scale-110 transition-transform duration-300 ease-in-out"
                  : " bg-red-950"
              }  p-2 rounded-lg mt-2 font-bold `}
            >
              Confirm Deleting Account
            </div>
            {loginError && (
              <div className="text-red-500 text-xs italic mt-2">
                {loginError}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-1/3 text-center bg-black bg-opacity-75 p-10 rounded">
          <div className="mb-4">
            {picture && (
              <div className="mt-4">
                <img
                  src={picture}
                  alt="Selected"
                  className="w-full border-2 border-white rounded-xl"
                />
              </div>
            )}
            <label
              htmlFor="picture"
              className="block text-left text-sm font-medium text-white"
            >
              Change Profile Picture
            </label>
            <input
              type="file"
              id="picture"
              accept="image/*"
              onChange={handlePictureChange}
              className="block hover:border-2 hover:border-indigo-600 mt-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              ref={fileInputRef}
            />
            <div
              onClick={onProfilePictureUpdate}
              className={` ${
                picture
                  ? "bg-white hover:rounded-lg hover:bg-gray-200 hover:cursor-pointer hover:border-2 hover:border-indigo-600 hover:scale-110 transition-transform duration-300 ease-in-out"
                  : " bg-gray-500"
              } p-2 rounded-lg mt-4 font-bold `}
            >
              Update Profile Picture
            </div>
            <div
              onClick={() => {
                setDeleteSelected(true);
              }}
              className={` p-2 bg-red-800 rounded-lg mt-4 font-bold hover:rounded-lg hover:bg-red-600 hover:cursor-pointer hover:border-2 hover:border-pink-600 hover:scale-110 transition-transform duration-300 ease-in-out`}
            >
              Delete Profile
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSettingViewer;
