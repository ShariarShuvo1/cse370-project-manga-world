import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import { useNavigate } from "react-router-dom";
import NewAuthor from "./NewAuthor/NewAuthor";
import NewPublisher from "./NewPublisher/NewPublisher";
import NewCategory from "./NewCategory/NewCategory";
import NewManga from "./NewManga/NewManga";
import NewVolume from "./NewVolume/NewVolume";
import NewChapter from "./NewChapter/NewChapter";

function AddNewManga() {
  const [currentlySelected, setCurrentlySelected] = useState("author");

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
              setCurrentlySelected("author");
            }}
            className={`${
              currentlySelected === "author" &&
              "bg-gray-950 border-white hover:scale-100"
            } bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Add new Author
          </div>
          <div
            onClick={() => {
              setCurrentlySelected("publisher");
            }}
            className={`${
              currentlySelected === "publisher" &&
              "bg-gray-950 border-white hover:scale-100"
            } ms-4 bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Add new Publisher
          </div>
          <div
            onClick={() => {
              setCurrentlySelected("category");
            }}
            className={`${
              currentlySelected === "category" &&
              "bg-gray-950 border-white hover:scale-100"
            } ms-4 bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Add new Category
          </div>
          <div
            onClick={() => {
              setCurrentlySelected("manga");
            }}
            className={`${
              currentlySelected === "manga" &&
              "bg-gray-950 border-white hover:scale-100"
            } ms-4 bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Add new Manga
          </div>

          <div
            onClick={() => {
              setCurrentlySelected("volume");
            }}
            className={`${
              currentlySelected === "volume" &&
              "bg-gray-950 border-white hover:scale-100"
            } ms-4 bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Add new Volume
          </div>

          <div
            onClick={() => {
              setCurrentlySelected("chapter");
            }}
            className={`${
              currentlySelected === "chapter" &&
              "bg-gray-950 border-white hover:scale-100"
            } ms-4 bg-gray-800 border-gray-500 border-2 hover:border-white p-2 rounded-xl hover:bg-gray-950 hover:cursor-pointer transform hover:scale-110 transition-transform duration-500 ease-in-out`}
          >
            Add new Chapter
          </div>
        </div>
        {currentlySelected === "author" && (
          <div className="flex justify-center mt-10">
            <NewAuthor />
          </div>
        )}
        {currentlySelected === "publisher" && (
          <div className="flex justify-center mt-10">
            <NewPublisher />
          </div>
        )}
        {currentlySelected === "category" && (
          <div className="flex justify-center mt-10">
            <NewCategory />
          </div>
        )}
        {currentlySelected === "manga" && (
          <div className="flex justify-center mt-10">
            <NewManga />
          </div>
        )}
        {currentlySelected === "volume" && (
          <div className="flex justify-center mt-10">
            <NewVolume />
          </div>
        )}
        {currentlySelected === "chapter" && (
          <div className="flex justify-center mt-10">
            <NewChapter />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddNewManga;
