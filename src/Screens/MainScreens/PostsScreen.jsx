import React, { useEffect, useState } from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, Image, FlatList } from "react-native";
import { Header } from "../../components/Header/Header";
import { mainStyles } from "./MainStyles";
import { db } from "../../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/auth/authSelectors";

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

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, userEmail, userAvatar } = useSelector(selectUserProfile);

  // console.log("posts:", posts);

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
            <Image source={{ uri: userAvatar }} style={userAva} />
          </View>
          <View style={userInfo}>
            <Text style={userLogin}>{userName}</Text>
            <Text style={userMail}>{userEmail}</Text>
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
                    navigation.navigate("Comments", {
                      photoUrl: item.photoUrl,
                      postId: item.id,
                    });
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
                    navigation.navigate("Map", {
                      latitude: item.latitude,
                      longitude: item.longitude,
                    });
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
