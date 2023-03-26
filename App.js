import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { RegistrationScreen } from "./Screens/AuthScreens/RegistrationScreen";
import { LoginScreen } from "./Screens/AuthScreens/LoginScreen";

const AuthStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
