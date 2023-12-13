import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import Author from "../../Model/Author";
import "./../Homepage/Homepage.css";
import Subpage from "../Utility/Subpage";
import AuthorController from "../../Controller/AuthorController";
import AuthorPicture from "../../Model/AuthorPicture";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UserController from "../../Controller/UserController";
import User from "../../Model/User";
import FollowController from "../../Controller/FollowController";
import Follow from "../../Model/Follow";
import followController from "../../Controller/FollowController";

function AuthorViewer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";
  const [selectedAuthor, setSelectedAuthor] = useState<Author>();
  const [authorPicture, setAuthorPicture] = useState<AuthorPicture>();
  const [currentlyFollowing, setCurrentlyFollowing] = useState<boolean>(false);
  const [follow, setFollow] = useState<Follow>();
  const [totalFollower, setTotalFollower] = useState<number>(0);

  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const selectedAuthorTemp: Author = data.author;
    setSelectedAuthor(selectedAuthorTemp);
  }, []);

  useEffect(() => {
    if (selectedAuthor) {
      AuthorController.findAuthorPictureByAuthor(selectedAuthor).then((res) => {
        setAuthorPicture(res.data);
      });
    }
  }, [selectedAuthor]);

  useEffect(() => {
    if (selectedAuthor && userId) {
      UserController.getUserById(userId).then((res) => {
        const user: User = res.data;
        let followTemp = {
          user: user,
          author: selectedAuthor,
        };
        FollowController.followCheck(followTemp)
          .then((res) => {
            setCurrentlyFollowing(true);
            setFollow(res.data);
          })
          .catch((res) => {
            setCurrentlyFollowing(false);
          });
      });
    }
  }, [selectedAuthor, userId]);

  function onFollow() {
    if (selectedAuthor && userId && authorised === "true") {
      UserController.getUserById(userId).then((res) => {
        const user: User = res.data;
        let follow = {
          user: user,
          author: selectedAuthor,
        };
        followController.follow(follow).then((res) => {
          setCurrentlyFollowing(true);
          setFollow(res.data);
        });
      });
    }
  }

  function onUnfollow() {
    if (selectedAuthor && userId && authorised === "true") {
      UserController.getUserById(userId).then((res) => {
        const user: User = res.data;
        let follow = {
          user: user,
          author: selectedAuthor,
        };
        followController.unfollow(follow).then((res) => {
          setCurrentlyFollowing(false);
        });
      });
    }
  }

  useEffect(() => {
    if (selectedAuthor) {
      followController.getTotalFollower(selectedAuthor).then((res) => {
        setTotalFollower(res.data);
      });
    }
  }, [currentlyFollowing, selectedAuthor, userId]);

  return (
    <div
      className="background_image_home"
      style={
        authorPicture
          ? { backgroundImage: `url(${authorPicture.apPicture})` }
          : {
              backgroundImage: `url("./../../Assets/Images/Backgrounds/home-page-bg.jpg")`,
            }
      }
    >
      <div className="bg-black bg-opacity-90 min-h-screen">
        <div className="flex ">
          <LazyLoadImage
            className={`m-2 rounded-lg object-fill w-64 h-96 `}
            src={authorPicture?.apPicture}
            alt={authorPicture?.author.aname}
            width={256}
            height={384}
            placeholderSrc={require("./../../Assets/Images/Placeholders/manga-placeholder.png")}
          />
          {selectedAuthor && (
            <div className="flex justify-between">
              <div className="m-2 ms-4 text-white max-w-7xl">
                <div className="font-bold text-6xl">{selectedAuthor.aname}</div>
                <div className="text-sm max-w-7xl mt-5">
                  {selectedAuthor.adescription}
                </div>
                <div>
                  <a
                    href={selectedAuthor.awebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
                <div className="font-bold mt-4">
                  Total Follower: {totalFollower}
                </div>
              </div>
              <div className="mt-10">
                {!currentlyFollowing && authorised === "true" && (
                  <div
                    onClick={onFollow}
                    className=" bg-white ps-4 pe-4 pt-2 pb-2 text-xl font-bold rounded hover:cursor-pointer hover:bg-green-100 hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    Follow
                  </div>
                )}
                {currentlyFollowing && authorised === "true" && (
                  <div
                    onClick={onUnfollow}
                    className=" bg-white ps-4 pe-4 pt-2 pb-2 text-xl font-bold rounded hover:cursor-pointer hover:bg-red-100 hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    Unfollow
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {selectedAuthor && (
          <div>
            <div className=" text-white text-center font-bold text-4xl p-4">
              {selectedAuthor.aname} Manga
            </div>
            <div>
              <div>
                <Subpage
                  fetchMangaData={AuthorController.getAllAuthorManga}
                  fetchMangaPageNumber={AuthorController.getAuthorMangaCount}
                  element={selectedAuthor}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorViewer;
