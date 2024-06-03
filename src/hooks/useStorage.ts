function useStorage(): StorageFunctions {
  function getItem(key: string): string | null {
    const item: string | null = window.localStorage.getItem(key);
    return item;
  }

  function setItem(key: string, value: any): void {
    const item: void = window.localStorage.setItem(key, value);
    return item;
  }

  function removeItem(key: string): void {
    const item: void = window.localStorage.removeItem(key);
    return item;
  }

  return { getItem, setItem, removeItem };
}

export default useStorage;

interface StorageFunctions {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}
