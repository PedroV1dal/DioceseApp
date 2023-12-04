import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AgendaScreen } from "../screens/calendar/AgendaScreen";
import { MissaScreen } from "../screens/missa/Missas";
import { MainStack } from "./MainStack";
import { Image } from "react-native";

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
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/igreja.png")}
              style={{ width: focused ? 26 : 22, height: focused ? 26 : 22 }}
            />
          ),
        }}
        component={MainStack}
      />
      <Tab.Screen
        name="Agenda"
        options={{
          title: "Calendário",
          headerBackgroundContainerStyle: {
            height: 86,
          },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/calendario.png")}
              style={{ width: focused ? 26 : 22, height: focused ? 26 : 22 }}
            />
          ),
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../assets/relogios.png")}
              style={{ width: focused ? 26 : 22, height: focused ? 26 : 22 }}
            />
          ),
        }}
        component={MissaScreen}
      />
    </Tab.Navigator>
  );
};
