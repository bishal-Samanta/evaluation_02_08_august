/**
 * The function should accept the following parameters:
 * @param {string} page - page number
 * @param {"asc" | "desc"} sortBy - sort by asc or desc
 * @param {number} limit - number of products per page
 * @returns {Promise} - Promise object represents the result of the API call
 * @description This function is used to get all products from the server.
 * url - https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products
 * method - GET
 * query params - page, sortBy, limit
 * response - {
 *    "data": [ ],
 *   "totalPages": 0
 * @example
 * getProducts({})
 * .then(response => {
 *    const {data, totalPages} = response;
 * })
 * @returns {Promise}
 */
// url: https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products
// query params:
//  page
//  orderBy
//  limit

export const getProducts = ({page=1, limit=5, orderBy="asc" }) => {
  return fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&orderBy=${orderBy}&limit=${limit}`).then((res) =>{
    return res.json();
  })
};


