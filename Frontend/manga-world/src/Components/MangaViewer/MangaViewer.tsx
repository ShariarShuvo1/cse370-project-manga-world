import "./../Homepage/Homepage.css";
import { useContext, useEffect, useRef, useState } from "react";
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
import Volume from "../../Model/Volume";
import VolumeController from "../../Controller/VolumeController";
import VolumeCard from "./VolumeCard/VolumeCard";
import manga from "../../Model/Manga";
import MangaController from "../../Controller/MangaController";
import Rate from "../../Model/Rate";
import RateController from "../../Controller/RateController";
import Pagination from "../Utility/Pagination";
import * as timers from "timers";
import UserController from "../../Controller/UserController";
import User from "../../Model/User";
import WishlistController from "../../Controller/WishlistController";
interface StarRatingProps {
  value: number;
  onClick: (value: number) => void;
}

function StarRating({ value, onClick }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onClick(star)}
          className={`cursor-pointer ${
            star <= value ? "text-yellow-500" : "text-gray-300"
          } text-5xl`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}
function MangaViewer() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";
  const [selectedManga, setSelectedManga] = useState<Manga>();
  const [selectedMangaPicture, setSelectedMangaPicture] =
    useState<MangaPicture>();
  const [authorManga, setAuthorManga] = useState<AuthorManga[]>([]);
  const [publisherManga, setPublisherManga] = useState<PublisherManga>();
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [totalRating, setTotalRating] = useState<number>(0);
  const [currentlySelected, setCurrentlySelected] = useState<string>("volumes");
  const [rates, setRates] = useState<Rate[]>([]);
  const [currentRatingPage, setCurrentRatingPage] = useState<number>(1);
  const [isRated, setIsRated] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hasWishlist, setHasWishlist] = useState<string>("interested");
  const [selectedOption, setSelectedOption] = useState<string>("");

  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const selectedMangaTemp: Manga = data.manga;
    setSelectedManga(selectedMangaTemp);
  }, []);

  useEffect(() => {
    if (selectedManga) {
      MangaController.mangaViewIncrement(selectedManga).then((res) => {});
      MangaPictureController.getByManga(selectedManga).then((mangaPicture) => {
        setSelectedMangaPicture(mangaPicture.data);
      });
      AuthorMangaController.getAuthorMangaByManga(selectedManga).then((res) => {
        setAuthorManga(res.data);
      });
      PublisherMangaController.getPublisherMangaByManga(selectedManga).then(
        (res) => {
          setPublisherManga(res.data);
        }
      );
      MangaController.getAverageRating(selectedManga).then((res) => {
        setAverageRating(res.data);
      });
      MangaController.getTotalRating(selectedManga).then((res) => {
        setTotalRating(res.data);
      });
      if (authorised === "true") {
        RateController.findRateByUser(userId, selectedManga).then((res) => {
          setIsRated(res.data);
        });
      }
      if (currentlySelected === "volumes") {
        VolumeController.findAllByManga(selectedManga).then((res) => {
          setVolumes(res.data);
        });
      } else {
        RateController.getAllRating(currentRatingPage - 1, selectedManga).then(
          (res) => {
            setRates(res.data);
          }
        );
      }
    }
  }, [selectedManga, currentlySelected, showReview]);

  useEffect(() => {
    if (authorised === "true" && selectedManga && userId) {
      UserController.getUserById(userId).then((res) => {
        let tempWishlist = {
          user: res.data,
          manga: selectedManga,
        };
        WishlistController.currentStatusChecker(tempWishlist).then((res) => {
          setHasWishlist(res.data);
        });
      });
    }
  }, [selectedManga, authorised, userId]);

  const getReviewPointColor = (value: number | null): string => {
    if (value === null) {
      return "";
    }
    const red = Math.round(255 - (value / 5) * 255);
    const green = Math.round((value / 5) * 255);
    return `rgb(${red}, ${green}, 0)`;
  };

  function formatTime(date: Date): string {
    date = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return date.toLocaleString(undefined, options);
  }
  const onPageChange = (page: number) => {
    setCurrentRatingPage(page);
    RateController.getAllRating(page - 1, selectedManga).then((res) => {
      setRates(res.data);
    });
  };

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    UserController.getUserById(userId).then((res) => {
      let user: User = res.data;
      let tempRate = {
        rvalue: rating,
        rcomment: reviewText,
        user: user,
        manga: selectedManga,
      };
      RateController.addNewRate(tempRate).then((res) => {
        setReviewText("");
        setRating(0);
        setShowReview(false);
      });
    });
  };

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption !== hasWishlist &&
      selectedOption !== "interested" &&
      authorised === "true" &&
      userId &&
      selectedManga
    ) {
      UserController.getUserById(userId).then((res) => {
        let user: User = res.data;
        let tempWishlist = {
          user: res.data,
          manga: selectedManga,
        };
        if (selectedOption === "ongoing") {
          WishlistController.addToOngoing(tempWishlist).then((res) => {
            setHasWishlist("ongoing");
          });
        } else if (selectedOption === "wishlist") {
          WishlistController.addToWishList(tempWishlist).then((res) => {
            setHasWishlist("wishlist");
          });
        } else if (selectedOption === "alreadyread") {
          WishlistController.addToAlreadyRead(tempWishlist).then((res) => {
            setHasWishlist("alreadyread");
          });
        }
      });
    }
    if (
      selectedOption === "interested" &&
      hasWishlist !== "interested" &&
      authorised === "true" &&
      userId &&
      selectedManga
    ) {
      UserController.getUserById(userId).then((res) => {
        let user: User = res.data;
        let tempWishlist = {
          user: res.data,
          manga: selectedManga,
        };
        WishlistController.removeAllInterest(tempWishlist).then((res) => {
          setHasWishlist("interested");
        });
      });
    }
  }, [selectedOption]);

  return (
    <div
      className="background_image_home "
      style={
        selectedMangaPicture
          ? { backgroundImage: `url(${selectedMangaPicture?.mpPicture})` }
          : {
              backgroundImage: `url("./../../Assets/Images/Backgrounds/home-page-bg.jpg")`,
            }
      }
    >
      <div className="bg-black bg-opacity-90 min-h-screen">
        {showReview && (
          <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center backdrop-filter backdrop-blur-sm">
            <div className="bg-black border-2 border-gray-500 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full">
              <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-white">
                  Leave a Review
                </h3>
                <div className="mt-4">
                  <label
                    htmlFor="review"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Your Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    rows={7}
                    maxLength={5120}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md"
                    placeholder="How was the manga?"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Rating
                  </label>
                  <StarRating value={rating} onClick={handleStarClick} />
                </div>
              </div>
              <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  className="w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowReview(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex ">
          <LazyLoadImage
            className={`m-2 rounded-lg object-fill w-64 h-96 `}
            src={selectedMangaPicture?.mpPicture}
            alt={selectedManga?.mtitle}
            width={256}
            height={384}
            placeholderSrc={require("./../../Assets/Images/Placeholders/manga-placeholder.png")}
          />

          {selectedManga && (
            <div className="flex justify-between gap-x-10">
              <div className="m-2 ms-4 text-white max-w-7xl">
                <div className="font-bold text-6xl">{selectedManga.mtitle}</div>
                <div className="text-sm max-w-7xl mt-5">
                  {selectedManga.mdescription}
                </div>
                <div className="text-white mt-2">
                  Publish Date: {selectedManga.mpublishDate.toString()}
                </div>
                <div className="font-normal">
                  Status:{" "}
                  {selectedManga.mstatus === "ongoing" ? (
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
                <div className="text-sm font-normal mt-3">
                  Publisher:
                  <Link
                    to={{
                      pathname: "/publisher",
                      search: `?data=${encodeURIComponent(
                        JSON.stringify({
                          publisher: publisherManga?.publisher,
                        })
                      )}`,
                    }}
                    className="hover:text-blue-400 hover:underline text-lg bg-gray-800 hover:bg-gray-900 ms-2 rounded p-1"
                  >
                    {publisherManga?.publisher.pname}
                  </Link>
                </div>
                <div className="mt-2">
                  Average Rating:{" "}
                  <span
                    className="font-bold"
                    style={{ color: getReviewPointColor(averageRating) }}
                  >
                    {averageRating + " "}
                  </span>
                  / 5
                  <span
                    onClick={() => {
                      setCurrentlySelected("reviews");
                    }}
                    className="text-blue-500 hover:cursor-pointer hover:underline"
                  >
                    {" "}
                    [{totalRating} Reviews]
                  </span>
                </div>
                {!isRated &&
                  authorised === "true" &&
                  hasWishlist === "alreadyread" && (
                    <div
                      onClick={() => {
                        setShowReview(true);
                      }}
                      className="mt-1 inline-block cursor-pointer text-blue-500 hover:underline"
                    >
                      Leave A Review
                    </div>
                  )}
              </div>
              {authorised === "true" && (
                <div className="mt-4">
                  <select
                    aria-label="select-type"
                    value={selectedOption ? selectedOption : hasWishlist}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                    }}
                    className="mt-1 block text-white bg-black border-2 border-indigo-600 p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-indigo-600"
                  >
                    <option value="interested">
                      {hasWishlist !== "interested"
                        ? "Remove Selection"
                        : "Interested?"}
                    </option>
                    <option value="ongoing">
                      {hasWishlist === "ongoing"
                        ? "Ongoing"
                        : "Add to Ongoing?"}
                    </option>
                    <option value="wishlist">
                      {hasWishlist === "wishlist"
                        ? "Wish Listed"
                        : "Add to Wishlist?"}
                    </option>
                    <option value="alreadyread">
                      {hasWishlist === "alreadyread"
                        ? "Finished"
                        : "Add to Completed?"}
                    </option>
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="m-4 mb-0">
          <div className="flex justify-center">
            <div
              onClick={() => {
                setCurrentlySelected("volumes");
              }}
              className={` ${
                currentlySelected === "volumes"
                  ? "bg-gray-900 hover:bg-gray-900 hover:pointer-events-none"
                  : "bg-gray-700 hover:bg-gray-800 hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
              } text-2xl p-4 rounded font-extrabold text-center text-white me-4`}
            >
              Volumes
            </div>
            <div
              onClick={() => {
                setCurrentlySelected("reviews");
              }}
              className={` ${
                currentlySelected === "reviews"
                  ? "bg-gray-900 hover:bg-gray-900 hover:pointer-events-none"
                  : "bg-gray-700 hover:bg-gray-800 hover:cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out"
              } text-2xl p-4 rounded font-extrabold text-center text-white me-4`}
            >
              Reviews
            </div>
          </div>
          {currentlySelected === "volumes" && (
            <div>
              {volumes.map((volume) => (
                <Link
                  key={volume.vid}
                  to={{
                    pathname: "/chapter",
                    search: `?data=${encodeURIComponent(
                      JSON.stringify({
                        volume: volume,
                        volumes: volumes,
                      })
                    )}`,
                  }}
                >
                  <VolumeCard {...volume} />
                </Link>
              ))}
            </div>
          )}
          {currentlySelected === "reviews" && (
            <>
              <div className="ms-32 me-32">
                {rates.map((rate) => (
                  <div
                    className="flex flex-col bg-black bg-opacity-25 text-white border-2 border-gray-500 rounded-lg p-4 mt-2"
                    key={rate.rid}
                  >
                    <div className="flex justify-between">
                      <div className="font-bold">
                        {rate.user.name} {"   ("}
                        <span
                          className="font-bold"
                          style={{ color: getReviewPointColor(rate.rvalue) }}
                        >
                          {rate.rvalue + ""}
                        </span>
                        <span className="text-sm">/ 5)</span>
                      </div>
                      <div className="">{formatTime(rate.rdate)}</div>
                    </div>
                    <div className="mt-3">{rate.rcomment}</div>
                  </div>
                ))}
              </div>
              <Pagination
                totalItems={totalRating}
                itemsPerPage={10}
                onPageChange={onPageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MangaViewer;
