import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../Auth/Auth";
import SearchController from "../../Controller/SearchController";
import SearchComponent from "../../Model/Combined/SearchComponent";
import "./../Homepage/Homepage.css";
import Card from "../Card/Card";
import CardModified from "./CardModified";
import Pagination from "../Utility/Pagination";
import Manga from "../../Model/Manga";
import AuthorCard from "./AuthorCard";
import Author from "../../Model/Author";
import Publisher from "../../Model/Publisher";
import PublisherCard from "./PublisherCard";

function SearchView() {
  const [selectedMangas, setSelectedMangas] = useState<Manga[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [selectedPublisher, setSelectedPublisher] = useState<Publisher[]>([]);
  const [searchingFinished, setSearchingFinished] = useState<boolean>(false);
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
    const searchedText: String = data.searchText;
    if (userId) {
      SearchController.search(userId, searchedText).then((res) => {
        const tempMangas: Manga[] = res.data.mangas;
        setSelectedMangas(tempMangas.slice(0, 12) || []);
        const tempAuthors = res.data.authors;
        setSelectedAuthors(tempAuthors.slice(0, 24) || []);
        const tempPublishers = res.data.publishers;
        setSelectedPublisher(tempPublishers.slice(0, 24) || []);
        setSearchingFinished(true);
      });
    } else {
      SearchController.search("0", searchedText).then((res) => {
        const tempMangas: Manga[] = res.data.mangas;
        setSelectedMangas(tempMangas.slice(0, 12) || []);
        const tempAuthors = res.data.authors;
        setSelectedAuthors(tempAuthors.slice(0, 24) || []);
        const tempPublishers = res.data.publishers;
        setSelectedPublisher(tempPublishers.slice(0, 24) || []);
        setSearchingFinished(true);
      });
    }
  }, [jsonString]);

  const onPageChange = (pageNumber: number) => {
    let tempPageNumber = pageNumber - 1;
    let start = tempPageNumber * 12;
    let end = start + 12;
    setSelectedMangas(selectedMangas.slice(start, end) || []);
  };

  const onPageChangeAuthor = (pageNumber: number) => {
    let tempPageNumber = pageNumber - 1;
    let start = tempPageNumber * 24;
    let end = start + 24;
    setSelectedAuthors(selectedAuthors.slice(start, end) || []);
  };

  const onPageChangePublisher = (pageNumber: number) => {
    let tempPageNumber = pageNumber - 1;
    let start = tempPageNumber * 24;
    let end = start + 24;
    setSelectedPublisher(selectedPublisher.slice(start, end) || []);
  };

  return (
    <div className="background_image_home">
      <div className="bg-black bg-opacity-75 min-h-screen">
        {selectedMangas.length > 0 && (
          <div>
            <div className="bg-black bg-opacity-25 text-white text-center text-7xl mb-3 font-bold pb-4">
              Manga
            </div>
            <div className="flex flex-wrap justify-evenly">
              {selectedMangas.map((manga) => (
                <CardModified {...manga} key={manga.mid} />
              ))}
            </div>
            <div>
              <Pagination
                totalItems={selectedMangas.length}
                itemsPerPage={12}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        )}
        {selectedAuthors.length > 0 && (
          <div>
            <div className="bg-black bg-opacity-25 text-white mb-3 text-center text-7xl font-bold pb-4">
              Authors
            </div>
            <div className="flex flex-wrap justify-evenly">
              {selectedAuthors.map((author) => (
                <AuthorCard {...author} key={author.aid} />
              ))}
            </div>
            <div>
              <Pagination
                totalItems={selectedAuthors.length}
                itemsPerPage={24}
                onPageChange={onPageChangeAuthor}
              />
            </div>
          </div>
        )}
        {selectedPublisher.length > 0 && (
          <div>
            <div className="bg-black bg-opacity-25 text-white mb-3 text-center text-7xl font-bold pb-4">
              Publishers
            </div>
            <div className="flex flex-wrap justify-evenly">
              {selectedPublisher.map((publisher) => (
                <PublisherCard {...publisher} key={publisher.pid} />
              ))}
            </div>
            <div>
              <Pagination
                totalItems={selectedPublisher.length}
                itemsPerPage={24}
                onPageChange={onPageChangePublisher}
              />
            </div>
          </div>
        )}
        {searchingFinished &&
          selectedMangas.length === 0 &&
          selectedAuthors.length === 0 &&
          selectedPublisher.length === 0 && (
            <div className="bg-black bg-opacity-25 text-white text-center text-7xl mb-3 font-bold pb-4">
              No results found
            </div>
          )}
      </div>
    </div>
  );
}

export default SearchView;
