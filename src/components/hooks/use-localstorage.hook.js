import { useState, useEffect } from 'react';

export function useLocalStorage(key) {
  const [data, setData] = useState();
  useEffect(() => {
    let data = localStorage.getItem(key);
    if (data != null) {
      data = JSON.parse(data);
      setData(data);
    }
  }, []);
  const saveData = (newData)=>{
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
  };
  return [data, saveData];
}
