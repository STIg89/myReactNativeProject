import React, { useEffect, useState } from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";
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
  Image,
  FlatList,
} from "react-native";
import { Header } from "../../Components/Header/Header";
import { mainStyles } from "./MainStyles";

const {
  main,
  userAva,
  userInfo,
  userData,
  userLogin,
  userMail,
  photoWrap,
  photoDetailsEl,
} = mainStyles;

export const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

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
        <FlatList
          data={posts}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 32 }}>
              <Image source={{ uri: item.photo }} style={photoWrap} />
              <Text
                style={{ fontSize: 16, marginVertical: 8, fontWeight: 500 }}
              >
                {item.name}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Comments");
                  }}
                  style={photoDetailsEl}
                >
                  <Feather name="message-square" size={24} color="#BDBDBD" />
                  <Text style={{ fontSize: 16, color: "#BDBDBD" }}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Map", { item });
                  }}
                  style={photoDetailsEl}
                >
                  <EvilIcons name="location" size={28} color="#BDBDBD" />
                  <Text style={{ fontSize: 16 }}>
                    {item.locationDescription}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </>
  );
};
