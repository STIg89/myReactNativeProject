import React from "react";
import { Image } from "react-native";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Header } from "../../Components/Header/Header";
import { mainStyles } from "./MainStyles";

const { main, userAva, userInfo, userData, userLogin, userMail } = mainStyles;

export const PostsScreen = () => {
  return (
    <>
      <Header title="Публикации" />
      <View style={main}>
        <View style={userData}>
          <View style={userAva}>
            <Image />
          </View>
          <View style={userInfo}>
            <Text style={userLogin}>Login Loginov</Text>
            <Text style={userMail}>exs@mail.com</Text>
          </View>
        </View>
      </View>
    </>
  );
};
