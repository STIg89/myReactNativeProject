import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Feather, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import { postStyles } from "./PostStyles";
const { photoWrap, photoDetailsEl, wrap, nameText, btnWrap, comText, locText } =
  postStyles;

export const Post = ({ item, navigation }) => {
  return (
    <View style={wrap}>
      <Image source={{ uri: item.photoUrl }} style={photoWrap} />
      <Text style={nameText}>{item.name}</Text>
      <View style={btnWrap}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Comments", {
              photoUrl: item.photoUrl,
              postId: item.id,
            });
          }}
          style={photoDetailsEl}
        >
          {item.comments.length === 0 ? (
            <Feather name="message-square" size={24} color="#BDBDBD" />
          ) : (
            <MaterialIcons name="messenger" size={24} color="#FF6C00" />
          )}
          <Text
            style={{
              ...comText,
              color: item.comments.length === 0 ? "#BDBDBD" : "#212121",
            }}
          >
            {item.comments.length}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Map", {
              latitude: item.latitude,
              longitude: item.longitude,
            });
          }}
          style={photoDetailsEl}
        >
          <EvilIcons name="location" size={28} color="#BDBDBD" />
          <Text style={locText}>{item.locationDescription}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
