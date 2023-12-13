import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Manga from "../../Model/Manga";
import { AxiosResponse } from "axios";
import Card from "../Card/Card";

const Subpage: React.FC<{
  fetchMangaData: (
    pageNumber: number,
    category: any
  ) => Promise<AxiosResponse<any>>;
  fetchMangaPageNumber: (category: any) => Promise<AxiosResponse<any>>;
  element: any;
}> = ({ fetchMangaData, fetchMangaPageNumber, element }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mangaData, setMangaData] = useState<Manga[]>([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    fetchMangaData(currentPage - 1, element).then((res) => {
      setMangaData(res.data);
    });
  }, [currentPage, element]);

  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchMangaPageNumber(element).then((res) => {
      setTotalPage(res.data);
    });
  }, [element]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {mangaData.map((manga) => (
          <Card {...manga} key={manga.mid} />
        ))}
      </div>
      <div>
        <Pagination
          totalItems={totalPage}
          itemsPerPage={15}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Subpage;
