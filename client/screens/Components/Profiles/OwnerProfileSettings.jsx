import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth, app } from "../../../config";
import axios from "axios";
import { baseUrl } from "../../../urlConfig/urlConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateEmail, updatePassword } from "firebase/auth";
const OwnerprofileSettings = ({ navigation, route }) => {
  const [data, setData] = useState(route.params.data);
  const [FirstName, setFirstName] = useState(data.FirstName);
  const [LastName, setLastName] = useState(data.LastName);
  const [Email, setEmail] = useState(data.Email);
  const [PhoneNumber, setPhoneNumber] = useState(data.PhoneNumber);
  const [ProfileImage, setProfileImage] = useState(data.ProfileImage);
  const [Password, setPassword] = useState(null);
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const updateEmailFirebase = () => {
    updateEmail(auth.currentUser, Email)
      .then((res) => console.log("updatedEmail"))
      .catch((err) => console.log(err));
  };
  const updatePasswordFirebase = () => {
    updatePassword(auth.currentUser, Password)
      .then(() => console.log("UpdatedPassword"))
      .catch((err) => console.log(err));
  };
  const uploadProfileImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const storage = getStorage(app);
    const storageRef = ref(storage, `terrent_Profile_images/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, blob, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProfileImage(downloadURL);
        });
      }
    );
  };
  const pickProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      uploadProfileImage(result.uri);
    }
  };
  const handleSubmit = () => {
    if (Password && Password === ConfirmPassword) {
      updateEmailFirebase();
      const body = {
        Fireid: data.Fireid,
        FirstName,
        LastName,
        Email,
        PhoneNumber,
        ProfileImage,
      };
      axios
        .put(`${baseUrl}owner/updateOwner`, body)
        .then((res) => alert("Updated"));
      updatePasswordFirebase();
    } else {
      alert("Wrong Confirm Password");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: ProfileImage }} />
        <TouchableOpacity
          style={styles.changeAvatarButton}
          onPress={() => {
            pickProfileImage();
          }}
        >
          <Ionicons name="camera-outline" color={"violet"} size={50}></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your First Name"
          value={FirstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Last Name"
          value={LastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={Email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Phone Number </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          placeholder="Enter Your Phone Number"
          value={PhoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter New Password"
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Confirm New Password"
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
    top: -40,
  },
  label: {
    color: "lightgrey",
    marginTop: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderColor: "#ccc",
    color: "#C147E9",
    borderBottomWidth: 1,
    borderBottomColor: "#C147E9",
    padding: 10,
    fontSize: 15,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "transparent",
    borderColor: "#C147E9",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "lightgrey",
    fontSize: 15,
  },
  avatarContainer: {
    marginTop: -70,
    alignItems: "center",
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    top: 40,
  },
  changeAvatarButton: {
    top: -30,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 15,
  },
});
export default OwnerprofileSettings;
