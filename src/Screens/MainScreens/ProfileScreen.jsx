import React from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import { mainStyles } from "./MainStyles";
const { background, avatarWrap, title, profileWrapper } = mainStyles;

export const ProfileScreen = () => {
  return (
    <ImageBackground
      style={background}
      source={require("../../images/photoBG.jpeg")}
    >
      <View style={profileWrapper}>
        <View style={avatarWrap}>
          <Image />
        </View>
        <Text style={title}>Логин</Text>
      </View>
    </ImageBackground>
  );
};
