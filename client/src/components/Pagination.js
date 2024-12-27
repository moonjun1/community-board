const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-2 mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="px-3 py-1">
        Page {currentPage} of {totalPages}
      </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;