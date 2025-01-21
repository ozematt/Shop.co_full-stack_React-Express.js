export const generatePagination = (currentPage: number, totalPages: number) => {
  const pageNumbers = [];

  // if there are less than 5 pages, show all
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // add first page
    pageNumbers.push(1);

    // add dots if needed
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // add pages around current page
    const start = Math.max(currentPage - 1, 2); // minimum 2
    const end = Math.min(currentPage + 1, totalPages - 1); // at most before the last page

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    // add dots if needed
    if (currentPage < totalPages - 2) {
      pageNumbers.push("...");
    }

    // add last page
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};
