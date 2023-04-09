import React, { useState } from "react";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
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
import { Header } from "../../components/Header/Header";
import { SubmitBtn } from "../../components/SubmitBtn/SubmitBtn";
import Toast from "react-native-root-toast";
import { mainStyles } from "./MainStyles";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/auth/authSelectors";
import { MainCamera } from "../../components/Camera/MainCamera";

const {
  screenWrap,
  main,
  photoWrap,
  photoText,
  createInput,
  createInputIcon,
  createLocationWrap,
  trashWrap,
  trashBtn,
} = mainStyles;

const initialFormState = {
  name: "",
  locationDescription: "",
  photoUrl: null,
};

const initialFocusState = {
  name: false,
  locationDescription: false,
};

export const CreatePostScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  const [location, setLocation] = useState(null);
  const { userId, userName } = useSelector(selectUserProfile);

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

  const handleSubmit = async () => {
    const { name, locationDescription, photoUrl } = formState;

    if (!name || !locationDescription || !photoUrl) {
      Toast.show("Please, fill out the form completely");
      return;
    }

    uploadPost();
    navigation.navigate("Posts");
    setFormState(initialFormState);
  };

  const uploadPost = async () => {
    const { name, locationDescription, photoUrl } = formState;
    const { latitude, longitude } = location;
    const postId = Date.now().toString();
    const postData = {
      photoUrl,
      name,
      locationDescription,
      latitude,
      longitude,
      userId,
      userName,
      comments: [],
    };
    await setDoc(doc(db, "posts", `${postId}`), postData);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
        <View
          style={{ ...screenWrap, paddingBottom: isKeyboardShow ? 24 : 64 }}
        >
          <Header title="Создать публикацию" />
          <ScrollView>
            <View style={main}>
              <View style={{ marginBottom: 28 }}>
                <View>
                  {!formState.photoUrl && (
                    <MainCamera
                      setLocation={setLocation}
                      setFormState={setFormState}
                    />
                  )}
                  {formState.photoUrl && (
                    <TouchableOpacity
                      onPress={() =>
                        setFormState((prevState) => ({
                          ...prevState,
                          photoUrl: null,
                        }))
                      }
                    >
                      <Image
                        source={{ uri: formState.photoUrl }}
                        style={photoWrap}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {!formState.photoUrl && (
                  <Text style={photoText}>Сделайте фото</Text>
                )}
                {formState.photoUrl && (
                  <Text style={photoText}>Нажми на фото, для удаления</Text>
                )}
              </View>
              <View style={{ marginBottom: 16 }}>
                <TextInput
                  style={{
                    ...createInput,
                    borderBottomColor: onFocus.name ? "#FF6C00" : "#BDBDBD",
                  }}
                  placeholder="Название..."
                  placeholderTextColor={"#BDBDBD"}
                  onFocus={() => handleFocus("name")}
                  onEndEditing={() => outFocus("name")}
                  value={formState.name}
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
                    onFocus={() => handleFocus("locationDescription")}
                    onEndEditing={() => outFocus("locationDescription")}
                    value={formState.locationDescription}
                    onChangeText={(value) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        locationDescription: value,
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
              {!isKeyboardShow && location !== null && (
                <>
                  <SubmitBtn text="Опубликовать" handleSubmit={handleSubmit} />
                </>
              )}
              {location === null && (
                <>
                  <SubmitBtn text="Определение координат..." />
                </>
              )}
            </View>
          </ScrollView>
          <View style={trashWrap}>
            {!isKeyboardShow && (
              <TouchableOpacity
                style={trashBtn}
                onPress={() => {
                  setFormState(initialFormState);
                }}
              >
                <FontAwesome name="trash-o" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
