import React, { useState } from "react";
import axios from "axios";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { baseUrl } from "../urlConfig/urlConfig";
import BottomNavigationBarowner from "../screens/Components/Bottomnavowner/Bottomnavowner";
import { Keyboard } from "react-native";
import { ToastAndroid } from "react-native";
const Confirmation = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [lat, setlat] = useState(route.params.lat);
  const [long, setLong] = useState(route.params.long);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState("");
  const [capacity, setCapacity] = useState("");
  const [availability, setAvailability] = useState(false);
  const handleAddTerrain = async () => {
    try {
      const newTerrain = {
        Name: name,
        Price: price,
        Description: description,
        lat: lat,
        long: long,
        Region: region,
        Category: category,
        Images: images,
        Capacity: capacity,
        Availability: availability,
      };
      const response = await axios.post(
        `${baseUrl}api/terrain/add/dFaAF4CSP1Rmkb04vSdgiDGR9Kq1`,
        newTerrain
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const showToast = () => {
    ToastAndroid.show(
      "Your Terrain was Added successfully",

      ToastAndroid.LONG
    );
  };

  return (
    <View style={{ backgroundColor: "black", paddingBottom: 400 }}>
      <View style={styles.container}>
        <Text style={{ color: "#C147E9", textAlign: "center", top: -20 }}>
          Your new Terrain informations
        </Text>
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 0,
            paddingVertical: 20,
            color: "lightgrey",
            width: "80%",
            alignSelf: "center",
          }}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 0,
            width: "80%",
            alignSelf: "center",
            paddingVertical: 20,
          }}
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 0,
            paddingVertical: 20,
            width: "80%",
            alignSelf: "center",
          }}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 0,
            paddingVertical: 20,
            width: "80%",
            alignSelf: "center",
          }}
          placeholder="Region"
          value={region}
          onChangeText={setRegion}
        />
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 0,
            paddingVertical: 20,
            width: "80%",
            alignSelf: "center",
          }}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 0,

            paddingVertical: 20,
            width: "80%",
            alignSelf: "center",
          }}
          placeholder="Images"
          value={images}
          onChangeText={setImages}
        />
        <TextInput
          placeholderTextColor={"lightgrey"}
          style={{
            borderBottomWidth: 0.3,
            borderBottomColor: "#C147E9",
            marginVertical: 20,
            paddingVertical: 10,
            marginBottom: 40,
            width: "80%",
            alignSelf: "center",
          }}
          placeholder="Capacity"
          value={capacity}
          onChangeText={setCapacity}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            borderRadius: 50,
          }}
          onPress={() => {
            Keyboard.dismiss(), showToast();

            handleAddTerrain, navigation.navigate("homeowner");
          }}
        >
          <Text style={{ color: "#C147E9", textAlign: "center" }}>
            Add a Terrain
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ top: 210 }}>
        <BottomNavigationBarowner />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    top: "25%",
    paddingBottom: 100,
    width: "80%",
    left: 30,
    backgroundColor: "black",
  },
  input: {
    marginTop: 70,
    marginBottom: 50,
    height: 40,
    borderColor: "#C147E9",
    borderWidth: 2,
    marginVertical: 30,
    paddingHorizontal: 10,
  },
});
export default Confirmation;
