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
  Image,
  Modal,
  Linking,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import * as SQLite from "expo-sqlite";
import { Church } from "./interface";

export const MissaScreen = () => {
  const [church, setChurch] = useState<Church[]>([]);
  const [region, setRegion] = useState<Region | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<Region | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChurches, setFilteredChurches] = useState<Church[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [distace, setDistance] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const [hasFetched, setHasFetched] = useState(false)

  const db = SQLite.openDatabase("church.db");
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => keyboardVisible ? ['60%', '100%'] : ["22%", "60%", '100%'], [keyboardVisible]);

  const openModal = (igreja: Church) => {
    setSelectedChurch(igreja);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedChurch(null);
  };

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
    setHasFetched(true)
  }, []);

  useEffect(() => {
    if (hasFetched) {
      const timeout = setTimeout(() => {
        handleSearch()
      }, 500);
      return () => clearTimeout(timeout)
    }
  }, [searchTerm])

  const fetchChurches = async () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM church;",
        [],
        (_, { rows: { _array } }) => {
          setChurch(_array);
          setFilteredChurches(_array);
        },
        (_, err) => {
          console.error("Erro ao buscar igrejas: ", err);
          return false;
        }
      );
    });
  };

  const handleSearch = () => {
    const filtered = church.filter((church) => {
      return church.name.toLowerCase().includes(searchTerm.toLowerCase());
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
          region={selectedCoords || region || undefined}
          showsUserLocation={true}
        >
          {filteredChurches.map((igreja) => (
            <Marker
              key={igreja.name.toString()}
              coordinate={{
                latitude: parseFloat(igreja.lat),
                longitude: parseFloat(igreja.lon),
              }}
              onPress={() => {openModal(igreja); setSelectedCoords({
                latitude: parseFloat(igreja.lat),
                longitude: parseFloat(igreja.lon),
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              })}}
            >
              <Image
                source={require("../../assets/marker-igreja.png")}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
          ))}
        </MapView>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
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
          </View>
          <FlatList
            data={filteredChurches}
            scrollEnabled={true}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {openModal(item); setSelectedCoords({
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon),
                latitudeDelta: 0.1,
                longitudeDelta: 0.1
              })}} style={styles.listItem}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.address}</Text>
              </TouchableOpacity>
            )}
          />
        </BottomSheet>
      </GestureHandlerRootView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.titleBar}>
            <Text style={styles.modalTitle}>{selectedChurch?.name}</Text>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: selectedChurch?.image }}
            style={styles.modalImage}
          />
          <View>
            <Text style={styles.modalAddress}>{selectedChurch?.address}</Text>
            <Text style={styles.modalAddress}>{selectedChurch?.schedule}</Text>
          </View>
        </View>
      </Modal>
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
  modalView: {
    backgroundColor: "white",
    height: "60%",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    tintColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleBar: {
    width: "100%",
    backgroundColor: "#164173",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalImage: {
    width: "100%",
    height: 220,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
    width: 25,
    borderRadius: 10000,
    backgroundColor: "black",
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalAddress: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10
  },
});
