import React from "react";
import { Text, StyleSheet, SafeAreaView } from "react-native";

export const AgendaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>AgendaScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
