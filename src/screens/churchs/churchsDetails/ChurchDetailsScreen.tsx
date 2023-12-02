import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { IChurchs } from "../interface";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet } from "react-native";

export const ChurchDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { church } = route.params as { church: IChurchs };

  useLayoutEffect(() => {
    navigation.setOptions({ title: church.name });
  }, [navigation, church.name]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: church.image }} style={styles.image} />
      <Text style={styles.name}>{church.name}</Text>
      <Text style={styles.address}>{church.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 200, // Ajuste conforme necessário
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  address: {
    color: "grey",
  },
});
