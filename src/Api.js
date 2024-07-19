import axios from "axios";
export function getProduct(id) {
  return axios
    .get("https://dummyjson.com/products/" + id)
    .then(function (response) {
      return response.data;
    });
}
export function getData() {
  return axios.get("https://dummyjson.com/products").then(function (response) {
    return response.data.products;
  });
}
export default getData;
