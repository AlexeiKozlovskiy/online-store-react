import './Pagination.scss';
import ReactPaginate from 'react-paginate';
import { PageClickEvent } from '@/components/types/types';

interface IPagination {
  curPage: number;
  pageCount: number;
  handlePageClick: (event: PageClickEvent) => void;
}

export function Pagination({ curPage, handlePageClick, pageCount }: IPagination) {
  return (
    <div className="pagination-button-container">
      <ReactPaginate
        forcePage={curPage - 1}
        className="react-paginate"
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
