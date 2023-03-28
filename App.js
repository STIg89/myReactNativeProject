import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

import { RegistrationScreen } from "./src/Screens/AuthScreens/RegistrationScreen";
import { LoginScreen } from "./src/Screens/AuthScreens/LoginScreen";
import { Home } from "./src/Screens/MainScreens/Home";

export default function App() {
  return (
    <RootSiblingParent>
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
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
