import { useEffect, useState } from "react";


const useProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://radiant-ravine-14055.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {

      });
  }, []);
  return products;
};

export default useProducts;
