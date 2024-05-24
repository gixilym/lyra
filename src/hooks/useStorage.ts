function useStorage(): StorageFunctions {
  function getItem(key: string): string | null {
    const item: string | null = window.localStorage.getItem(key);
    return item;
  }

  function setItem(key: string, value: any): void {
    const item: void = window.localStorage.setItem(key, value);
    return item;
  }

  return { getItem, setItem };
}

export default useStorage;

interface StorageFunctions {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}
