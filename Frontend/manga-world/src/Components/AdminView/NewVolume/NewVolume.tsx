import React, { useState, useEffect, useRef } from "react";
import MangaController from "../../../Controller/MangaController";
import Manga from "../../../Model/Manga";
import VolumeController from "../../../Controller/VolumeController";
import Volume from "../../../Model/Volume";

function NewVolume() {
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [filteredMangaList, setFilteredMangaList] = useState<Manga[]>([]);
  const [minVolumeNumber, setMinVolumeNumber] = useState(1);
  const [volumeNumber, setVolumeNumber] = useState<number>(minVolumeNumber);
  const [volumeTitle, setVolumeTitle] = useState("");
  const [volumeReleaseDate, setVolumeReleaseDate] = useState<string>("");
  const [picture, setPicture] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredMangaList(mangaList);
  }, [mangaList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMangaList([]);
    setSelectedManga(null);
    const searchTerm = e.target.value.toLowerCase();
    setSearchInputValue(e.target.value);
    if (searchTerm.length > 0) {
      MangaController.searchByKeyword(searchTerm).then((response) => {
        setMangaList(response.data);
        let tempMangaList: Manga[] = response.data;
        const filteredManga = tempMangaList.filter((manga) =>
          manga.mtitle.toLowerCase().includes(searchTerm)
        );
        setFilteredMangaList(filteredManga);

        setIsSearchFocused(!!searchTerm);
      });
    }
  };

  useEffect(() => {
    if (selectedManga) {
      VolumeController.findAllByManga(selectedManga).then((response) => {
        setVolumeNumber(response.data.length + 1);
        setMinVolumeNumber(response.data.length + 1);
      });
    }
  }, [selectedManga]);

  const handleMangaSelect = (manga: string) => {
    setSelectedManga(mangaList.find((m) => m.mtitle === manga) || null);
    setIsSearchFocused(false);
    setSearchInputValue(manga);
  };

  const handleVolumeNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setVolumeNumber(value >= minVolumeNumber ? value : minVolumeNumber);
  };

  const handleVolumeTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeTitle(e.target.value);
  };

  const handleVolumeReleaseDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVolumeReleaseDate(e.target.value);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPicture(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const isValid = !!selectedManga && !!volumeTitle && !!volumeReleaseDate;
    setIsSubmitDisabled(!isValid);
  }, [selectedManga, volumeTitle, volumeReleaseDate]);

  const handleSubmit = () => {
    let tempVolume = {
      vnumber: volumeNumber,
      vtitle: volumeTitle,
      vreleaseDate: volumeReleaseDate,
      manga: selectedManga,
    };
    VolumeController.addNewVolume(tempVolume).then((response) => {
      let volume: Volume = response.data;
      if (picture) {
        let tempVolumeCover = {
          vcPicture: picture,
          volume: volume,
        };
        VolumeController.addVolumeCover(tempVolumeCover).then((response) => {
          setSuccessMessage("Volume added successfully!");
          setTimeout(() => setSuccessMessage(""), 5000);
          clearForm();
        });
      } else {
        setSuccessMessage("Volume added successfully!");
        setTimeout(() => setSuccessMessage(""), 5000);
        clearForm();
      }
    });

    setSuccessMessage("Volume added successfully!");
    setTimeout(() => setSuccessMessage(""), 5000);
    clearForm();
  };

  const clearForm = () => {
    setSelectedManga(null);
    setMangaList([]);
    setFilteredMangaList([]);
    setMinVolumeNumber(1);
    setVolumeNumber(1);
    setVolumeTitle("");
    setVolumeReleaseDate("");
    setPicture(null);
    setIsSubmitDisabled(true);
    setSearchInputValue("");
    setIsSearchFocused(false);
    if (fileInputRef.current) {
      (fileInputRef.current as any).value = "";
    }
  };

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Volume</h2>
      <div className="mb-4">
        <label
          htmlFor="searchManga"
          className="block text-white text-sm font-medium"
        >
          Search Manga
        </label>
        <input
          type="text"
          id="searchManga"
          placeholder="Search Manga"
          onChange={handleSearchChange}
          onFocus={() => setIsSearchFocused(true)}
          value={
            isSearchFocused ? searchInputValue : selectedManga?.mtitle || ""
          }
          className="w-full p-2 border rounded mb-2"
        />
        <div className="w-full bg-gray-500  rounded">
          {isSearchFocused && filteredMangaList.length > 0 && (
            <div className="search-results p-1">
              {filteredMangaList.map((manga, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-black bg-opacity-90 mt-1 text-white hover:bg-gray-700 p-2 border rounded"
                  onMouseDown={() => handleMangaSelect(manga.mtitle)}
                >
                  {manga.mtitle}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="volumeNumber"
          className="block text-white text-sm font-medium"
        >
          Volume Number
        </label>
        <input
          type="number"
          id="volumeNumber"
          className="w-full p-2 border rounded"
          value={volumeNumber}
          onChange={handleVolumeNumberChange}
          min={minVolumeNumber}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="volumeTitle"
          className="block text-white text-sm font-medium"
        >
          Volume Title
        </label>
        <input
          type="text"
          id="volumeTitle"
          className="w-full p-2 border rounded"
          value={volumeTitle}
          onChange={handleVolumeTitleChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="volumeReleaseDate"
          className="block text-white text-sm font-medium"
        >
          Volume Release Date
        </label>
        <input
          type="date"
          id="volumeReleaseDate"
          className="w-full p-2 border rounded"
          value={volumeReleaseDate}
          onChange={handleVolumeReleaseDateChange}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="picture"
          className="block text-white text-sm font-medium"
        >
          Picture
        </label>
        <input
          type="file"
          id="picture"
          accept="image/*"
          onChange={handlePictureChange}
          className="block mt-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          ref={fileInputRef}
        />
      </div>
      {picture && (
        <div className="mb-4">
          <img
            src={picture}
            alt="Selected"
            className="w-full border-2 border-white rounded-xl"
          />
        </div>
      )}
      <button
        className={`w-full p-2 bg-blue-500 text-white rounded ${
          isSubmitDisabled && "opacity-50 cursor-not-allowed"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </div>
  );
}

export default NewVolume;
