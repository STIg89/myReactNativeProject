import React from "react";
import { StyleSheet, View } from "react-native";
import { RegistrationScreen } from "./Screens/AuthScreens/RegistrationScreen";
import { LoginScreen } from "./Screens/AuthScreens/LoginScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <RegistrationScreen />
      {/* <LoginScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
