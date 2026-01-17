import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7000";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get("/api/products")
      .then(r => { if(mounted) setProducts(r.data); })
      .catch(e => { if(mounted) setErr(e); })
      .finally(() => { if(mounted) setLoading(false); });

    return () => mounted = false;
  }, []);

  return { products, loading, err };
}
