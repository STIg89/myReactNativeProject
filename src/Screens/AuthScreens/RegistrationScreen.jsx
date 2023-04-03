import React, { useState } from "react";
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
import { authStyles } from "./AuthStyles";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";
import Toast from "react-native-root-toast";

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
} = authStyles;

const initialFormState = {
  login: "",
  email: "",
  password: "",
};

const initialFocusState = {
  login: false,
  email: false,
  password: false,
};

export const RegistrationScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
    const { email, password } = formState;
    if (!email || !password) {
      Toast.show("Please, fill out the form completely");
      return;
    }
    navigation.navigate("Home");
    console.log(formState);
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
                paddingBottom: isKeyboardShow ? 32 : 78,
              }}
            >
              <View style={avatarWrap}>
                <Image />
              </View>
              <Text style={title}>Регистрация</Text>
              <TextInput
                style={{
                  ...input,
                  borderColor: onFocus.login ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логин"
                placeholderTextColor="#BDBDBD"
                onFocus={() => handleFocus("login")}
                onEndEditing={() => outFocus("login")}
                value={formState.login}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    login: value,
                  }))
                }
              />
              <TextInput
                style={{
                  ...input,
                  borderColor: onFocus.email ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адрес электронной почты"
                placeholderTextColor="#BDBDBD"
                keyboardType="email-address"
                onFocus={() => handleFocus("email")}
                onEndEditing={() => outFocus("email")}
                value={formState.email}
                onChangeText={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <View style={passwordWrap}>
                <TextInput
                  style={{
                    ...input,
                    borderColor: onFocus.password ? "#FF6C00" : "#E8E8E8",
                  }}
                  secureTextEntry={isPasswordHidden}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => handleFocus("password")}
                  onEndEditing={() => outFocus("password")}
                  value={formState.password}
                  onChangeText={(value) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      password: value,
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
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
