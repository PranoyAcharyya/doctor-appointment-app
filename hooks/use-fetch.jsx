import { useState } from "react";
import { toast } from "sonner";

const userFetch = (callback) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callback(...args);
      setData(res);
    //   setLoading(false);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData, setLoading, setError };
};

export default userFetch;
