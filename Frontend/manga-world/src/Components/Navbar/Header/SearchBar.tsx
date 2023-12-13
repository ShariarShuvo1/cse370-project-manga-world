import { useEffect, useState, ChangeEvent } from "react";
import MangaController from "../../../Controller/MangaController";
import { Link, useNavigate } from "react-router-dom";

function SearchBar() {
  const [inputPlaceholder, setInputPlaceholder] = useState<string>(
    "Search for anime..."
  );
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMangaNames = async () => {
      try {
        const res = await MangaController.getAllMangaNames();
        const placeholders = res.data;

        let currentIndex = 0;
        let currentPlaceholder = "";

        const animatePlaceholders = () => {
          const targetPlaceholder = placeholders[currentIndex];
          let targetIndex = 0;

          const typingInterval = setInterval(() => {
            currentPlaceholder += targetPlaceholder[targetIndex];
            setInputPlaceholder(currentPlaceholder);
            targetIndex++;

            if (targetIndex === targetPlaceholder.length) {
              clearInterval(typingInterval);
              setTimeout(() => {
                const deletingInterval = setInterval(() => {
                  currentPlaceholder = currentPlaceholder.slice(0, -1);
                  setInputPlaceholder(currentPlaceholder);

                  if (currentPlaceholder === "") {
                    clearInterval(deletingInterval);
                    currentIndex = (currentIndex + 1) % placeholders.length;
                    setTimeout(animatePlaceholders, 1000);
                  }
                }, 100);
              }, 1000);
            }
          }, 100);
        };
        animatePlaceholders();
      } catch (error) {
        console.error("Error fetching manga names:", error);
      }
    };

    fetchMangaNames();
  }, []);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="ms-20 flex-grow">
        <input
          type="text"
          placeholder={inputPlaceholder}
          className="w-full text-black border-white border-2 rounded-lg p-1 hover:bg-white hover:text-black hover:border-teal-500 active:bg-gray-500 font-bold"
          value={searchText}
          onChange={handleSearchInputChange}
        />
      </div>
      {searchText ? (
        <Link
          to={{
            pathname: "/search",
            search: `?data=${encodeURIComponent(
              JSON.stringify({
                searchText: searchText,
              })
            )}`,
          }}
          className="bg-white text-black font-bold py-1.5 px-2 rounded-lg focus:outline-none focus:shadow-outline me-20 ms-1 hover:bg-gray-300 hover:text-black hover:border-teal-500 active:bg-gray-500"
        >
          Search
        </Link>
      ) : (
        <div className="bg-white text-black hover:cursor-pointer font-bold py-1.5 px-2 rounded-lg focus:outline-none focus:shadow-outline me-20 ms-1 hover:bg-gray-300 hover:text-black hover:border-teal-500 active:bg-gray-500">
          Search
        </div>
      )}
    </>
  );
}

export default SearchBar;
