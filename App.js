import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RegistrationScreen } from "./src/Screens/AuthScreens/RegistrationScreen";
import { LoginScreen } from "./src/Screens/AuthScreens/LoginScreen";
import { Home } from "./src/Screens/MainScreens/Home";
import { MapScreen } from "./src/Screens/AdditionalScreens/MapScreen";
import { CommentsScreen } from "./src/Screens/AdditionalScreens/CommentsScreen";
import { store } from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Registration"
              component={RegistrationScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Map"
              component={MapScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Comments"
              component={CommentsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
    </Provider>
  );
}
