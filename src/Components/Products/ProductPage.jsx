import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getProducts } from "./api";
import Pagination from "./Pagination";
import ProductList from "./ProductList";

function ProductPage() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [limit , setLimit] = useState(5);
  const [orderBy, setOrderBy] = useState("asc");
  const [buttonDisabled , setButtonDisabled] = useState({asc: true, desc: false })
  const [totalPages , setTotalPages] = useState(8);

  useEffect(() =>{
    getProducts({page, limit , orderBy}).then((res) =>{
      console.log(res);
      setTotalPages(res.totalPages);
      setState(res.data);
      console.log(totalPages)
    })

  }, [page , limit , orderBy ]);

  const handleSort = (type) =>{
    if(type === "asc"){
      setOrderBy("asc");
      setButtonDisabled({asc: true, desc: false })
    }
    else{
      setOrderBy("desc");
      setButtonDisabled({asc: false, desc: true })
    }
  }

  const handleChange = (e) =>{
    let value = e.target.value;
    console.log(value)
    value = +value;
    setLimit(value);
  }

  const handlePagination = (pageNumber) =>{
    setPage(pageNumber);
  }

  return (
    <div>
      <h1 data-testid="product-page-title">Product Page</h1>
      <button data-testid="low-to-high" onClick={()=> handleSort("asc")} disabled={buttonDisabled.asc} >Sort low to high</button>
      <button data-testid="high-to-low" onClick={() => handleSort("desc")} disabled={buttonDisabled.desc} >Sort high to low</button>
      <div>
        <label>Per page</label>
        <select data-testid="limit-select" onChange={handleChange}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>
      <Pagination  onChange={handlePagination} current={page} totalPage={totalPages} />
      {/* map products */}
      <ProductList products={state}  />
    </div>
  );
}

export default ProductPage;
