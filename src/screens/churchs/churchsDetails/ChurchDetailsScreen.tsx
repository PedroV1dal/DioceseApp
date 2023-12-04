import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { IChurchs } from "../interface";
import { useNavigation } from "@react-navigation/native";
import { Text, Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ChurchDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { church } = route.params as { church: IChurchs };

  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
      <Image source={{ uri: church.image }} style={styles.image} />
      <Text style={styles.name}>{church.name}</Text>
      <Text style={styles.address}>{church.address}</Text>
      <Text style={styles.creation}>
        Data da criação: {church.creationDate}
      </Text>
      <Text style={styles.about}>{church.about}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 18,
  },
  address: {
    color: "grey",
    fontSize: 14,
    marginTop: 10,
  },
  creation: {
    color: "grey",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  about: {
    marginTop: 20,
    textAlign: "justify",
    paddingHorizontal: 20,
  },
});
