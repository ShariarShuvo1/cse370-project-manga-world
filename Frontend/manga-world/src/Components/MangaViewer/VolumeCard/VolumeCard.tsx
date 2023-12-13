import Volume from "../../../Model/Volume";
import { useEffect, useState } from "react";
import volumeCover from "../../../Model/VolumeCover";
import VolumeController from "../../../Controller/VolumeController";
import { LazyLoadImage } from "react-lazy-load-image-component";

function VolumeCard(props: Volume) {
  const [volume, setVolume] = useState<Volume>(props);
  const [volumeImage, setVolumeImage] = useState<volumeCover>();

  useEffect(() => {
    VolumeController.findVolumePicture(volume).then((res) => {
      setVolumeImage(res.data);
    });
  }, []);

  return (
    <div>
      <div className="flex text-white bg-black bg-opacity-25 mt-2 ms-32 me-32 border-2 border-gray-600 hover:bg-black hover:bg-opacity-75 hover:rounded-lg hover:border-gray-400 rounded-lg p-2 hover:scale-105 transition-transform duration-300 ease-in-out">
        <LazyLoadImage
          className={` rounded-lg object-fill w-32 h-44 `}
          src={volumeImage?.vcPicture}
          alt={volume.vtitle}
          width={128}
          height={176}
          placeholderSrc={require("./../../../Assets/Images/Placeholders/manga-placeholder.png")}
        />
        <div className="ms-4">
          <p className="text-3xl">Volume {volume.vnumber}</p>
          <p className="text-xl mt-3">{volume.vtitle}</p>
          <p className="">Released on {volume.vreleaseDate.toString()}</p>
        </div>
      </div>
    </div>
  );
}

export default VolumeCard;
