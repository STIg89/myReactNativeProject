import React, { useState, useEffect } from "react";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
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

import { storage, db } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../redux/auth/authSelectors";

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
  locationDescription: "",
};

const initialFocusState = {
  name: false,
  locationDescription: false,
};

export const CreatePostScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const { userId, userName } = useSelector(selectUserProfile);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
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

  const handleSubmit = async () => {
    const { name, locationDescription } = formState;

    if (!name || !locationDescription || !photo) {
      Toast.show("Please, fill out the form completely");
      return;
    }

    uploadPost();
    navigation.navigate("Posts");
    setFormState(initialFormState);
    setPhoto(null);
  };

  const uploadPost = async () => {
    const { name, locationDescription } = formState;
    const { latitude, longitude } = location;
    const photoUrl = await uploadPhoto();
    const postId = Date.now().toString();
    const postData = {
      photoUrl,
      name,
      locationDescription,
      latitude,
      longitude,
      userId,
      userName,
    };
    await setDoc(doc(db, "posts", `${postId}`), postData);
  };

  const uploadPhoto = async () => {
    const resp = await fetch(photo);
    const file = await resp.blob();
    const photoId = Date.now().toString();
    const storageRef = ref(storage, `images/${photoId}`);
    const uploadPhoto = await uploadBytesResumable(storageRef, file);
    const photoRef = await getDownloadURL(uploadPhoto.ref);
    return photoRef;
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView behavior={Platform.OS == "ios" && "padding"}>
        <View style={screenWrap}>
          <Header title="Создать публикацию" />
          <ScrollView>
            <View style={main}>
              <View style={{ marginBottom: 28 }}>
                <View>
                  {!photo && (
                    <Camera style={photoWrap} ref={setCamera}>
                      <TouchableOpacity
                        style={cameraBtn}
                        onPress={() => {
                          takePhoto();
                        }}
                      >
                        <AntDesign name="camera" size={24} color="#BDBDBD" />
                      </TouchableOpacity>
                    </Camera>
                  )}
                  {photo && (
                    <TouchableOpacity onPress={() => setPhoto(null)}>
                      <Image source={{ uri: photo }} style={photoWrap} />
                    </TouchableOpacity>
                  )}
                </View>
                {!photo && <Text style={photoText}>Сделайте фото</Text>}
                {photo && (
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
                  setPhoto(null);
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
