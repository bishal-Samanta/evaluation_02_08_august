import React from "react";
import ProductItem from "./ProductItem";

// create Product component which contains the list of ProductItem component
const ProductList = ({products}) => {
  return <div data-testid="products-container">{products.map((el) => <ProductItem {...el} key={el.id} />)}</div>;
};

// export
export default ProductList;


// brand: "Wish Karo"
// category: "kids"
// id: 22
// image: "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11985624/2020/6/25/2f2e3507-09e0-4330-a9c0-818583f0cdac1593065483501WishKaroGirlsMaroonSolidFitandFlareDress1.jpg"
// price: 399
// title: "Printed Straight Kurti"