import React, { useEffect, useState } from "react";
import { Text, View, ImageBackground, Image, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { selectUserProfile } from "../../redux/auth/authSelectors";
import { mainStyles } from "./MainStyles";
import { Post } from "../../components/Post/Post";
const { background, avatarWrap, title, profileWrapper } = mainStyles;

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, userAvatar, userId } = useSelector(selectUserProfile);

  const getPosts = () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <ImageBackground
      style={background}
      source={require("../../images/photoBG.jpeg")}
    >
      <ScrollView>
        <View style={profileWrapper}>
          <View style={avatarWrap}>
            <Image
              source={{ uri: userAvatar }}
              style={{ ...avatarWrap, top: 0 }}
            />
          </View>
          <Text style={title}>{userName}</Text>
          {posts.map((item) => {
            return <Post key={item.id} item={item} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
