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

const {
  imgWrap,
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

export const RegistrationScreen = () => {
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
    console.log(formState);
    setFormState(initialFormState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={image}
        source={require("../../assets/images/photoBG.jpeg")}
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
              <View style={imgWrap}>
                <Image />
              </View>
              <Text style={title}>Регистрация</Text>
              <View style={inputWrap}>
                <TextInput
                  style={{
                    ...input,
                    borderColor: onFocus.login ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Логин"
                  placeholderTextColor="#BDBDBD"
                  onFocus={() => handleFocus("login")}
                  onEndEditing={() => outFocus("login")}
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
                <View>
                  <TouchableOpacity
                    style={btn}
                    activeOpacity={0.7}
                    onPress={handleSubmit}
                  >
                    <Text style={btnText}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={link} activeOpacity={0.7}>
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
