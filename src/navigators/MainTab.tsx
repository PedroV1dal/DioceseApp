import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AgendaScreen } from "../screens/calendar/AgendaScreen";
import { ChurchsScreen } from "../screens/churchs/ChurchsScreens";
import { MissaScreen } from "../screens/missa/Missas";

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          title: "Igrejas",
          headerBackgroundContainerStyle: {
            height: 86,
          },
        }}
        component={ChurchsScreen}
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
        name="Missas"
        options={{
          title: "Missas",
          headerBackgroundContainerStyle: {
            height: 86,
          },
        }}
        component={MissaScreen}
      />
    </Tab.Navigator>
  );
};
