import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  View,
  Text,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Igreja } from "./interface";
import * as Location from "expo-location";

export const IgrejaScreen = () => {
  const [church, setChurch] = useState<Igreja[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChurches, setFilteredChurches] = useState<Igreja[]>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);
  useEffect(() => {
    fetchChurches();
  }, []);

  const fetchChurches = async () => {
    try {
      const response = await fetch(
        "https://nunescarlos.online/api/index.php/v1/mini/paroquias"
      );
      const json = await response.json();
      setChurch(json.data);
      setFilteredChurches(json.data);
    } catch (error) {
      console.error("Erro ao buscar igrejas: ", error);
    }
  };

  const handleSearch = () => {
    const filtered = church.filter((church) => {
      return church.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredChurches(filtered);
  };

  const renderHandle = () => (
    <View style={styles.handleContainer}>
      <View style={styles.handle} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          region={region || undefined}
          showsUserLocation={true}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleComponent={renderHandle}
        >
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar igreja"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            <TouchableOpacity
              onPress={handleSearch}
              style={styles.searchButton}
            >
              <Text style={styles.searchButtonText}>Buscar nesta área</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={filteredChurches}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.alias}</Text>
              </View>
            )}
            scrollEnabled={true}
          />
        </BottomSheet>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  map: {
    height: "80%",
    width: "100%",
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  handleContainer: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  handle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#000",
  },
});
