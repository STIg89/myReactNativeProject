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
import { useDispatch } from "react-redux";
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
} = authStyles;

const initialFormState = {
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
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const dispatch = useDispatch();

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
    const { userEmail, userPassword } = formState;
    if (!userEmail || !userPassword) {
      Toast.show("Please, fill out the form completely");
      return;
    }
    dispatch(authRegistrationUser(formState));
    // navigation.navigate("Home");
    // console.log(formState);
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
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
