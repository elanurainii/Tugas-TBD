import * as React from "react";

export default function handlePage() {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const itemPerPage = 10;
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;

  return {
    indexOfFirstItem,
    setCurrentPage,
    indexOfLastItem,
    itemPerPage,
    currentPage,
  };
}
