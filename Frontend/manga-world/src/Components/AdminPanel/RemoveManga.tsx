import React, { useState, useEffect } from "react";
import MangaController from "../../Controller/MangaController";
import Manga from "../../Model/Manga";

function RemoveManga() {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [filteredMangaList, setFilteredMangaList] = useState<Manga[]>([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setFilteredMangaList(mangaList);
  }, [mangaList]);

  useEffect(() => {
    const isValid = !!selectedManga;

    setIsSubmitDisabled(!isValid);
  }, [selectedManga]);

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

  const handleSubmit = () => {
    if (selectedManga) {
      MangaController.deleteManga(selectedManga.mid).then((response) => {
        setSuccessMessage(`Successfully deleted ${selectedManga.mtitle}`);
        setMangaList([]);
        clearForm();
      });
    }
  };

  const clearForm = () => {
    setSelectedManga(null);
    setIsSubmitDisabled(true);
  };

  return (
    <div className="w-1/3 mt-8 p-6 bg-black bg-opacity-50 rounded">
      <h2 className="text-xl font-semibold mb-4 text-white">Remove A Manga</h2>

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

      <button
        className={`w-full p-2 mt-2 bg-red-700 hover:bg-red-800 text-white rounded ${
          isSubmitDisabled && "opacity-50 cursor-not-allowed hover:bg-red-700"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitDisabled}
      >
        Delete
      </button>

      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </div>
  );
}

export default RemoveManga;
