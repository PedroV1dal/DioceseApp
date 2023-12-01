import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AgendaScreen } from "../screens/AgendaScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { IgrejaScreen } from "../screens/churchs/IgrejasScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Igrejas" component={IgrejaScreen} />
    </Tab.Navigator>
  );
};
