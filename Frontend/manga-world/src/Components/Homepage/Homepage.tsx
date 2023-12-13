import "./Homepage.css";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import { Link, useNavigate } from "react-router-dom";
import CategoryController from "../../Controller/CategoryController";
import Category from "../../Model/Category";
import Manga from "../../Model/Manga";
import MangaController from "../../Controller/MangaController";
import MangaPictureController from "../../Controller/MangaPictureController";
import MangaPicture from "../../Model/MangaPicture";
import AuthorManga from "../../Model/AuthorManga";
import AuthorMangaController from "../../Controller/AuthorMangaController";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Card from "../Card/Card";

function SmallCard(props: Manga) {
  const [manga, setManga] = useState<Manga>(props);
  const [mangaImage, setMangaImage] = useState<MangaPicture>();
  const [authorManga, setAuthorManga] = useState<AuthorManga[]>([]);
  useEffect(() => {
    MangaPictureController.getByManga(manga).then((res) => {
      setMangaImage(res.data);
    });

    AuthorMangaController.getAuthorMangaByManga(manga).then((res) => {
      setAuthorManga(res.data);
    });
  }, [manga]);

  return (
    <div className="flex border-2 border-e-0 rounded-e-none border-gray-600 hover:border-gray-400 text-white mt-1 p-2 font-bold bg-black bg-opacity-70 rounded-lg hover:scale-105 hover:rounded-xl transition-transform duration-300 ease-in-out">
      <div>
        {mangaImage && (
          <Link
            to={{
              pathname: "/manga",
              search: `?data=${encodeURIComponent(
                JSON.stringify({
                  manga: manga,
                })
              )}`,
            }}
          >
            <LazyLoadImage
              className={`rounded-lg object-fill w-16 h-24 transform hover:scale-110 hover:rounded-xl transition-transform duration-500 ease-in-out`}
              src={mangaImage.mpPicture}
              alt={manga.mtitle}
              width={64}
              height={96}
              placeholderSrc={require("./../../Assets/Images/Placeholders/manga-placeholder.png")}
            />
          </Link>
        )}
      </div>
      <div className="ms-4 mt-2">
        <Link
          to={{
            pathname: "/manga",
            search: `?data=${encodeURIComponent(
              JSON.stringify({
                manga: manga,
              })
            )}`,
          }}
          className="hover:text-blue-400 hover:underline font-bold text-xl"
        >
          {manga.mtitle}
        </Link>
        <div className="text-sm font-normal mt-2">
          Status:{" "}
          {manga.mstatus === "ongoing" ? (
            <span className="text-gray-400">On going</span>
          ) : (
            <span className="text-green-700">Complete</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Homepage() {
  const [catagories, setCatagories] = useState<Category[]>([]);
  const [mostViewedMangas, setMostViewedMangas] = useState<Manga[]>([]);
  const [mostRatedMangas, setMostRatedMangas] = useState<Manga[]>([]);
  const [newMangas, setNewMangas] = useState<Manga[]>([]);
  const [mostReadMangas, setMostReadMangas] = useState<Manga[]>([]);
  const [todaysPick, setTodaysPick] = useState<Manga[]>([]);
  const [basedOnSearch, setBasedOnSearch] = useState<Manga[]>([]);

  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();

  useEffect(() => {
    CategoryController.allCategories().then((res) => {
      setCatagories(res.data);
    });
  }, []);

  useEffect(() => {
    MangaController.getMostViewedManga().then((res) => {
      setMostViewedMangas(res.data);
    });

    MangaController.getMostRatedManga().then((res) => {
      setMostRatedMangas(res.data);
    });

    MangaController.getNewManga().then((res) => {
      setNewMangas(res.data);
    });

    MangaController.getMostReadMangas().then((res) => {
      setMostReadMangas(res.data);
    });

    if (authorised === "false") {
      MangaController.getTodayPickMangas().then((res) => {
        setTodaysPick(res.data);
      });
    }

    if (authorised === "true") {
      MangaController.getBasedOnLastSearch(userId).then((res) => {
        setBasedOnSearch(res.data);
      });
    }
  }, [authorised]);

  return (
    <div className="background_image_home">
      <div className="flex">
        <div className="bg-black bg-opacity-75">
          {catagories.map((category) => (
            <Link
              to={{
                pathname: "/category",
                search: `?data=${encodeURIComponent(
                  JSON.stringify({
                    category: category,
                  })
                )}`,
              }}
              key={category.cid}
              className="text-white block mt-1 p-2 font-bold bg-black bg-opacity-10 hover:bg-opacity-75 hover:rounded hover:cursor-pointer hover:m-1 hover:scale-110 transition-transform duration-300 ease-in-out"
            >
              {category.cname}
            </Link>
          ))}
        </div>
        <div>
          <div className="flex">
            <div className="p-4 w-1/4 flex-grow bg-black bg-opacity-75">
              <div className="p-2 bg-gray-900 bg-opacity-25 rounded">
                <div className="bg-gray-900 p-5 rounded text-white text-center text-4xl font-bold">
                  Most Viewed Manga
                </div>
                {mostViewedMangas.map((manga) => (
                  <Card {...manga} key={manga.mid} />
                ))}
              </div>
            </div>
            <div className="p-4 w-1/4 flex-grow bg-black bg-opacity-75">
              <div className="p-2 bg-gray-900 bg-opacity-25 rounded">
                <div className="bg-gray-900 p-5 rounded text-white text-center text-4xl font-bold">
                  Most Rated Manga
                </div>
                {mostRatedMangas.map((manga) => (
                  <Card {...manga} key={manga.mid} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="p-4 w-1/4 flex-grow bg-black bg-opacity-75">
              <div className="p-2 bg-gray-900 bg-opacity-25 rounded">
                <div className="bg-gray-900 p-5 rounded text-white text-center text-4xl font-bold">
                  New Releases
                </div>
                {newMangas.map((manga) => (
                  <Card {...manga} key={manga.mid} />
                ))}
              </div>
            </div>
            <div className="p-4 w-1/4 flex-grow bg-black bg-opacity-75">
              <div className="p-2 bg-gray-900 bg-opacity-25 rounded">
                <div className="bg-gray-900 p-5 rounded text-white text-center text-4xl font-bold">
                  Most Read Manga
                </div>
                {mostReadMangas.map((manga) => (
                  <Card {...manga} key={manga.mid} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-96 ps-4 bg-black bg-opacity-75">
          {authorised === "false" && (
            <div className="p-2 bg-gray-900 bg-opacity-25 rounded">
              <div className="bg-gray-800 mt-5 p-5 rounded text-white text-center text-4xl font-bold">
                Random Pick
              </div>
              {todaysPick.map((manga) => (
                <SmallCard {...manga} key={manga.mid} />
              ))}
            </div>
          )}
          {authorised === "true" && (
            <div className="p-2 bg-gray-900 bg-opacity-25 rounded">
              <div className="bg-gray-900 mt-5 p-5 rounded text-white text-center text-4xl font-bold">
                You might like
              </div>
              {basedOnSearch.map((manga) => (
                <SmallCard {...manga} key={manga.mid} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
