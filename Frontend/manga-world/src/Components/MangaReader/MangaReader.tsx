import { useContext, useEffect, useState } from "react";
import Volume from "../../Model/Volume";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../../Auth/Auth";
import Manga from "../../Model/Manga";
import Chapter from "../../Model/Chapter";
import ChapterController from "../../Controller/ChapterController";
import ChapterCover from "../../Model/ChapterCover";
import MangaFileController from "../../Controller/MangaFileController";
import MangaFile from "../../Model/MangaFile";
import PDFReader from "./PDFReader";

function MangaReader() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>();
  const [chapterImage, setChapterImage] = useState<ChapterCover>();
  const [volume, setVolume] = useState<Volume>();
  const [manga, setManga] = useState<Manga>();
  const [pdf, setPdf] = useState("");
  const [volumes, setVolumes] = useState<Volume[]>([]);

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
    const selectedChapterTemp: Chapter = data.chapter;
    const tempVolumes: Volume[] = data.volumes;
    setVolumes(tempVolumes);
    setManga(selectedChapterTemp.volume.manga);
    setVolume(selectedChapterTemp.volume);
    const chapterTemp: Chapter[] = data.chapters;
    setSelectedChapter(selectedChapterTemp);
    setChapters(chapterTemp);
  }, []);

  useEffect(() => {
    if (selectedChapter) {
      ChapterController.viewIncrement(selectedChapter).then((res) => {});
      ChapterController.findChapterPicture(selectedChapter).then((res) => {
        setChapterImage(res.data);
      });
    }
  }, [selectedChapter]);

  useEffect(() => {
    if (selectedChapter) {
      MangaFileController.findMangaFileByChapter(selectedChapter).then(
        (res) => {
          let tempPdfObj: MangaFile = res.data;
          setPdf(tempPdfObj.mfFile);
        }
      );
    }
  }, [selectedChapter]);

  return (
    <div
      className="background_image_home "
      style={
        chapterImage
          ? { backgroundImage: `url(${chapterImage.ccPicture})` }
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
            {"Manga: " + manga.mtitle}
          </Link>
          <Link
            to={{
              pathname: "/chapter",
              search: `?data=${encodeURIComponent(
                JSON.stringify({
                  volume: volume,
                  volumes: volumes,
                })
              )}`,
            }}
            className="ms-10 hover:bg-gray-900 p-3 hover:rounded-lg hover:scale-110 transition-transform duration-300 ease-in-out"
          >
            {"Volume: " + volume?.vnumber + ` (${volume?.vtitle})`}
          </Link>
        </div>
      )}
      <div className="bg-black bg-opacity-75 flex">
        <div className="bg-black bg-opacity-30 text-white">
          {chapters.map((chapter) => (
            <div
              onClick={() => {
                setSelectedChapter(chapter);
              }}
              key={chapter.cid}
              className={` ${
                selectedChapter &&
                chapter.cid === selectedChapter.cid &&
                "bg-gray-950 bg-opacity-75 font-bold"
              } hover:cursor-pointer hover:bg-black hover:bg-opacity-75 p-4 px-20  hover:border-gray-400 hover:scale-105 transition-transform duration-100 ease-in-out`}
            >
              Chapter {chapter.cnumber}
            </div>
          ))}
        </div>
        <div className="flex-grow">
          {pdf ? (
            <PDFReader pdfData={pdf} />
          ) : (
            <p className="text-white">Loading PDF...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MangaReader;
