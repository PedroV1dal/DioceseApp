import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { initDB, insertDataFromJson } from "./src/db/database";
import HomeStack from "./src/navigators/HomeStack";

function App() {
  useEffect(() => {
    initDB();
    insertDataFromJson();
  }, []);

  return (
    <HomeStack />
  );
}

export default App;
