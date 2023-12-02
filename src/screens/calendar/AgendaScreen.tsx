import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View, FlatList } from "react-native";
import * as SQLite from "expo-sqlite";
import { Church } from "./interface";

const db = SQLite.openDatabase("church.db");

export const AgendaScreen = () => {
  const [churches, setChurches] = useState<Church[]>([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT name FROM church;",
        [],
        (_, { rows: { _array } }) => setChurches(_array),
        (_, err) => {
          console.error(err);
          return false;
        }
      );
    });
  }, []);

  const renderItem = ({ item }: { item: Church }) => (
    <View style={styles.listItem}>
      <Text style={styles.name}>{item.name}</Text>
    </View>
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
