import React, { useState, useEffect, useRef } from "react";
import MangaController from "../../../Controller/MangaController";
import Manga from "../../../Model/Manga";
import VolumeController from "../../../Controller/VolumeController";
import Volume from "../../../Model/Volume";
import ChapterController from "../../../Controller/ChapterController";
import { pdfjs } from "react-pdf";
import PDFReader from "../../MangaReader/PDFReader";
import SmallPdfViewer from "./SmallPdfViewer";

function NewChapter() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [volumeList, setVolumeList] = useState<Volume[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<Volume | null>(null);
  const [minChapterNumber, setMinChapterNumber] = useState(1);
  const [chapterNumber, setChapterNumber] = useState<number>(minChapterNumber);
  const [chapterReleaseDate, setChapterReleaseDate] = useState<string>("");
  const [chapterPageCount, setChapterPageCount] = useState<number>(1);
  const [picture, setPicture] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [filteredMangaList, setFilteredMangaList] = useState<Manga[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFilteredMangaList(mangaList);
  }, [mangaList]);

  useEffect(() => {
    if (selectedManga) {
      VolumeController.findAllByManga(selectedManga).then((response) => {
        setVolumeList(response.data);
        setSelectedVolume(response.data[response.data.length - 1]);
      });
    }
  }, [selectedManga]);

  useEffect(() => {
    if (selectedVolume) {
      ChapterController.findAllByVolume(selectedVolume).then((response) => {
        setChapterNumber(response.data.length + 1);
        setMinChapterNumber(response.data.length + 1);
      });
    }
  }, [selectedVolume]);

  useEffect(() => {
    const isValid =
      !!selectedManga &&
      !!selectedVolume &&
      chapterNumber >= 0 &&
      !!chapterReleaseDate &&
      chapterPageCount >= 0 &&
      !!pdfFile;

    setIsSubmitDisabled(!isValid);
  }, [
    selectedManga,
    selectedVolume,
    chapterNumber,
    chapterReleaseDate,
    chapterPageCount,
    pdfFile,
  ]);

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

  const handleMangaSelect = (manga: string) => {
    setSelectedManga(mangaList.find((m) => m.mtitle === manga) || null);
    setIsSearchFocused(false);
    setSearchInputValue(manga);
  };

  const handleVolumeSelect = (volume: Volume) => {
    setSelectedVolume(volume);
  };

  const handleChapterNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    setChapterNumber(value >= 0 ? value : 0);
  };

  const handleChapterReleaseDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChapterReleaseDate(e.target.value);
  };

  const handleChapterPageCountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    setChapterPageCount(value > 0 ? value : 1);
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

  const handlePdfFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPdfFile(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPdfFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    let tempChapter = {
      cnumber: chapterNumber,
      creleaseDate: chapterReleaseDate,
      cpageCount: chapterPageCount,
      volume: selectedVolume,
    };
    ChapterController.addNewChapter(tempChapter).then((res) => {
      let chapter = res.data;
      let tempChapterPdf = {
        mfFile: pdfFile,
        chapter: chapter,
      };
      ChapterController.addChapterPdf(tempChapterPdf).then((res) => {
        if (picture) {
          let tempPicture = {
            ccPicture: picture,
            chapter: chapter,
          };
          ChapterController.addChapterCover(tempPicture).then((res) => {
            setSuccessMessage("Chapter added successfully!");
            setTimeout(() => setSuccessMessage(""), 5000);
            clearForm();
          });
        } else {
          setSuccessMessage("Chapter added successfully!");
          setTimeout(() => setSuccessMessage(""), 5000);
          clearForm();
        }
      });
    });
  };

  const clearForm = () => {
    setSelectedManga(null);
    setVolumeList([]);
    setSelectedVolume(null);
    setChapterNumber(1);
    setChapterReleaseDate("");
    setChapterPageCount(1);
    setPicture(null);
    setPdfFile(null);
    setIsSubmitDisabled(true);

    if (fileInputRef.current) {
      (fileInputRef.current as any).value = "";
    }
    if (pdfInputRef.current) {
      (pdfInputRef.current as any).value = "";
    }
  };

  useEffect(() => {
    const loadPdf = async () => {
      try {
        if (pdfFile) {
          const base64Data = pdfFile.split(",")[1];
          const pdfData = atob(base64Data);
          const pdfArray = new Uint8Array(pdfData.length);
          for (let i = 0; i < pdfData.length; i++) {
            pdfArray[i] = pdfData.charCodeAt(i);
          }
          pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
          const pdf = await pdfjs.getDocument({ data: pdfArray }).promise;
          const numPages = pdf.numPages;
          setChapterPageCount(numPages);
        }
      } catch (error) {
        console.error("Error loading PDF:", error);
      }
    };

    if (pdfFile) {
      loadPdf();
    }
  }, [pdfFile]);

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">Add New Chapter</h2>

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
          onChange={(e) => handleSearchChange(e)}
          onFocus={() => setIsSearchFocused(true)}
          value={
            isSearchFocused ? searchInputValue : selectedManga?.mtitle || ""
          }
          className="w-full p-2 border rounded mb-2"
        />
        <div className="w-full bg-gray-500 rounded">
          {isSearchFocused && filteredMangaList.length > 0 && (
            <div className="search-results p-1">
              {filteredMangaList.map((manga, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-black bg-opacity-70 mt-1 text-white hover:bg-black p-2 rounded"
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
          htmlFor="selectVolume"
          className="block text-white text-sm font-medium"
        >
          Select Volume
        </label>
        <select
          id="selectVolume"
          className="w-full p-2 border rounded"
          onChange={(e) =>
            handleVolumeSelect(volumeList[parseInt(e.target.value)])
          }
          disabled={!selectedManga}
          value={selectedVolume ? volumeList.indexOf(selectedVolume) : ""}
        >
          <option value="" disabled>
            Select Volume
          </option>
          {volumeList.map((volume, index) => (
            <option key={index} value={index}>
              Volume: {volume.vnumber} ({volume.vtitle})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="chapterNumber"
          className="block text-white text-sm font-medium"
        >
          Chapter Number
        </label>
        <input
          type="number"
          id="chapterNumber"
          className="w-full p-2 border rounded"
          value={chapterNumber}
          onChange={handleChapterNumberChange}
          min={0}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="chapterReleaseDate"
          className="block text-white text-sm font-medium"
        >
          Chapter Release Date
        </label>
        <input
          type="date"
          id="chapterReleaseDate"
          className="w-full p-2 border rounded"
          value={chapterReleaseDate}
          onChange={handleChapterReleaseDateChange}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="chapterPageCount"
          className="block text-white text-sm font-medium"
        >
          Chapter Page Count
        </label>
        <input
          type="number"
          id="chapterPageCount"
          className="w-full p-2 border rounded text-white"
          value={chapterPageCount}
          onChange={handleChapterPageCountChange}
          min={0}
          disabled={true}
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

      <div className="mb-4">
        <label
          htmlFor="pdfFile"
          className="block text-white text-sm font-medium"
        >
          PDF File
        </label>
        <input
          type="file"
          id="pdfFile"
          accept=".pdf"
          onChange={handlePdfFileChange}
          className="block mt-1 w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          ref={pdfInputRef}
        />
      </div>
      <div className="w-full">
        {pdfFile && <SmallPdfViewer pdfData={pdfFile} />}
      </div>

      <button
        className={`w-full p-2 mt-2 bg-blue-500 text-white rounded ${
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

export default NewChapter;
