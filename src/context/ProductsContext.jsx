import { createContext, useContext, useEffect, useState } from "react";
import { getDocumentsFirebase } from "../firebase/data-firebase";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      let firebasePerfumes = await getDocumentsFirebase("perfumes");
      setProducts(firebasePerfumes);
    } catch (err) {
      setError("Error al cargar productos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const reserveProduct = async (productId, deposit) => {
    try {
      await reservePerfume(productId, deposit);
      setProducts(products.map(p => 
        p.id === productId ? { ...p, reserved: true, deposit } : p
      ));
    } catch (err) {
      setError("Error al reservar");
    }
  };
  //if(products)console.log("products", products);
  

  return (
    <ProductsContext.Provider 
      value={{ 
        products, 
        loading, 
        error,
        reserveProduct,
        refreshProducts: loadProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);