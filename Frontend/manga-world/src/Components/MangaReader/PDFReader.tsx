import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "tailwindcss/tailwind.css";
import Pagination from "../Utility/Pagination";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFReaderProps {
  pdfData: string;
}

const PDFReader: React.FC<PDFReaderProps> = ({ pdfData }) => {
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
      <Pagination
        totalItems={numPages || 0}
        itemsPerPage={1}
        onPageChange={handlePageChange}
      />
      <div className="ps-4">
        <Document file={`${pdfData}`} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            width={window.innerWidth - 600}
          />
        </Document>
      </div>
      {/*<Pagination totalItems={numPages || 0} itemsPerPage={1} onPageChange={handlePageChange} />*/}
    </div>
  );
};

export default PDFReader;
