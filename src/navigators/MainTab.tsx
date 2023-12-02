import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AgendaScreen } from "../screens/calendar/AgendaScreen";
import { HomeScreen } from "../screens/home/HomeScreen";
import { IgrejaScreen } from "../screens/churchs/IgrejasScreen";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          title: "Home",
          headerBackgroundContainerStyle: {
            height: 86,
          },
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Agenda"
        options={{
          title: "Calendário",
          headerBackgroundContainerStyle: {
            height: 86,
          },
        }}
        component={AgendaScreen}
      />
      <Tab.Screen
        name="Igrejas"
        options={{
          title: "Igrejas",
          headerBackgroundContainerStyle: {
            height: 86,
          },
        }}
        component={IgrejaScreen}
      />
    </Tab.Navigator>
  );
};
