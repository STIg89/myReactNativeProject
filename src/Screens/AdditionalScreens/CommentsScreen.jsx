import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/auth/authSelectors";

import { AntDesign } from "@expo/vector-icons";
import { mainStyles } from "../MainScreens/MainStyles";
import { Header } from "../../components/Header/Header";

const { photoWrap, screenWrap } = mainStyles;

export const CommentsScreen = ({ route }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userId } = useSelector(selectUserProfile);
  const { photoUrl, postId } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    await createComment();
    setComment("");
  };

  const createComment = async () => {
    const commentData = { userId: userId, comment: comment, date: Date.now() };
    const postRef = doc(db, "posts", `${postId}`);
    await updateDoc(postRef, { comments: [...allComments, commentData] });
  };

  const getComments = async () => {
    onSnapshot(doc(db, "posts", `${postId}`), (doc) => {
      setAllComments(doc.data().comments);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
        <View style={screenWrap}>
          <Header title="Комментарии" />
          <ScrollView>
            <View
              style={{
                backgroundColor: "#FFF",
                paddingHorizontal: "4%",
                paddingVertical: "7%",
                display: "flex",
              }}
            >
              <View style={{ marginBottom: 32 }}>
                <Image source={{ uri: photoUrl }} style={photoWrap} />
              </View>
              {allComments.map((item) => {
                return (
                  <View
                    key={item.date}
                    style={{
                      display: "flex",
                      flexDirection:
                        item.userId === userId ? "row" : "row-reverse",
                      justifyContent: "space-between",
                      flexWrap: "nowrap",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        padding: 16,
                        backgroundColor: "#F6F6F6",
                        borderRadius: 6,
                        marginBottom: 16,
                        flexGrow: 1,
                        maxWidth: "88%",
                      }}
                    >
                      <Text>{item.comment}</Text>
                    </View>
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: "#F6F6F6",
                      }}
                    >
                      <Image />
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              bottom: 16,
              width: "100%",
            }}
          >
            <TextInput
              placeholder="Комментировать..."
              onFocus={() => setOnFocus(true)}
              onEndEditing={() => setOnFocus(false)}
              value={comment}
              onChangeText={setComment}
              style={{
                borderWidth: 1,
                borderColor: onFocus ? "#FF6C00" : "#BDBDBD",
                fontSize: 16,
                fontWeight: "500",
                backgroundColor: "#F6F6F6",
                height: 50,
                borderRadius: 25,
                width: "92%",
                paddingHorizontal: 16,
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                right: "8%",
                top: 8,
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "#FF6C00",
              }}
              onPress={handleSubmit}
            >
              <AntDesign name="arrowup" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
