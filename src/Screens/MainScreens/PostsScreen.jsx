import React, { useEffect, useState } from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Header } from "../../components/Header/Header";
import { mainStyles } from "./MainStyles";
import { db } from "../../firebase/config";
import { doc, onSnapshot, collection } from "firebase/firestore";

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
  // console.log(posts);

  const getPosts = () => {
    onSnapshot(collection(db, "posts"), (collection) => {
      setPosts(collection.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 32 }}>
              <Image source={{ uri: item.photoUrl }} style={photoWrap} />
              <Text
                style={{ fontSize: 16, marginVertical: 8, fontWeight: "500" }}
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
                  <Text
                    style={{ fontSize: 16, color: "#BDBDBD", marginLeft: 6 }}
                  >
                    0
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Map", { item });
                  }}
                  style={photoDetailsEl}
                >
                  <EvilIcons name="location" size={28} color="#BDBDBD" />
                  <Text style={{ fontSize: 16, marginLeft: 4 }}>
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
