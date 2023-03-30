import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { authStyles } from "./AuthStyles";
import { SubmitBtn } from "../../Components/SubmitBtn/SubmitBtn";
import Toast from "react-native-root-toast";

const {
  title,
  inputWrap,
  input,
  passwordWrap,
  showBtn,
  showBtnText,
  btn,
  btnText,
  link,
  linkText,
  image,
  logWrapper,
} = authStyles;

const initialFormState = {
  email: "",
  password: "",
};

const initialFocusState = {
  email: false,
  password: false,
};

export const LoginScreen = ({ navigation }) => {
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
                ...logWrapper,
                paddingBottom: isKeyboardShow ? 32 : 144,
              }}
            >
              <Text style={title}>Войти</Text>
              <View style={inputWrap}>
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
                    onPress={() =>
                      setIsPasswordHidden((prevState) => !prevState)
                    }
                  >
                    <Text style={showBtnText}>
                      {isPasswordHidden ? "Показать" : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {!isKeyboardShow && (
                <View style={{ marginTop: 43 }}>
                  <SubmitBtn text="Войти" handleSubmit={handleSubmit} />
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Registration")}
                    style={link}
                    activeOpacity={0.7}
                  >
                    <Text style={linkText}>
                      Нет аккаунта? Зарегистрироваться
                    </Text>
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
