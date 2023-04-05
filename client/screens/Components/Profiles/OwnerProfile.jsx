import React, { useState } from "react";
import axios from "axios";
import { Avatar, Card } from "react-native-paper";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import { baseUrl } from "../../../urlConfig/urlConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularProgress from "react-native-circular-progress-indicator";
import { Popup } from "popup-ui";
import BottomNavigationBar from "../Bottomnav/BottomNav";
import Icon from "react-native-vector-icons/Feather";
import { auth } from "../../../config";
import { signOut } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import BottomNavigationBarowner from "../Bottomnavowner/Bottomnavowner";

const OwnerProfile = ({ navigation, route }) => {
  const [dataowner, setdataowner] = useState([]);
  const setData = () => {
    setdataowner(route.params.dataowner);
  };
  useEffect(() => {
    setData();
  }, []);

  const SignOut = () => {
    signOut(auth).then(() => {
      navigation.navigate("ownerlogin");
      ToastAndroid.show(
        "Good Bye See You Next Time 👋",

        ToastAndroid.LONG
      );
    });
  };
  return (
    <View style={{ backgroundColor: "black", height: "100%" }}>
      <ImageBackground
        source={{
          uri: "https://wallpaper.dog/large/20546977.jpg",
        }}
        style={{ height: "100%" }}
      >
        <View>
          {dataowner ? (
            <>
              <Avatar.Image
                style={{
                  alignSelf: "center",

                  backgroundColor: "transparent",
                  top: 10,
                }}
                source={{
                  uri: "https://scontent.ftun4-2.fna.fbcdn.net/v/t1.18169-9/12549068_1249597438390307_4609557485923432098_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=lQpcjCkSdoIAX-HLdeG&_nc_oc=AQkvBqxtBjLBJK8sHI3QSgbsYMO2kLPAvbUIxpE-j8bDTbom9conZzNoJ1Uh7N7fIu4&_nc_ht=scontent.ftun4-2.fna&oh=00_AfDkinctOb1wTBR80LO2_najsD1X2zUuiu5VGQnm8iIduw&oe=643BE44C",
                }}
                size={230}
              />
            </>
          ) : (
            <Avatar.Image />
          )}
        </View>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            top: 10,
            fontStyle: "italic",
            fontWeight: "600",
            letterSpacing: 2,
            textTransform: "capitalize",
            backgroundColor: "rgba(0,0,0,0.5)",
            borderRadius: 40,
          }}
        >
          Atef Mabrouki
        </Text>
        <Card.Content>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate("wishlist");
          // }}
          >
            <View
              style={{
                borderRadius: 100,
                width: 180,
                height: 100,
                top: -230,
                left: -90,
                position: "absolute",
              }}
            ></View>
            <Text
              style={{
                textAlign: "center",
                top: 20,
                right: 0,
                color: "red",
              }}
            ></Text>
            <Text
              style={{ color: "white", left: 163, top: 20, fontWeight: "600" }}
            ></Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ownerprofilesettings", { data: dataowner });
            }}
            style={{ top: 225, right: -190 }}
          >
            <View
              style={{
                borderRadius: 100,
                left: -30,

                top: -248,
                position: "absolute",
              }}
            >
              <Text
                style={{
                  left: 0,

                  top: 70,
                  color: "white",
                  fontSize: 15,
                  fontWeight: "400",
                }}
              >
                Settings
              </Text>
              <Ionicons
                name="settings-outline"
                size={50}
                color={"#C147E9"}
              ></Ionicons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ top: 85 }}
            // onPress={() => {
            //   navigation.navigate("notifications");
            // }}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 100,
                top: 120,
                width: 180,
                height: 60,
                backgroundColor: "rgba(0,0,0, 0.4)",
                borderColor: "#C147E9",
                borderWidth: 4,

                left: 0,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  top: 15,
                  color: "white",
                  fontWeight: "500",
                  zIndex: 1,
                }}
              >
                Events
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ top: 85 }}
            // onPress={() => {
            //   navigation.navigate("notifications");
            // }}
          >
            <View
              style={{
                position: "absolute",
                borderRadius: 100,

                width: 180,
                height: 60,
                backgroundColor: "rgba(0,0,0, 0.4)",
                borderColor: "#C147E9",
                borderWidth: 4,
                top: 120,
                left: 190,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  top: 15,
                  color: "white",
                  zIndex: 1,
                  fontWeight: "500",
                }}
              >
                Notifications
              </Text>
            </View>
          </TouchableOpacity>
        </Card.Content>

        {/* <View style={{ bottom: 430, left: 40, position: "absolute" }}>
          <TouchableOpacity
            onPress={() => {
              SignOut();
            }}
          >
            <Icon name="log-out" size={50} color={"#C147E9"}></Icon>
            <Text style={{ color: "white", fontSize: 15, fontWeight: "400" }}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>

      <View
        style={{
          position: "absolute",
          bottom: 10,
          flex: 1,
          alignSelf: "stretch",
          right: 0,
          left: 0,
        }}
      >
        <BottomNavigationBarowner />
      </View>
    </View>
  );
};

export default OwnerProfile;
