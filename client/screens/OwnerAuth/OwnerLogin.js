import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { Button, Icon } from "native-base";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseUrl } from "../../urlConfig/urlConfig";
import { auth } from "../../config.js";
import { Image } from "react-native";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownerData, setOwnerData] = useState([]);
  const navigation = useNavigation();
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("firstname", ownerData.FirstName);
      AsyncStorage.setItem("lastname", ownerData.LastName);
      AsyncStorage.setItem("photo", ownerData.ProfileImage);
      AsyncStorage.setItem("fireid", ownerData.Fireid);
      console.log("fireid ", ownerData.Fireid);
    } catch (error) {
      console.log(error);
    }
  };
  //getting owner data by email to verify that the account is authorized to access or not
  const signInOwner = async () => {
    // console.log(`${baseUrl}owner/signInOwner/Authorization/${email}`, "url");
    // axios
    //   .get(`${baseUrl}owner/signInOwner/Authorization/${email}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    try {
      // get data from axios
      const axiosResponse = await axios.get(
        `${baseUrl}owner/signInOwner/Authorization/${email}`
      );

      console.log(axiosResponse.data.AccountConfirmation);

      const data = axiosResponse.data;
      console.log(data);
      setOwnerData(data);
      console.log(axiosResponse.data.Fireid);
      _storeData(ownerData);
      console.log("aaaa", ownerData);

      if (data.AccountConfirmation) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("homeowner");
      } else {
        showToast();
        Keyboard.dismiss();
      }
    } catch (error) {
      console.log(error);
      showToastmail();
      Keyboard.dismiss();
    }
  };
  const showToast = () => {
    ToastAndroid.show(
      "You are Not authorized yet",

      ToastAndroid.SHORT
    );
  };
  const showToastmail = () => {
    ToastAndroid.show(
      "Wrong Email or Password",

      ToastAndroid.SHORT
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <Image
          style={{ width: 150, height: 150, top: -120, alignSelf: "center" }}
          source={require("../../assets/logoowner.png")}
        ></Image>
        <Text
          style={{
            color: "#C147E9",
            fontSize: 20,
            top: -70,

            textAlign: "center",
          }}
        >
          Please Login as An Owner
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          style={styles.input}
          placeholderTextColor="lightgrey"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="lightgrey"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              signInOwner();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("createowneraccount");
            }}
            style={styles.buttonOutLine}
          >
            <Text style={styles.buttonOutLineText}>
              Don't have an Account ? Register Here .
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "85%",
    top: 70,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    marginBottom: 20,
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 0.5,

    borderRadius: 5,
    alignItems: "center",
    bottom: -40,
  },
  buttonText: {
    color: "#C147E9",
    fontSize: 15,
    top: -30,
  },
  buttonOutLine: {
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    bottom: -70,
  },
  buttonOutLineText: {
    color: "darkgrey",
    fontSize: 10,
    top: -70,
  },
});

export default OwnerLogin;
