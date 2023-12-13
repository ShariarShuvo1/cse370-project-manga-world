import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Chapter from "../../../Model/Chapter";
import ChapterCover from "../../../Model/ChapterCover";
import ChapterController from "../../../Controller/ChapterController";

function ChapterCard(props: Chapter) {
  const [chapter, setChapter] = useState<Chapter>(props);
  const [chapterImage, setChapterImage] = useState<ChapterCover>();

  useEffect(() => {
    ChapterController.findChapterPicture(chapter).then((res) => {
      setChapterImage(res.data);
    });
  }, []);

  return (
    <div>
      <div className="flex text-white bg-black bg-opacity-25 mt-2 ms-32 me-44 border-2 border-gray-600 hover:bg-black hover:bg-opacity-75 hover:rounded-lg hover:border-gray-400 rounded p-2 hover:scale-105 transition-transform duration-300 ease-in-out">
        <LazyLoadImage
          className={` rounded-lg object-fill w-32 h-44 `}
          src={chapterImage?.ccPicture}
          alt={chapter.volume.vtitle}
          width={128}
          height={176}
          placeholderSrc={require("./../../../Assets/Images/Placeholders/manga-placeholder.png")}
        />
        <div className="ms-4">
          <p className="text-3xl">Chapter {chapter.cnumber}</p>
          <p className="text-xl mt-3">Total page: {chapter.cpageCount}</p>
          <p className="">Released on {chapter.creleaseDate.toString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ChapterCard;
