import { useState } from "react";

function useLoading(): Loading {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const startLoading: () => void = () => setIsLoading(true);
  const finishLoading: () => void = () => setIsLoading(false);
  return { isLoading, startLoading, finishLoading };
}

export default useLoading;

interface Loading {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
}
