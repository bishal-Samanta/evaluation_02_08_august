function Pagination({onChange , current, totalPage }) {

  const prev = <button data-testid="prev-page" disabled={current === 1? true : false } onClick={()=> onChange(current - 1)} >PREV</button>;
  const currentPage = <button data-testid="current-page" onClick={() => onChange(current)}>{+current}</button>;
  const next = <button data-testid="next-page" onClick={() =>onChange(current + 1) } disabled={current === totalPage? true: false }>NEXT</button>;
  const totalPagesElem = (
    <div>
      Total Pages: <b data-testid="total-pages">{totalPage}</b>{" "}
    </div>
  );
  return (
    <div data-testid="pagination-container">
      {prev}
      {currentPage}
      {next}
      {totalPagesElem}
    </div>
  );
}

export default Pagination;
