import "./../Homepage/Homepage.css";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Manga from "../../Model/Manga";
import MangaPicture from "../../Model/MangaPicture";
import MangaPictureController from "../../Controller/MangaPictureController";
import { LazyLoadImage } from "react-lazy-load-image-component";
import AuthorManga from "../../Model/AuthorManga";
import AuthorMangaController from "../../Controller/AuthorMangaController";
import PublisherMangaController from "../../Controller/PublisherMangaController";
import PublisherManga from "../../Model/PublisherManga";
import Publisher from "../../Model/Publisher";
import PublisherPicture from "../../Model/PublisherPicture";
import AuthorController from "../../Controller/AuthorController";
import PublisherController from "../../Controller/PublisherController";
import Subpage from "../Utility/Subpage";

function PublisherViewer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher>();
  const [publisherPicture, setPublisherPicture] = useState<PublisherPicture>();

  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const selectedPublisherTemp: Publisher = data.publisher;
    setSelectedPublisher(selectedPublisherTemp);
  }, []);

  useEffect(() => {
    if (selectedPublisher) {
      PublisherController.findPublisherPictureByPublisher(
        selectedPublisher
      ).then((res) => {
        setPublisherPicture(res.data);
      });
    }
  }, [selectedPublisher]);

  return (
    <div
      className="background_image_home"
      style={
        publisherPicture
          ? { backgroundImage: `url(${publisherPicture.ppPicture})` }
          : {
              backgroundImage: `url("./../../Assets/Images/Backgrounds/home-page-bg.jpg")`,
            }
      }
    >
      <div className="bg-black bg-opacity-90">
        <div className="flex ">
          <LazyLoadImage
            className={`m-2 rounded-lg object-fill w-64 h-96 `}
            src={publisherPicture?.ppPicture}
            alt={publisherPicture?.publisher.pname}
            width={256}
            height={384}
            placeholderSrc={require("./../../Assets/Images/Placeholders/manga-placeholder.png")}
          />
          {selectedPublisher && (
            <div className="m-2 ms-4 text-white">
              <div className="font-bold text-6xl">
                {selectedPublisher.pname}
              </div>
              <div className="text-sm max-w-7xl mt-5">
                {selectedPublisher.pdescription}
              </div>
              <div>
                <a
                  href={selectedPublisher.pwebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 hover:underline"
                >
                  Visit Website
                </a>
              </div>
            </div>
          )}
        </div>
        {selectedPublisher && (
          <div>
            <div className=" text-white text-center font-bold text-4xl p-4">
              {selectedPublisher.pname} Manga
            </div>
            <div>
              <div>
                <Subpage
                  fetchMangaData={PublisherController.getAllPublisherManga}
                  fetchMangaPageNumber={
                    PublisherController.getPublisherMangaCount
                  }
                  element={selectedPublisher}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PublisherViewer;
