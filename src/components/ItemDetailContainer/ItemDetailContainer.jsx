import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/product";

export const ItemDetailContainer = () => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getProductById(id)
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => {
        console.error(err);
        setError("No se encontró el producto");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;
  if (!detail) return <p>Producto no encontrado</p>;

  return (
    <main>
      <ItemDetail detail={detail} />
    </main>
  );
};
