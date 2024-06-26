import { openDB } from "idb";
import { useContext, createContext, useState, useEffect } from "react";

const DATABASE_NAME = "app-database";
const OBJECT_STORE_NAME = "clothingItems";

async function getDb() {
  return openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });
}

export const AppContext = createContext(null);
export default function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider(props) {
  const [globalCurrentData, setGlobalCurrentData] = useState(null);
  const [globalForecastData, setGlobalForecastData] = useState(null);
  const [wthrConditions, setWthrConditions] = useState();
  const [clothingItems, setClothingItems] = useState([]);
  const [globalOutfits, setGlobalOutfits] = useState([]);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function loadClothingItems() {
      const db = await getDb();
      const items = await db.getAll(OBJECT_STORE_NAME);
      setClothingItems(items);
    }
    loadClothingItems();
  }, []);

  useEffect(() => {
    async function saveClothingItems() {
      const db = await getDb();
      for (const item of clothingItems) {
        await db.put(OBJECT_STORE_NAME, item);
      }
    }
    saveClothingItems();
  }, [clothingItems]);

  const updateClothingItemsInOutfits = (updatedItem) => {
    setGlobalOutfits((prevOutfits) =>
      prevOutfits.map((outfit) =>
        outfit.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        clothingItems,
        setClothingItems,
        wthrConditions,
        setWthrConditions,
        globalCurrentData,
        setGlobalCurrentData,
        globalForecastData,
        setGlobalForecastData,
        globalOutfits,
        setGlobalOutfits,
        updateClothingItemsInOutfits,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
