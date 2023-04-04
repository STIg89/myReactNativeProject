import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import { RegistrationScreen } from "../Screens/AuthScreens/RegistrationScreen";
import { LoginScreen } from "../Screens/AuthScreens/LoginScreen";
import { Home } from "../Screens/MainScreens/Home";
import { MapScreen } from "../Screens/AdditionalScreens/MapScreen";
import { CommentsScreen } from "../Screens/AdditionalScreens/CommentsScreen";
import { updateAuthStateUser } from "../redux/auth/authOperations";
import { selectUserProfile } from "../redux/auth/authSelectors";

const Stack = createNativeStackNavigator();

const Main = () => {
  const { authorized } = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAuthStateUser());
  }, []);

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator>
          {!authorized && (
            <>
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
            </>
          )}
          {authorized && (
            <>
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default Main;
