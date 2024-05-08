import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Data } from "../components/Trending";

interface UseAppwriteProps {
  fn: () => Promise<Data[]>;
}

const useAppwrite = ({ fn }: UseAppwriteProps) => {
  const [data, setData] = useState<Data[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const result = await fn();
      setData(result);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    return () => {
      setData([]);
      setIsLoading(false);
    };
  }, []);

  const refetch = () => fetchPosts();

  return { data, refetch, isLoading };
};

export default useAppwrite;
