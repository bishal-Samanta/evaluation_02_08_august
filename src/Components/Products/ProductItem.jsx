import React from "react";

// brand: "Wish Karo"
// category: "kids"
// id: 22
// image: "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11985624/2020/6/25/2f2e3507-09e0-4330-a9c0-818583f0cdac1593065483501WishKaroGirlsMaroonSolidFitandFlareDress1.jpg"
// price: 399
// title: "Printed Straight Kurti"

const ProductItem = ({brand, category , id , image , price , title }) => {
  return (
    <div
      data-testid="product-item"
      style={{
        display: "flex",
        gap: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        flexDirection: "column",
      }}
    >
      <img data-testid="product-image" height="100px" src={image} alt={title}/>
      <b data-testid="product-title">{title}</b>
      <span data-testid="product-price">{`₹ ${price}`}</span>
      <div style={{ display: "flex" }}>
        <b data-testid="product-category">{category}</b>
      </div>
    </div>
  );
};
export default ProductItem;
