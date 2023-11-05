import * as React from "react";

interface PaginationProps {
  itemPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export default function Pagination({
  itemPerPage,
  totalItems,
  currentPage,
  paginate,
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="mt-5 pr-1">
      <ul className="pagination flex gap-[10px] justify-end text-black items-center max-sm:justify-start text-sm">
        {pageNumbers.map((number) => (
          <li key={number}>
            <a
              href="#"
              onClick={() => paginate(number)}
              className={
                currentPage === number
                  ? "bg-d-500 px-2 py-1 rounded-md"
                  : " px-2 py-1 rounded-md"
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
