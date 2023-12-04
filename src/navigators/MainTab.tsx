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
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#007bff",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{
                width: 40,
                height: 40,
                padding: 10,
                marginLeft: 10,
              }}
            />
          ),
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
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#007bff",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{
                width: 40,
                height: 40,
                padding: 10,
                marginLeft: 10,
              }}
            />
          ),
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
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#164173",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <Image
              source={require("../assets/logo.png")}
              style={{
                width: 40,
                height: 40,
                padding: 10,
                marginLeft: 10,
              }}
            />
          ),
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
