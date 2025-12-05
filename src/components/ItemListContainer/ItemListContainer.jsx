import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList.Jsx";
import { getProducts } from "../../components/services/product";

export const ItemListContainer = ({ titulo }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar productos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>{titulo}</h1>
      <ItemList lista={products} />
    </section>
  );
};
