import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ChurchsScreen } from "../screens/churchs/ChurchsScreens";
import { ChurchDetailsScreen } from "../screens/churchs/churchsDetails/ChurchDetailsScreen";
import { IChurchs } from "../screens/churchs/interface";

export type MainStackParamList = {
  Churchs: undefined;
  ChurchDetails: { church: IChurchs };
};

const Stack = createStackNavigator<MainStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Churchs"
        component={ChurchsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ChurchDetails" component={ChurchDetailsScreen} />
    </Stack.Navigator>
  );
};
