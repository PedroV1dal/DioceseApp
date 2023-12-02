import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { MainTabNavigator } from "./src/navigators/MainTab";
import { initDB, insertDataFromJson } from "./src/db/database";

function App() {
  useEffect(() => {
    initDB();
    insertDataFromJson();
  }, []);

  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

export default App;
