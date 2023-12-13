import Manga from "../../Model/Manga";
import { useEffect, useState } from "react";
import MangaPicture from "../../Model/MangaPicture";
import AuthorManga from "../../Model/AuthorManga";
import MangaPictureController from "../../Controller/MangaPictureController";
import AuthorMangaController from "../../Controller/AuthorMangaController";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Card(props: Manga) {
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
    <div className="flex border-2 border-gray-600 hover:border-gray-400 text-white m-1 p-2 font-bold bg-black bg-opacity-70 rounded-lg hover:scale-105 hover:rounded-xl transition-transform duration-300 ease-in-out">
      <div>
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
            className={`rounded-lg object-fill w-28 h-44 transform hover:scale-110 hover:rounded-xl transition-transform duration-500 ease-in-out`}
            src={mangaImage?.mpPicture}
            alt={manga.mtitle}
            width={112}
            height={176}
            placeholderSrc={require("./../../Assets/Images/Placeholders/manga-placeholder.png")}
          />
        </Link>
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
        <div className="text-sm font-normal mt-2 max-w-md">
          {manga.mdescription.slice(0, 100)}...
        </div>
        <div className="text-sm font-normal mt-2">
          Release Date: {manga.mpublishDate.toString()}
        </div>
        <div className="text-sm font-normal mt-2">
          Status:{" "}
          {manga.mstatus === "ongoing" ? (
            <span className="text-gray-400">On going</span>
          ) : (
            <span className="text-green-700">Complete</span>
          )}
        </div>

        <div className="text-sm font-normal mt-2">
          Mangaka:{" "}
          {authorManga.map((author) => (
            <Link
              key={author.aid}
              to={{
                pathname: "/author",
                search: `?data=${encodeURIComponent(
                  JSON.stringify({
                    author: author.author,
                  })
                )}`,
              }}
              className="hover:text-blue-400 hover:underline text-lg bg-gray-800 hover:bg-gray-900 ms-2 rounded p-1"
            >
              {author.author.aname}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
