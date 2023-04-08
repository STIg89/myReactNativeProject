import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { authStyles } from "./AuthStyles";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";
import Toast from "react-native-root-toast";
import { authRegistrationUser } from "../../redux/auth/authOperations";

const {
  avatarWrap,
  title,
  input,
  passwordWrap,
  showBtn,
  showBtnText,
  link,
  linkText,
  image,
  regWrapper,
  addAvaBtn,
} = authStyles;

const initialFormState = {
  userAvatar: null,
  userName: "",
  userEmail: "",
  userPassword: "",
};

const initialFocusState = {
  userName: false,
  userEmail: false,
  userPassword: false,
};

export const RegistrationScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (photo) {
        await uploadPhoto();
      }
    })();
  }, [photo]);

  const handleAva = () => {
    setIsCameraActive(true);
  };

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    setIsCameraActive(false);
  };

  const uploadPhoto = async () => {
    const resp = await fetch(photo);
    const file = await resp.blob();
    const photoId = Date.now().toString();
    const storageRef = ref(storage, `avatars/${photoId}`);
    const uploadPhoto = await uploadBytesResumable(storageRef, file);
    const photoRef = await getDownloadURL(uploadPhoto.ref);
    setFormState((prevState) => ({ ...prevState, userAvatar: photoRef }));
  };

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
    const { userEmail, userPassword, userName, userAvatar } = formState;
    if (!userEmail || !userPassword || !userAvatar || !userName) {
      Toast.show("Please, fill out the form completely");
      return;
    }
    dispatch(authRegistrationUser(formState));
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={image}
        source={require("../../images/photoBG.jpeg")}
      >
        <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              onPress={keyboardHide}
              style={{
                ...regWrapper,
                paddingBottom: isKeyboardShow ? 32 : 0,
                minHeight: isKeyboardShow ? 0 : "80%",
              }}
            >
              {!photo && (
                <TouchableOpacity
                  style={avatarWrap}
                  onPress={() => handleAva()}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="#FF6C00"
                    style={addAvaBtn}
                  />
                </TouchableOpacity>
              )}
              {photo && (
                <TouchableOpacity
                  style={avatarWrap}
                  onPress={() => handleAva()}
                >
                  <Image
                    source={{ uri: photo }}
                    style={{ ...avatarWrap, top: 0 }}
                  />
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#BDBDBD"
                    style={addAvaBtn}
                  />
                </TouchableOpacity>
              )}
              <Text style={title}>Регистрация</Text>
              <TextInput
                style={{
                  ...input,
                  borderColor: onFocus.userName ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                onFocus={() => handleFocus("userName")}
                onEndEditing={() => outFocus("userName")}
                value={formState.userName}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    userName: value,
                  }))
                }
              />
              <TextInput
                style={{
                  ...input,
                  borderColor: onFocus.userEmail ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                onFocus={() => handleFocus("userEmail")}
                onEndEditing={() => outFocus("userEmail")}
                value={formState.userEmail}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    userEmail: value,
                  }))
                }
              />
              <View style={passwordWrap}>
                <TextInput
                  style={{
                    ...input,
                    borderColor: onFocus.userPassword ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={isPasswordHidden}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => handleFocus("userPassword")}
                  onEndEditing={() => outFocus("userPassword")}
                  value={formState.userPassword}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      userPassword: value,
                    }))
                  }
                />
                <TouchableOpacity
                  style={showBtn}
                  onPress={() => setIsPasswordHidden((prevState) => !prevState)}
                >
                  <Text style={showBtnText}>
                    {isPasswordHidden ? "Показать" : "Скрыть"}
                  </Text>
                </TouchableOpacity>
              </View>
              {!isKeyboardShow && (
                <View style={{ marginTop: 27 }}>
                  <SubmitBtn
                    text="Зарегистрироваться"
                    handleSubmit={handleSubmit}
                  />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={link}
                    activeOpacity={0.7}
                  >
                    <Text style={linkText}>Уже есть аккаунт? Войти</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {isCameraActive && (
          <ImageBackground
            style={{
              flex: 1,
              resizeMode: "cover",
              position: "absolute",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            source={require("../../images/photoBG.jpeg")}
          >
            <Camera
              type={CameraType.front}
              ref={setCamera}
              style={{
                width: "95%",
                height: 350,
                borderRadius: 20,
              }}
            ></Camera>
            <TouchableOpacity
              style={{
                marginTop: 32,
                backgroundColor: "#FF6C00",
                width: 64,
                height: 64,
                borderRadius: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                takePhoto();
              }}
            >
              <AntDesign name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </ImageBackground>
        )}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
