import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Button, ScrollView, ImageBackground } from "react-native";

import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { baseUrl } from "../urlConfig/urlConfig";
import { Card } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
const Reservation = ({ navigation, route }) => {
  const [reservations, setReservations] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [filterReserved, setFilterReserved] = useState(false);
  const [token, setToken] = useState("");
  const [terrain, setTerrain] = useState([]);
  const [style, setstyle] = useState(false);
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("OwnerToken");
      console.log("welcome :", value);
      setToken(value);
      return value;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    _retrieveData().then((response) => getAllTerrains(response));

    handleFetchingAllTheReservationForAnOwner();
  }, []);

  const getAllTerrains = (token) => {
    axios
      .get(`${baseUrl}api/terrain/${token}`)
      .then(function (response) {
        setTerrain(response.data);

        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const SCREEN_WIDTH = Dimensions.get("window").width;

  const handleFetchingAllTheReservationForAnOwner = () => {
    axios
      .get(`${baseUrl}api/reservation/player/${route.params.id}`)
      .then(function (response) {
        setReservations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const addPoints = (playerFireId) => {
    console.log(playerFireId);
    axios
      .get(`${baseUrl}api/player/${playerFireId}`)
      .then((response) => {
        let addedPoints = response.data[0].Points + 5;
        axios.put(`${baseUrl}api/player/updatePlayerPoints`, {
          FireId: playerFireId,
          Points: addedPoints,
        });
      })
      .catch((error) => console.log(error));
  };
  const handleUpdateReservation = (reservationId) => {
    axios
      .put(`${baseUrl}api/reservation/player/${reservationId}`)
      .then(function (response) {
        console.log(response.data);
        // Update the reservations state with the new data
        const updatedReservations = reservations.map((reservation) => {
          if (reservation.id === reservationId) {
            return { ...reservation, Reserved: true };
          }
          return reservation;
        });
        setReservations(updatedReservations);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleDeleteReservation = (reservationId) => {
    axios
      .delete(`${baseUrl}api/reservation/player/${reservationId}`)
      .then(function (response) {
        console.log(response.data);
        // Update the reservations state by filtering out the deleted reservation
        const updatedReservations = reservations.filter(
          (reservation) => reservation.id !== reservationId
        );
        setReservations(updatedReservations);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleFilterReserved = () => {
    setFilterReserved(true);
  };
  const handleClearFilter = () => {
    setFilterReserved(false);
  };
  const filteredReservations = filterReserved
    ? reservations.filter((reservation) => reservation.Reserved)
    : reservations;
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleFilterReserved}
          >
            <Text style={styles.headerButtonText}>Confirmed </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleClearFilter}
          >
            <Text style={styles.headerButtonText}>All reservations</Text>
          </TouchableOpacity>
        </View>

        {filteredReservations.map((reservation) => (
          <View>
            <ImageBackground
              style={{ height: 150, marginHorizontal: 10, marginVertical: 7 }}
              borderRadius={10}
              source={{
                uri: "https://media.istockphoto.com/id/977442008/photo/violet-and-pink-smoke-on-abstract-black-background.jpg?s=170667a&w=0&k=20&c=hVh0An9hYitIiBmLM85uZw__NbjxkDW4VeBFZWWkiHM=",
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0, 0.4)",
                  borderRadius: 11,
                  paddingBottom: 150,
                }}
              />
              <View
                style={{ textAlign: "center", top: -130 }}
                key={reservation.id}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Day : {reservation.Day.slice(0, 10)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleUpdateReservation(reservation.id);
                    addPoints(reservation.playerFireId);
                    setstyle(true);
                  }}
                  disabled={reservation.Reserved}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: "lightgreen",
                      top: 0,
                      left: 10,
                    }}
                  >
                    <Icon size={30} name="check"></Icon>
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "white",
                    top: -120,
                  }}
                >
                  Time : {reservation.Hour}
                </Text>
                <TouchableOpacity
                  style={{
                    top: -190,
                    right: -320,
                  }}
                  onPress={() => handleDeleteReservation(reservation.id)}
                >
                  <Text style={{ fontSize: 13, color: "red" }}>
                    <Icon2 size={30} name="delete"></Icon2>
                  </Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C147E9",
  },
  headerButton: {
    top: -70,
    flex: 1,
    alignItems: "center",
    marginVertical: 30,
    left: -160,
  },
  headerButtonText: {
    fontSize: 20,
    color: "white",
  },
  divider: {
    top: -70,
    borderLeftWidth: 1,
    borderLeftColor: "#C147E9",
    height: "70%",
    marginHorizontal: 10,

    left: -165,
  },
  container: {
    top: 50,
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: 1000,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
    left: 170,
    position: "absolute",
  },

  title: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  reservationContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  reservationText: {
    marginBottom: 5,
  },
  confirmButton: {
    marginTop: 5,
    backgroundColor: "#5cb85c",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: "#d9534f",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default Reservation;
