import React from "react";

function Pagination({ currentPage, lastPage, onPageChange }) {
  if (lastPage <= 1) {
    return null;
  }

  const pages = [];

  for (let page = 1; page <= lastPage; page++) {
    pages.push(page);
  }

  return (
    <div className="exploration-pagination">

      {/* السابق */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </button>

      {/* أرقام الصفحات */}
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* التالي */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        ›
      </button>

    </div>
  );
}

export default Pagination;