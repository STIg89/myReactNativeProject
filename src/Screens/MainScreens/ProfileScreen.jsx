import React from "react";
import { Text, View, ImageBackground, Image, ScrollView } from "react-native";
import { mainStyles } from "./MainStyles";
const { background, avatarWrap, title, profileWrapper } = mainStyles;

export const ProfileScreen = () => {
  return (
    <ImageBackground
      style={background}
      source={require("../../images/photoBG.jpeg")}
    >
      <ScrollView>
        <View style={profileWrapper}>
          <View style={avatarWrap}>
            <Image />
          </View>
          <Text style={title}>Логин</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
