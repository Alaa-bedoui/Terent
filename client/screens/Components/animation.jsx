import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";

export default function SimpleLottie() {
  return (
    <View>
      <LottieView
        source={require("../../assets/71153-load-balls.json")}
        style={styles.animation}
        autoPlay={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 400,
    height: 400,
    top: -80,
    alignSelf: "center",
  },
});
