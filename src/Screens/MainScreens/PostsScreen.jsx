import React, { useEffect, useState } from "react";
import { Text, View, Image, FlatList } from "react-native";
import { Header } from "../../components/Header/Header";
import { mainStyles } from "./MainStyles";
import { db } from "../../firebase/config";
import { onSnapshot, collection } from "firebase/firestore";
import { Post } from "../../components/Post/Post";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/auth/authSelectors";

const { main, userAva, userInfo, userData, userLogin, userMail } = mainStyles;

export const PostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, userEmail, userAvatar } = useSelector(selectUserProfile);

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
            <Post item={item} navigateFrom="Posts" navigation={navigation} />
          )}
        />
      </View>
    </>
  );
};
