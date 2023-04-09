import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/auth/authSelectors";
import { AntDesign } from "@expo/vector-icons";
import { additionalStyles } from "./AdditionalStyles";
import { Header } from "../../components/Header/Header";
import { format } from "date-fns";

const {
  photoWrap,
  screenWrap,
  comWrap,
  comContainer,
  com,
  dateText,
  commentAva,
  inputWrap,
  inputBtn,
  input,
} = additionalStyles;

export const CommentsScreen = ({ route }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userId, userAvatar } = useSelector(selectUserProfile);
  const { photoUrl, postId, navigateFrom } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    await createComment();
    setComment("");
  };

  const createComment = async () => {
    const commentData = {
      userId: userId,
      comment: comment,
      date: Date.now(),
      userAvatar: userAvatar,
    };
    const postRef = doc(db, "posts", `${postId}`);
    await updateDoc(postRef, { comments: [...allComments, commentData] });
  };

  const getComments = async () => {
    onSnapshot(doc(db, "posts", `${postId}`), (doc) => {
      setAllComments(doc.data().comments);
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
      <View style={screenWrap}>
        <Header title="Комментарии" navigateFrom={navigateFrom} />
        <ScrollView>
          <View style={comWrap}>
            <View style={{ marginBottom: 32 }}>
              <Image source={{ uri: photoUrl }} style={photoWrap} />
            </View>
            {allComments.map((item) => {
              return (
                <View
                  key={item.date}
                  style={{
                    ...comContainer,
                    flexDirection:
                      item.userId === userId ? "row" : "row-reverse",
                  }}
                >
                  <View style={com}>
                    <Text style={{ fontSize: 13 }}>{item.comment}</Text>
                    <Text style={dateText}>{format(item.date, "PPpp")}</Text>
                  </View>
                  <Image source={{ uri: item.userAvatar }} style={commentAva} />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={inputWrap}>
          <TextInput
            placeholder="Комментировать..."
            onFocus={() => setOnFocus(true)}
            onEndEditing={() => setOnFocus(false)}
            value={comment}
            onChangeText={setComment}
            style={{
              ...input,
              borderColor: onFocus ? "#FF6C00" : "#BDBDBD",
            }}
          />
          <TouchableOpacity style={inputBtn} onPress={handleSubmit}>
            <AntDesign name="arrowup" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
