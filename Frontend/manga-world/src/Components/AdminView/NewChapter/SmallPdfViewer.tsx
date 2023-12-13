import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "tailwindcss/tailwind.css";
import Pagination from "../../Utility/Pagination";
import SmallPagination from "../../Utility/SmallPagination";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFReaderProps {
  pdfData: string;
}

const SmallPdfViewer: React.FC<PDFReaderProps> = ({ pdfData }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <SmallPagination
        totalItems={numPages || 0}
        itemsPerPage={1}
        onPageChange={handlePageChange}
      />
      <div className="ps-4">
        <Document
          file={`${pdfData}`}
          onLoadSuccess={onDocumentLoadSuccess}
          className="border-blue-500 border-2"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
};

export default SmallPdfViewer;
