import "./../Homepage/Homepage.css";
import NewAuthor from "../AdminView/NewAuthor/NewAuthor";
import NewPublisher from "../AdminView/NewPublisher/NewPublisher";
import NewCategory from "../AdminView/NewCategory/NewCategory";
import NewManga from "../AdminView/NewManga/NewManga";
import NewVolume from "../AdminView/NewVolume/NewVolume";
import NewChapter from "../AdminView/NewChapter/NewChapter";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import { useNavigate } from "react-router-dom";
import RemoveUser from "./RemoveUser";
import RemoveManga from "./RemoveManga";
function AdminPanel() {
  const [currentlySelected, setCurrentlySelected] = useState("Remove a user");

  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();
  useEffect(() => {
    if (userType !== "admin") {
      navigate("/home");
    }
  }, [authorised, navigate, userId, userType]);

  return (
    <div className="background_image_home">
      <div className={`bg-black bg-opacity-90 min-h-screen`}>
        <div className="flex justify-center pt-10 p-4 text-gray-200 text-2xl font-bold">
          <div
            onClick={() => {
              setCurrentlySelected("Remove a user");
            }}
            className={`${
              currentlySelected === "Remove a user" &&
              "bg-gray-950 border-white hover:scale-100"
            } bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Remove a user
          </div>
          <div
            onClick={() => {
              setCurrentlySelected("Remove a manga");
            }}
            className={`${
              currentlySelected === "Remove a manga" &&
              "bg-gray-950 border-white hover:scale-100"
            } ms-4 bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Remove a manga
          </div>
        </div>
        {currentlySelected === "Remove a user" && (
          <div className="flex justify-center mt-10">
            <RemoveUser />
          </div>
        )}
        {currentlySelected === "Remove a manga" && (
          <div className="flex justify-center mt-10">
            <RemoveManga />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
