import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { IChurchs } from "./interface";
import { useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "../../navigators/MainStack";
import { StackNavigationProp } from "@react-navigation/stack";

const db = SQLite.openDatabase("church.db");

export const ChurchsScreen = () => {
  const [churches, setChurches] = useState<IChurchs[]>([]);

  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name, address, image FROM church;",
        [],
        (_, { rows: { _array } }) => setChurches(_array),
        (_, err) => {
          console.error(err);
          return false;
        }
      );
    });
  }, []);

  const renderItem = ({ item }: { item: IChurchs }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate("ChurchDetails", { church: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={churches}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontWeight: "bold",
  },
  address: {
    color: "grey",
  },
  city: {
    fontStyle: "italic",
  },
});
