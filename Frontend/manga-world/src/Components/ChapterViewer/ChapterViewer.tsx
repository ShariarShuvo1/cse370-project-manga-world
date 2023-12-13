import { useContext, useEffect, useState } from "react";
import Volume from "../../Model/Volume";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../../Auth/Auth";
import Manga from "../../Model/Manga";
import VolumeController from "../../Controller/VolumeController";
import Chapter from "../../Model/Chapter";
import ChapterController from "../../Controller/ChapterController";
import ChapterCard from "./ChapterCard/ChapterCard";
import VolumeCover from "../../Model/VolumeCover";

function ChapterViewer() {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<Volume>();
  const [volumeImage, setVolumeImage] = useState<VolumeCover>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [manga, setManga] = useState<Manga>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jsonString = searchParams.get("data") || "";

  const { authorised, userId, userType } = useContext(Auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (jsonString === "") {
      navigate("/home");
      return;
    }
    const data = JSON.parse(decodeURIComponent(jsonString));
    const selectedVolumeTemp: Volume = data.volume;
    setManga(selectedVolumeTemp.manga);
    const volumesTemp: Volume[] = data.volumes;
    setSelectedVolume(selectedVolumeTemp);
    setVolumes(volumesTemp);
  }, []);

  useEffect(() => {
    if (selectedVolume) {
      VolumeController.viewIncrement(selectedVolume).then((res) => {});
      VolumeController.findVolumePicture(selectedVolume).then((res) => {
        setVolumeImage(res.data);
      });
      ChapterController.findAllByVolume(selectedVolume).then((res) => {
        setChapters(res.data);
      });
    }
  }, [selectedVolume]);

  return (
    <div
      className="background_image_home "
      style={
        volumeImage
          ? { backgroundImage: `url(${volumeImage.vcPicture})` }
          : {
              backgroundImage: `url("./../../Assets/Images/Backgrounds/home-page-bg.jpg")`,
            }
      }
    >
      {manga && (
        <div className="flex bg-gray-900 bg-opacity-95 text-white font-extrabold text-xl p-1">
          <Link
            to={{
              pathname: "/manga",
              search: `?data=${encodeURIComponent(
                JSON.stringify({
                  manga: manga,
                })
              )}`,
            }}
            className="ms-4 hover:bg-gray-900 p-3 hover:rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            {manga.mtitle}
          </Link>
        </div>
      )}
      <div className="bg-black bg-opacity-75 flex">
        <div className="bg-black bg-opacity-30 text-white">
          {volumes.map((volume) => (
            <div
              onClick={() => {
                setSelectedVolume(volume);
              }}
              key={volume.vid}
              className={` ${
                selectedVolume &&
                volume.vid === selectedVolume.vid &&
                "bg-gray-950 bg-opacity-75 font-bold"
              } hover:cursor-pointer hover:bg-black hover:bg-opacity-75 p-4 px-20  hover:border-gray-400 hover:scale-105 transition-transform duration-100 ease-in-out`}
            >
              Volume {volume.vnumber}
            </div>
          ))}
        </div>
        <div className="flex-grow">
          {chapters.map((chapter) => (
            <Link
              key={chapter.cid}
              to={{
                pathname: "/reader",
                search: `?data=${encodeURIComponent(
                  JSON.stringify({
                    chapter: chapter,
                    chapters: chapters,
                    volumes: volumes,
                  })
                )}`,
              }}
            >
              <ChapterCard key={chapter.cid} {...chapter} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChapterViewer;
