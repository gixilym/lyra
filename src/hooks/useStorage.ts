interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clearEverything: () => void;
}

function useStorage(): Storage {
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

  function clearEverything(): void {
    const item: void = window.localStorage.clear();
    return item;
  }

  return { getItem, setItem, removeItem, clearEverything };
}

export default useStorage;
