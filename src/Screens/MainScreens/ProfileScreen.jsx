import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { onSnapshot, collection, where, query } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
import { db } from "../../firebase/config";
import { selectUserProfile } from "../../redux/auth/authSelectors";
import { mainStyles } from "./MainStyles";
import { Post } from "../../components/Post/Post";
import { authLogoutUser } from "../../redux/auth/authOperations";

const { background, avatarWrap, title, profileWrapper } = mainStyles;

export const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, userAvatar, userId } = useSelector(selectUserProfile);
  const dispatch = useDispatch();

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
        <View
          style={{
            ...profileWrapper,
            minHeight:
              (Platform.OS == "ios" && "80%") ||
              (Platform.OS == "android" && posts.length < 3 && 800),
          }}
        >
          <View style={avatarWrap}>
            <Image
              source={{ uri: userAvatar }}
              style={{ ...avatarWrap, top: 0 }}
            />
          </View>
          <TouchableOpacity
            style={{ position: "absolute", right: 16, top: 22 }}
            onPress={() => dispatch(authLogoutUser())}
          >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={title}>{userName}</Text>
          {posts.map((item) => {
            return (
              <Post
                key={item.id}
                item={item}
                navigateFrom="Profile"
                navigation={navigation}
              />
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
