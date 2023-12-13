import React, { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const SmallPagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      onPageChange(newPage);
    }
  };

  const handleGoToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const pagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    if (totalPages <= pagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(pagesToShow / 2)) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + Math.floor(pagesToShow / 2) >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`pagination-item ${
            i === currentPage
              ? "bg-black text-white"
              : "bg-black bg-opacity-75 text-gray-700"
          } hover:bg-opacity-90 hover:text-white cursor-pointer py-2 px-2 text-center hover:border-white border-2 border-gray-600 rounded`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center mt-8 pb-4">
      <button
        className={`pagination-control ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        } me-2 bg-black hover:bg-opacity-75 hover:border-white border-2 border-gray-600 text-white px-2 py-2 rounded`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className={`pagination-control ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        } me-2 bg-black hover:bg-opacity-75 hover:border-white border-2 border-gray-600 text-white px-2 py-2 rounded`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ul className="flex space-x-2">{renderPageNumbers()}</ul>
      <button
        className={`pagination-control ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        } ms-2 bg-black hover:bg-opacity-75 hover:border-white border-2 border-gray-600 text-white px-2 py-2 rounded`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className={`pagination-control ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        } ms-2 bg-black hover:bg-opacity-75 hover:border-white border-2 border-gray-600 text-white px-2 py-2 rounded`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {totalPages}
      </button>
      <div className="flex items-center space-x-2">
        <input
          aria-label="gotopage"
          type="text"
          className="pagination-input w-16 bg-black bg-opacity-75 text-white px-2 py-2 ms-10 text-center rounded hover:bg-opacity-75 hover:border-white border-2 border-gray-600"
          value={currentPage}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value)) {
              setCurrentPage(value);
            }
          }}
          onBlur={() => handleGoToPage(currentPage)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGoToPage(currentPage);
            }
          }}
          pattern="[0-9]*"
          inputMode="numeric"
          min="1"
          max={totalPages}
        />
        <button
          className="pagination-control bg-black hover:bg-opacity-75 text-white px-2 py-2 rounded hover:border-white border-2 border-gray-600"
          onClick={() => handleGoToPage(currentPage)}
          disabled={currentPage < 1 || currentPage > totalPages}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default SmallPagination;
