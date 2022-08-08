/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
  act,
  getByTestId,
  findByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductItem from "../Components/Products/ProductItem";
import ProductList from "../Components/Products/ProductList";
import Pagination from "../Components/Products/Pagination";
import ProductPage from "../Components/Products/ProductPage";

function getElements(container) {
  return {
    prevPage: getByTestId(container, "prev-page"),
    nextPage: getByTestId(container, "next-page"),
    currentPage: getByTestId(container, "current-page"),
    lowToHighBtn: getByTestId(container, "low-to-high"),
    highToLowBtn: getByTestId(container, "high-to-low"),
    limitSelect: getByTestId(container, "limit-select"),
  };
}

// cleanup
beforeEach(() => {
  cleanup();
});
jest.setTimeout(60000);
try {
  describe("Test cases", () => {
    global.score = 1;
    console.log("Resetting score to 1");
    it("should render ProductItem.jsx correctly", () => {
      const product = {
        id: 22,
        brand: "Wish Karo",
        title: "Printed Straight Kurti",
        image:
          "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11985624/2020/6/25/2f2e3507-09e0-4330-a9c0-818583f0cdac1593065483501WishKaroGirlsMaroonSolidFitandFlareDress1.jpg",
        category: "kids",
        price: 399,
      };
      render(<ProductItem {...product} />);

      expect(screen.getByTestId("product-image")).toBeInTheDocument();
      expect(screen.getByTestId("product-image")).toHaveAttribute(
        "src",
        product.image
      );
      expect(screen.getByTestId("product-image")).toHaveAttribute(
        "alt",
        product.title
      );
      expect(screen.getByTestId("product-title").textContent.trim()).toBe(
        product.title
      );

      expect(screen.getByTestId("product-price").textContent.trim()).toBe(
        `₹ ${product.price}`
      );

      expect(screen.getByTestId("product-category").textContent.trim()).toBe(
        product.category
      );
      global.score += 1;
    });

    it("should render multiple products correctly", () => {
      const products = [
        {
          id: 22,
          brand: "Wish Karo",
          title: "Printed Straight Kurti",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11985624/2020/6/25/2f2e3507-09e0-4330-a9c0-818583f0cdac1593065483501WishKaroGirlsMaroonSolidFitandFlareDress1.jpg",
          category: "kids",
          price: 399,
        },
        {
          id: 33,
          brand: "Fancy Mart",
          title: "Artificial flowers with pot",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/7/30/078471d8-aa80-4fe9-9831-0af81ee4e2c41564476690067-1.jpg",
          category: "homedecor",
          price: 399,
        },
        {
          id: 32,
          brand: "Fancy Mart",
          title: "Artificial Bamboo plants",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2334609/2017/12/12/11513083183045-na-881513083182960-1.jpg",
          category: "homedecor",
          price: 487,
        },
      ];
      render(<ProductList products={products} />);

      expect(screen.getAllByTestId("product-item").length).toBe(
        products.length
      );

      products.forEach((product, i) => {
        expect(screen.getAllByTestId("product-image")[i]).toBeInTheDocument();
        expect(screen.getAllByTestId("product-image")[i]).toHaveAttribute(
          "src",
          product.image
        );
        expect(screen.getAllByTestId("product-image")[i]).toHaveAttribute(
          "alt",
          product.title
        );
        expect(
          screen.getAllByTestId("product-title")[i].textContent.trim()
        ).toBe(product.title);

        expect(
          screen.getAllByTestId("product-price")[i].textContent.trim()
        ).toBe(`₹ ${product.price}`);

        expect(
          screen.getAllByTestId("product-category")[i].textContent.trim()
        ).toBe(product.category);
      });
      global.score += 1;
    });

    it("should render pagination component", async () => {
      const fn = jest.fn();
      const data = [
        {
          data: { onChange: fn, current: 1, totalPage: 2 },
          tests: [
            () => expect(screen.getByTestId("prev-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("prev-page")).toBeDisabled(),
            () => expect(screen.getByTestId("next-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("next-page")).not.toBeDisabled(),
            () =>
              expect(screen.getByTestId("current-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("total-pages")).toBeInTheDocument(),
            () =>
              expect(screen.getByTestId("total-pages").textContent).toBe("2"),
            () =>
              expect(screen.getByTestId("current-page").textContent).toBe("1"),
            () => {
              const nextPage = screen.getByTestId("next-page");
              fireEvent.click(nextPage);
              expect(fn).toBeCalledTimes(1);
            },
            () => {
              const prevPage = screen.getByTestId("prev-page");
              fireEvent.click(prevPage);
              expect(fn).toBeCalledTimes(1);
            },
          ],
        },
        {
          data: { onChange: fn, current: 2, totalPage: 4 },
          tests: [
            () => expect(screen.getByTestId("prev-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("prev-page")).not.toBeDisabled(),
            () => expect(screen.getByTestId("next-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("next-page")).not.toBeDisabled(),
            () =>
              expect(screen.getByTestId("current-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("total-pages")).toBeInTheDocument(),
            () =>
              expect(screen.getByTestId("total-pages").textContent).toBe("4"),
            () =>
              expect(screen.getByTestId("current-page").textContent).toBe("2"),
            () => {
              const nextPage = screen.getByTestId("next-page");
              fireEvent.click(nextPage);
              expect(fn).toBeCalledTimes(2);
            },
            () => {
              const prevPage = screen.getByTestId("prev-page");
              fireEvent.click(prevPage);
              expect(fn).toBeCalledTimes(3);
            },
          ],
        },
        {
          data: { onChange: fn, current: 3, totalPage: 3 },
          tests: [
            () => expect(screen.getByTestId("prev-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("prev-page")).not.toBeDisabled(),
            () => expect(screen.getByTestId("next-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("next-page")).toBeDisabled(),
            () =>
              expect(screen.getByTestId("current-page")).toBeInTheDocument(),
            () => expect(screen.getByTestId("total-pages")).toBeInTheDocument(),
            () =>
              expect(screen.getByTestId("total-pages").textContent).toBe("3"),
            () =>
              expect(screen.getByTestId("current-page").textContent).toBe("3"),
            () => {
              const nextPage = screen.getByTestId("next-page");
              fireEvent.click(nextPage);
              expect(fn).toBeCalledTimes(3);
            },
            () => {
              const prevPage = screen.getByTestId("prev-page");
              fireEvent.click(prevPage);
              expect(fn).toBeCalledTimes(4);
            },
          ],
        },
      ];

      data.forEach(({ data, tests }) => {
        cleanup();
        render(<Pagination {...data} />);
        tests.forEach((t) => t());
      });
      global.score += 2;
    });
    function getProductElements(container) {
      return {
        image: getByTestId(container, "product-image"),
        title: getByTestId(container, "product-title"),
        price: getByTestId(container, "product-price"),
        category: getByTestId(container, "product-category"),
      };
    }

    it("should render product page", async () => {
      cleanup();
      const { container } = render(<ProductPage />);
      const data = [
        {
          id: 22,
          brand: "Wish Karo",
          title: "Printed Straight Kurti",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11985624/2020/6/25/2f2e3507-09e0-4330-a9c0-818583f0cdac1593065483501WishKaroGirlsMaroonSolidFitandFlareDress1.jpg",
          category: "kids",
          price: 399,
        },
        {
          id: 33,
          brand: "Fancy Mart",
          title: "Artificial flowers with pot",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/7/30/078471d8-aa80-4fe9-9831-0af81ee4e2c41564476690067-1.jpg",
          category: "homedecor",
          price: 399,
        },
        {
          id: 32,
          brand: "Fancy Mart",
          title: "Artificial Bamboo plants",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2334609/2017/12/12/11513083183045-na-881513083182960-1.jpg",
          category: "homedecor",
          price: 487,
        },
        {
          id: 15,
          brand: "Ziyaa",
          title: "A line kurta",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11056866/2019/12/9/67a0d919-cbca-4d89-a8f1-6a25c9e9305c1575891613300-Round-NeckWith--34th-Sleeve-Straight-Floral-print-Crepe-Kurt-1.jpg",
          category: "women",
          price: 499,
        },
        {
          id: 31,
          brand: "Tied Ribbons",
          title: "Set of 2 Artificial bunches",
          image:
            "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/12/15/bbd18059-da43-425e-87e5-64f5321277f41576372604988-1.jpg",
          category: "homedecor",
          price: 597,
        },
      ];
      expect(screen.getByTestId("product-page-title").textContent.trim()).toBe(
        "Product Page"
      );
      const productList = await screen.findAllByTestId("product-item");
      expect(productList.length).toBe(5);
      const elements = getElements(container);
      expect(elements.limitSelect.value).toBe("5");
      expect(elements.lowToHighBtn).toBeDisabled();
      expect(elements.highToLowBtn).not.toBeDisabled();
      expect(elements.prevPage).toBeDisabled();
      expect(elements.nextPage).not.toBeDisabled();
      expect(elements.currentPage.textContent).toBe("1");
      productList.forEach((product, i) => {
        const elements = getProductElements(product);
        for (let key in elements) {
          if (key === "image") {
            expect(elements[key].src).toBe(data[i].image);
          } else if (key === "price") {
            expect(elements[key].textContent).toBe(`₹ ${data[i].price}`);
          } else {
            expect(elements[key].textContent.trim()).toBe(data[i][key]);
          }
        }
      });
      global.score += 2;
    });

    it("should work with pagination correctly", async () => {
      const sleep = (delay) => new Promise((res) => setTimeout(res, delay));
      const { container, findAllByTestId } = render(<ProductPage />);
      {
        const elements = getElements(container);
        const productList = await findAllByTestId("product-item");
        expect(productList.length).toBe(5);
        const { title } = getProductElements(productList[0]);
        expect(title.textContent).toBe("Printed Straight Kurti");
        await act(() => {
          fireEvent.click(elements.nextPage);
        });
      }
      {
        const elements = getElements(container);
        expect(elements.currentPage.textContent).toBe("2");
        await sleep(1000);
        const productList = await screen.findAllByTestId("product-item");
        expect(productList.length).toBe(5);

        const { data, totalPages } = {
          data: [
            {
              id: 8,
              brand: "Roadster",
              title: "Men Linen Regular Fit",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11008602/2020/1/20/8b494575-e040-4560-853d-0ddb4d4a42021579510958229-Roadster-Men-Shirts-7641579510955741-1.jpg",
              category: "men",
              price: 599,
            },
            {
              id: 24,
              brand: "Style Karo",
              title: "Girls Solid Print Flared Dress",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/8/23/e4894be3-139c-4c80-aa6f-a69d09bb6df31566545182265-5.jpg",
              category: "kids",
              price: 599,
            },
            {
              id: 25,
              brand: "PSPeaches Karo",
              title: "Girls Checked Print Flared Dress",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11279500/2020/1/13/c1d506dd-3449-4967-b98e-f1745c91e4bf1578913886254-pspeaches-Girls-Yellow-Checked-Fit-and-Flare-Dress-246157891-1.jpg",
              category: "kids",
              price: 599,
            },
            {
              id: 27,
              brand: "Hell Cat Karo",
              title: "Pack of 3 Boys T-shirts",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/7/17/c36871cc-2632-423e-944c-4bc1bb55df9f1594942107913-1.jpg",
              category: "kids",
              price: 599,
            },
            {
              id: 2,
              brand: "Blackberry's",
              title: "Regukar Fit Printed Shirt",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10944602/2020/3/5/da4c1a83-987b-4afa-baad-f72039dbdedb1583385686526-Roadster-Men-Teal-Blue--Black-Regular-Fit-Printed-Casual-Shi-4.jpg",
              category: "men",
              price: 699,
            },
          ],
          totalPages: 8,
        };

        productList.forEach((product, i) => {
          //
          const elements = getProductElements(product);
          for (let key in elements) {
            if (key === "image") {
              expect(elements[key].src).toBe(data[i].image);
            } else if (key === "price") {
              expect(elements[key].textContent).toBe(`₹ ${data[i].price}`);
            } else {
              expect(elements[key].textContent.trim()).toBe(data[i][key]);
            }
          }
        });
        global.score += 2;
      }
    });

    it("sort functionality should work", async () => {
      const sleep = (delay) => new Promise((res) => setTimeout(res, delay));
      const { container, findAllByTestId } = render(<ProductPage />);
      const elements = getElements(container);
      {
        const productList = await findAllByTestId("product-item");
        expect(productList.length).toBe(5);
        const { title } = getProductElements(productList[0]);
        expect(title.textContent).toBe("Printed Straight Kurti");
        expect(elements.lowToHighBtn).toBeDisabled();
        await act(() => {
          fireEvent.click(elements.highToLowBtn);
        });
      }
      {
        await sleep(1000);
        const { data } = {
          data: [
            {
              id: 18,
              brand: "FabIndia",
              title: "Anarkali kurta",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11564850/2020/3/5/afd1a957-467e-4a15-abd8-994b8970f72a1583400100776-Fabindia-Women-Kurtas-3311583400099769-1.jpg",
              category: "women",
              price: 2699,
            },
            {
              id: 37,
              brand: "EximDecor Stick",
              title: "Handcrafted Leather crafted",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12640284/2020/9/29/18d30ec1-3aa8-4caf-b631-252811e1df971601360503171-EXIM-DECOR-Brown-Showpiece-5671601360502705-1.jpg",
              price: 2589,
              category: "homedecor",
            },
            {
              id: 19,
              brand: "Visudh",
              title: "Max slit kurta",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2329502/2017/12/12/11513075473636-na-1991513075473475-1.jpg",
              category: "women",
              price: 2135,
            },
            {
              id: 17,
              brand: "IndoEra",
              title: "Anarkali kurta",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/8969717/2019/3/28/e448c9a1-3a0f-40e7-b267-1bf44a44ba501553778956208-Indo-Era-Beige-Solid-Straight-Kurta-Sets-9801553778954623-1.jpg",
              category: "women",
              price: 1599,
            },
            {
              id: 34,
              brand: "Fancy Mart",
              title: "Set of 3 wall paintings",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/6/7/2685ea80-19e2-415f-a1e8-dc9a1b14ef3a1559906891935-1.jpg",
              category: "homedecor",
              price: 1599,
            },
          ],
          totalPages: 8,
        };
        const productList = await screen.findAllByTestId("product-item");
        expect(productList.length).toBe(5);
        expect(elements.lowToHighBtn).not.toBeDisabled();
        expect(elements.highToLowBtn).toBeDisabled();
        productList.forEach((product, i) => {
          //
          const elements = getProductElements(product);
          for (let key in elements) {
            if (key === "image") {
              expect(elements[key].src).toBe(data[i].image);
            } else if (key === "price") {
              expect(elements[key].textContent).toBe(`₹ ${data[i].price}`);
            } else {
              expect(elements[key].textContent.trim()).toBe(data[i][key]);
            }
          }
        });
        global.score += 3;
      }
    });

    it("limit / per page functionality should work", async () => {
      const sleep = (delay) => new Promise((res) => setTimeout(res, delay));
      const { container, findAllByTestId } = render(<ProductPage />);
      const elements = getElements(container);
      {
        const productList = await findAllByTestId("product-item");
        expect(productList.length).toBe(5);
        const { title } = getProductElements(productList[0]);
        expect(title.textContent).toBe("Printed Straight Kurti");
        expect(elements.limitSelect.value).toBe("5");
        await act(() => {
          fireEvent.change(elements.limitSelect, { target: { value: "10" } });
        });
      }
      {
        await sleep(1000);
        const { data } = {
          data: [
            {
              id: 22,
              brand: "Wish Karo",
              title: "Printed Straight Kurti",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11985624/2020/6/25/2f2e3507-09e0-4330-a9c0-818583f0cdac1593065483501WishKaroGirlsMaroonSolidFitandFlareDress1.jpg",
              category: "kids",
              price: 399,
            },
            {
              id: 33,
              brand: "Fancy Mart",
              title: "Artificial flowers with pot",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/7/30/078471d8-aa80-4fe9-9831-0af81ee4e2c41564476690067-1.jpg",
              category: "homedecor",
              price: 399,
            },
            {
              id: 32,
              brand: "Fancy Mart",
              title: "Artificial Bamboo plants",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2334609/2017/12/12/11513083183045-na-881513083182960-1.jpg",
              category: "homedecor",
              price: 487,
            },
            {
              id: 15,
              brand: "Ziyaa",
              title: "A line kurta",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11056866/2019/12/9/67a0d919-cbca-4d89-a8f1-6a25c9e9305c1575891613300-Round-NeckWith--34th-Sleeve-Straight-Floral-print-Crepe-Kurt-1.jpg",
              category: "women",
              price: 499,
            },
            {
              id: 31,
              brand: "Tied Ribbons",
              title: "Set of 2 Artificial bunches",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/12/15/bbd18059-da43-425e-87e5-64f5321277f41576372604988-1.jpg",
              category: "homedecor",
              price: 597,
            },
            {
              id: 8,
              brand: "Roadster",
              title: "Men Linen Regular Fit",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11008602/2020/1/20/8b494575-e040-4560-853d-0ddb4d4a42021579510958229-Roadster-Men-Shirts-7641579510955741-1.jpg",
              category: "men",
              price: 599,
            },
            {
              id: 24,
              brand: "Style Karo",
              title: "Girls Solid Print Flared Dress",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/8/23/e4894be3-139c-4c80-aa6f-a69d09bb6df31566545182265-5.jpg",
              category: "kids",
              price: 599,
            },
            {
              id: 25,
              brand: "PSPeaches Karo",
              title: "Girls Checked Print Flared Dress",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11279500/2020/1/13/c1d506dd-3449-4967-b98e-f1745c91e4bf1578913886254-pspeaches-Girls-Yellow-Checked-Fit-and-Flare-Dress-246157891-1.jpg",
              category: "kids",
              price: 599,
            },
            {
              id: 27,
              brand: "Hell Cat Karo",
              title: "Pack of 3 Boys T-shirts",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/7/17/c36871cc-2632-423e-944c-4bc1bb55df9f1594942107913-1.jpg",
              category: "kids",
              price: 599,
            },
            {
              id: 2,
              brand: "Blackberry's",
              title: "Regukar Fit Printed Shirt",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10944602/2020/3/5/da4c1a83-987b-4afa-baad-f72039dbdedb1583385686526-Roadster-Men-Teal-Blue--Black-Regular-Fit-Printed-Casual-Shi-4.jpg",
              category: "men",
              price: 699,
            },
          ],
          totalPages: 4,
        };
        const productList = await screen.findAllByTestId("product-item");
        expect(productList.length).toBe(10);
        productList.forEach((product, i) => {
          //
          const elements = getProductElements(product);
          for (let key in elements) {
            if (key === "image") {
              expect(elements[key].src).toBe(data[i].image);
            } else if (key === "price") {
              expect(elements[key].textContent).toBe(`₹ ${data[i].price}`);
            } else {
              expect(elements[key].textContent.trim()).toBe(data[i][key]);
            }
          }
        });
        global.score += 4;
      }
    });
    it("all filters should work together", async () => {
      cleanup();
      const sleep = (delay) => new Promise((res) => setTimeout(res, delay));
      const { container, findAllByTestId } = render(<ProductPage />);
      const elements = getElements(container);
      {
        const productList = await findAllByTestId("product-item");
        expect(productList.length).toBe(5);
        const { title } = getProductElements(productList[0]);
        expect(title.textContent).toBe("Printed Straight Kurti");
        expect(elements.limitSelect.value).toBe("5");
        await act(() => {
          fireEvent.change(elements.limitSelect, { target: { value: "10" } });
        });
        await sleep(2500);
        await act(() => {
          fireEvent.click(elements.nextPage);
        });
        await sleep(2500);
        await act(() => {
          fireEvent.click(elements.nextPage);
        });
        await sleep(2500);
        await act(() => {
          fireEvent.click(elements.highToLowBtn);
        });
        await sleep(2500);
      }
      {
        const { data } = {
          data: [
            {
              id: 29,
              brand: "Disney",
              title: "Boys Color Blocked T-shirt",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/7/17/c36871cc-2632-423e-944c-4bc1bb55df9f1594942107913-1.jpg",
              category: "kids",
              price: 899,
            },
            {
              id: 1,
              brand: "Roadster",
              title: "cotton Checked Casual Shirt",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/1376577/2016/9/15/11473928353466-Roadster-Men-Black-Regular-Fit-Checked-Casual-Shirt-4501473928353310-1.jpg",
              category: "men",
              price: 844,
            },
            {
              id: 3,
              brand: "Van Heusen",
              title: "Regukar Fit Printed Shirt",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2164551/2019/3/12/45950906-09a8-4e72-9717-16448ce161a41552375230864-Roadster-Men-Grey--Olive-Green-Camouflage-Print-Regular-Fit--1.jpg",
              category: "men",
              price: 844,
            },
            {
              id: 9,
              brand: "Park Avenue",
              title: "Men Linen Regular Fit",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2164551/2019/3/12/45950906-09a8-4e72-9717-16448ce161a41552375230864-Roadster-Men-Grey--Olive-Green-Camouflage-Print-Regular-Fit--1.jpg",
              category: "men",
              price: 799,
            },
            {
              id: 23,
              brand: "Style Karo",
              title: "Girls Print Flared Dress",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11811376/2020/4/24/d003ff16-e2b8-4e31-991a-51a9cb0a089d1587709778184StyleStoneGirlsNavyBluePrintedFitandFlareDress1.jpg",
              category: "kids",
              price: 799,
            },
            {
              id: 35,
              brand: "Random Mart",
              title: "Set of photo frames",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/6556105/2018/5/28/b5fc076f-b094-4956-8679-d962eba8eeb61527509319846-Random-Set-of-06-photo-frames-WITH-MDF-flowers-plaque-4X6-4PCS--5x7-2pcs-BLACK-2611527509319705-1.jpg",
              category: "homedecor",
              price: 799,
            },
            {
              id: 2,
              brand: "Blackberry's",
              title: "Regukar Fit Printed Shirt",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10944602/2020/3/5/da4c1a83-987b-4afa-baad-f72039dbdedb1583385686526-Roadster-Men-Teal-Blue--Black-Regular-Fit-Printed-Casual-Shi-4.jpg",
              category: "men",
              price: 699,
            },
            {
              id: 14,
              brand: "Max",
              title: "A line kurta",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10808284/2019/10/30/c35d059d-a357-4863-bcb1-eacd8c988fb01572422803188-AHIKA-Women-Kurtas-8841572422802083-1.jpg",
              category: "women",
              price: 699,
            },
            {
              id: 36,
              brand: "Wall Stick",
              title: "Bird nest on tree",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/8/21/6914db9e-3422-46cc-b9d9-a61e5bdfb6411597960381943-1.jpg",
              price: 699,
              category: "homedecor",
            },
            {
              id: 8,
              brand: "Roadster",
              title: "Men Linen Regular Fit",
              image:
                "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11008602/2020/1/20/8b494575-e040-4560-853d-0ddb4d4a42021579510958229-Roadster-Men-Shirts-7641579510955741-1.jpg",
              category: "men",
              price: 599,
            },
          ],
          totalPages: 4,
        };
        expect(elements.currentPage.textContent).toBe("3");
        expect(elements.limitSelect.value).toBe("10");
        expect(elements.highToLowBtn).toBeDisabled();
        const productList = await screen.findAllByTestId("product-item");
        expect(productList.length).toBe(10);
        productList.forEach((product, i) => {
          //
          const elements = getProductElements(product);
          for (let key in elements) {
            if (key === "image") {
              expect(elements[key].src).toBe(data[i].image);
            } else if (key === "price") {
              expect(elements[key].textContent).toBe(`₹ ${data[i].price}`);
            } else {
              expect(elements[key].textContent.trim()).toBe(data[i][key]);
            }
          }
        });
        global.score += 4;
      }
    });
  });
} catch (err) {
  console.log(err);
}
afterAll(() => {
  console.log("Final Score is", global.score);
});
