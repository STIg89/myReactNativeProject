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

// const initialLocation = {
//   latitude: null,
//   longitude: null,
// };

export const CreatePostScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [onFocus, setOnFocus] = useState(initialFocusState);
  const [formState, setFormState] = useState(initialFormState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  useEffect(() => {
    async () => {};
  }, [photo]);

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    const location = await Location.getCurrentPositionAsync();
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
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
    const { latitude, longitude } = location;

    if (!name || !locationDescription || !photo) {
      Toast.show("Please, fill out the form completely");
      return;
    }

    navigation.navigate("Posts", {
      photo,
      name,
      locationDescription,
      latitude,
      longitude,
    });
    setFormState(initialFormState);
    setPhoto(null);
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
              {!isKeyboardShow && (
                <>
                  <SubmitBtn text="Опубликовать" handleSubmit={handleSubmit} />
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
