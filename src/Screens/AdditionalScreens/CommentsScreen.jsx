import React, { useState } from "react";
import {
  Image,
  View,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { mainStyles } from "../MainScreens/MainStyles";
import { Header } from "../../components/Header/Header";

const {
  main,
  userAva,
  userInfo,
  userData,
  userLogin,
  userMail,
  photoWrap,
  photoDetailsEl,
  screenWrap,
} = mainStyles;

export const CommentsScreen = ({ route }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(false);
  const [comment, setComment] = useState("");
  console.log(comment);
  const { photoUrl } = route.params;

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsKeyboardShow(true), setOnFocus(true);
  };

  const outFocus = () => {
    setOnFocus(false);
    setIsKeyboardShow(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
              onFocus={() => handleFocus()}
              onEndEditing={() => outFocus()}
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
                right: 8,
                width: 34,
                height: 34,
                borderRadius: 17,
                backgroundColor: "#FF6C00",
              }}
            >
              <AntDesign name="arrowup" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
