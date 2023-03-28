import React, { useState } from "react";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { Header } from "../../Components/Header/Header";
import { SubmitBtn } from "../../Components/SubmitBtn/SubmitBtn";
import Toast from "react-native-root-toast";
import { mainStyles } from "./MainStyles";
// import { useNavigation } from "@react-navigation/native";

const {
  screenWrap,
  main,
  photoWrap,
  cameraBtn,
  photoText,
  createInput,
  createInputIcon,
  createLocationWrap,
  trashWrap,
  trashBtn,
} = mainStyles;

const initialFormState = {
  name: "",
  location: "",
};

const initialFocusState = {
  name: false,
  location: false,
};

export const CreatePostScreen = () => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  // const navigation = useNavigation();

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  const handleFocus = (inputName) => {
    setIsKeyboardShow(true),
      setOnFocus((prevState) => ({ ...prevState, [inputName]: true }));
  };

  const outFocus = (inputName) => {
    setOnFocus((prevState) => ({ ...prevState, [inputName]: false }));
    setIsKeyboardShow(false);
  };

  const handleSubmit = () => {
    const { name, location } = formState;
    if (!name || !location) {
      Toast.show("Please, fill out the form completely");
      return;
    }
    // navigation.navigate("Home");
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
        <View style={screenWrap}>
          <Header title="Создать публикацию" />
          <ScrollView>
            <View style={main}>
              <View>
                <View style={photoWrap}>
                  <Image />
                  <TouchableOpacity style={cameraBtn}>
                    <AntDesign name="camera" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                </View>
                <Text style={photoText}>Загрузите фото</Text>
              </View>
              <View style={{ gap: 16 }}>
                <TextInput
                  style={{
                    ...createInput,
                    borderBottomColor: onFocus.name ? "#FF6C00" : "#BDBDBD",
                  }}
                  placeholder="Название..."
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => handleFocus("name")}
                  onEndEditing={() => outFocus("name")}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      name: value,
                    }))
                  }
                />
                <View style={createLocationWrap}>
                  <TextInput
                    style={{
                      ...createInput,
                      paddingLeft: 28,
                      borderBottomColor: onFocus.location
                        ? "#FF6C00"
                        : "#BDBDBD",
                    }}
                    placeholder="Местность..."
                    placeholderTextColor={"#BDBDBD"}
                    onFocus={() => handleFocus("location")}
                    onEndEditing={() => outFocus("location")}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        location: value,
                      }))
                    }
                  />
                  <EvilIcons
                    style={createInputIcon}
                    name="location"
                    size={25}
                    color="#BDBDBD"
                  />
                </View>
              </View>
              {!isKeyboardShow && (
                <>
                  <SubmitBtn text="Опубликовать" handleSubmit={handleSubmit} />
                </>
              )}
            </View>
          </ScrollView>
          <View style={trashWrap}>
            {!isKeyboardShow && (
              <TouchableOpacity style={trashBtn}>
                <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
