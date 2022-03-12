import axios from 'axios';
import { useEffect, useState } from 'react';

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    axios
      .get<{ products: Product[] }>('/api/products', {
        signal: controller.signal,
      })
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError(true);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return {
    products,
    error,
    loading,
  };
};
