import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import { PostsScreen } from "./PostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { CreatePostScreen } from "./CreatePostScreen";

const MainTab = createBottomTabNavigator();

export const Home = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121",
        tabBarStyle: {
          paddingHorizontal: 25,
          paddingTop: 10,
          paddingBottom: 25,
          height: 70,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="appstore-o" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="plus" color={color} size={size} />
          ),
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};
