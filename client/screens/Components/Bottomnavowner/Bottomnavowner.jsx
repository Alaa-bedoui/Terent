import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomNavigationBarowner = ({}) => {
  const [activeTab, setActiveTab] = useState("calendar");
  const [data, setdata] = useState([]);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [photo, setphoto] = useState("");
  const [fireid, setfireid] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();

  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    navigation.navigate(tabName);
  };

  _retrieveData = async () => {
    try {
      const ownerfirstname = await AsyncStorage.getItem("firstname");
      setfirstname(ownerfirstname);
      console.log("ahla :", ownerfirstname);
      const ownerlastname = await AsyncStorage.getItem("lastname");
      setlastname(ownerlastname);
      console.log(("ay", ownerlastname));
      const img = await AsyncStorage.getItem("photo");
      setphoto(img);
      console.log("aaaa", img);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.bottomNavigationBar}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() =>
          navigation.navigate("homeowner", {
            firstname: firstname,
            lastname: lastname,
            photo: photo,
            fireid: fireid,
          })
        }
      >
        <Ionicons
          name={activeTab === "Home" ? "homeowner" : "home-outline"}
          size={30}
          color={activeTab === "homeowner" ? "#C147E9" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() =>
          handleTabPress("HandleOwnerTerrains", { fireid: fireid })
        }
      >
        <Ionicons
          name={activeTab === "calendar-outline" ? "search" : "calendar"}
          size={30}
          color={activeTab === "Search" ? "#C147E9" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          handleTabPress("profileowner");
          navigation.navigate("ownerprofile", {
            firstname: firstname,
            lastname: lastname,
            photo: photo,
            fireid: fireid,
          });
        }}
      >
        <Ionicons
          name={activeTab === "profileowner" ? "person" : "person-outline"}
          size={30}
          color={activeTab === "profileowner" ? "#C147E9" : "lightgrey"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => {
          signOut(auth)
            .then(() => {})
            .catch((error) => {
              console.error(error);
            });
          navigation.navigate("ownerlogin");
        }}
      >
        <Ionicons
          name={activeTab === "log-out-outline" ? "logout" : "log-out-sharp"}
          size={30}
          color={activeTab === "logout" ? "#C147E9" : "lightgrey"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    borderTopWidth: 1,
    borderTopColor: "#C147E9",
    borderTopStartRadius: 10,
    elevation: 20,
    borderTopEndRadius: 10,
    top: -10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomNavigationBarowner;
