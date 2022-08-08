# React - Product Listing

## Submission Instrions [Please note]

### Maximum Marks - 20

- The Submission should not contain spaces, for example `/rct-101 folder/eval` will not work
- Do not push node_modules and package_lock.json to github
- Rubrics / Marking Scheme is below ( we will convert this back to a scale of 10 )
- ![](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2022-08-08/Screenshot%202022-08-08%20at%2012.12.05%20PM_441187.png)
- The above is an example of what the submission link should open
- example link `https://github.com/masai-course/my_user/tree/master/unit-4/sprint-2/eval/products-listing`

```
✅ able to submit the correct repository and run the application and tests - 1 mark
✅ should render ProductItem.jsx correctly - 1 mark
✅ should render multiple products correctly - 1 mark
✅ should render pagination component - 2 mark
✅ should render product page - 2 mark
✅ should work with pagination correctly - 2 mark
✅ sort functionality should work - 3 mark
✅ limit / per page functionality should work - 4 mark
✅ all filters should work together - 4 mark
```

## Description

- You need to make an application which lists products from an api
- User should be able to apply pagination, change no of elements per page, and sort the results in high to low or low to high according to price
- [Video Explainer.mp4](https://masai-course.s3.ap-south-1.amazonaws.com/material/videos/32827/0idXKWRBvNJAl8Y01nhIasQuIfvweDalyovHie50.mp4)

## Boilerplate

- You are given a set of Components
- ProductsPage
  - main page where you need to start wroking
  - will contain filters, pagination, product list, and other required entities
- ProductList
  - this component is imported in the ProductsPage
  - it will contain a list of ProductItems
- ProductItem
  - Component to display information of a single product
- Pagination
  - Pagination component which will have prev, next, current and total pages
- api.js
  - you need to make the `getProducts` api working here
- ![](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2022-08-08/Screenshot%202022-08-08%20at%2011.49.42%20AM_449642.png)
- You are given these dummy elements (anything with data-testid you should not remove or change the attribute values)

## Requirements

- API details
- `url`: `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products`
- query params:
  - `page`: a number representing the page number
  - `limit`: a number representing total number of results per page
  - `orderBy`: order the products in ascending or descending manner, based on the price field
- response
  - `data`: array of products
  - `totalPages`: number representing no of pages
- example `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=2&limit=5&orderBy=desc`
- By default when the user loads the page, the user should be shown a set of products
  - of page 1
  - 5 per page
  - sorted in low-to-high order of price of the product
- You cannot use JSON server
- use useEffect to display the data on the UI

- `ProductPage`

  - all the filters for pagination, sorting, , and products will be present here

- `Pagination`

  - it will accept the following properties
    - current - a number representing the current page
    - onChange - a callback which will be given the new page number `(page)=>{})`
      - it should be added to any button (like Prev, Next and current page)
    - total - a number representing the total pages present in the list
  - by default the Prev button (data-testid="prev-button") should be disabled
  - the Next button (data-testid="next-button") should be disabled if you are on the last page
  - The current page should be shown in the button with data-testid `current-page`
  - The total pages should be shown in component, under the element with `data-testid="total-pages"`
    - When clicking you should make a new request and it should show the results in the UI
  - on click of any `button` the new page number will be sent to the onChange callback

- `Sorting`

  - There are two buttons `Sort high to low` and `Sort low to high`
  - These two buttons have the following data-testid="high-to-low" and data-testid="low-to-high"
  - By default, it should be in low to high order
  - if low to high is the order, then the button `Sort low to high` should be disabled
  - if high to low is the order, then the button `Sort high to low` should be disabled
  - When clicking, the order of the elements should change
  - This should also work even if you are on pages 2,3 etc.

- `Limit / Per page filter`

  - When a user clicks on this, it is a dropdown of other limits that you can set
  - by default, it should be 5 items
  - You should provide the option of 10 items as well
  - When a user changes the value to 10, then you should make a network requests with the limit changed, and it should reflect on the UI
  - This should work along with pagination, and sorting

- `getProducts` api

  - this is a function that returns the JSON response
  - you need to accept an object that has three keys,
  - limit ( default value: 5 )
  - sortBy ( default value: asc )
  - page ( default value: 1 )
  - getProducts( { page: 1, limit: 10, sortBy: "desc" } )

- `ProductList`

  - this component should accept a property called `products` which is the array of products data that you retreive from the API, you should map through this and transform into components with ProductItems

- `ProductItem`

  - Component to display information of a single product
  - it should accept the following props
    - title - the title of the product
      - it should be added under the element with `data-testid="product-title"`
    - price - the price of the product
      - it should be added under the element with `data-testid="product-price"` as `₹ 500` for example ( spaces are important! )
    - category - the category that the product belongs to
      - it should be added under the element with `data-testid="product-category"`
    - image - the image url of the product
      - it should be added under the element with `data-testid="product-image"`
      - the image element should also accept the alt attribute and set it to the `title`
