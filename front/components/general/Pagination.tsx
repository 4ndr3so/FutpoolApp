// components/general/Pagination.tsx
"use client";

import classNames from "classnames";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }

    if (currentPage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
      {/* First */}
      <button
        className="px-3 py-1 rounded border text-sm font-medium bg-white text-blue-500 hover:bg-blue-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        First
      </button>

      {/* Prev */}
      <button
        className="px-3 py-1 rounded border text-sm font-medium bg-white text-blue-500 hover:bg-blue-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={classNames(
            "px-3 py-1 rounded border text-sm font-medium",
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 hover:bg-blue-100"
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        className="px-3 py-1 rounded border text-sm font-medium bg-white text-blue-500 hover:bg-blue-100"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>

      {/* Last */}
      <button
        className="px-3 py-1 rounded border text-sm font-medium bg-white text-blue-500 hover:bg-blue-100"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
}
