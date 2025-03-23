"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  let pageNumbers: (number | string)[] = [];

  if (totalPages <= 4) {
    // If there are 4 or fewer pages, show all
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage <= 3) {
      // Show first 4 pages if near the beginning
      pageNumbers = [1, 2, 3, 4, '...'];
    } else if (currentPage >= totalPages - 2) {
      // Show last 4 pages if near the end
      pageNumbers = ['...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      // Show surrounding pages with ellipsis for large page numbers
      pageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8 mb-4">
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="lg:px-6 px-2 lg:py-2 py-1 lg:text-[16px] text-[12px] bg-secondary text-secondary-foreground rounded-full shadow-md transition duration-300 ease-in-out hover:bg-accent hover:text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
        >
          &lt; Prev
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && handlePageClick(page as number)}
            className={`lg:px-6 px-2 lg:py-2 py-1 lg:text-[16px] text-[12px] rounded-full shadow-md transition duration-300 ease-in-out ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : page === '...'
                ? "bg-secondary text-secondary-foreground cursor-default"
                : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
            disabled={page === '...'}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="lg:px-6 px-2 lg:py-2 py-1 text-[12px] lg:text-[16px] bg-secondary text-secondary-foreground rounded-full shadow-md transition duration-300 ease-in-out hover:bg-accent hover:text-primary-foreground disabled:bg-muted disabled:text-muted-foreground"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
