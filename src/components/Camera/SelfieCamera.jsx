import React, { useState, useEffect } from "react";
import { TouchableOpacity, ImageBackground } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { cameraStyles } from "./CameraStyles";

const { cameraBackground, selfieCam, selfieCamBtn } = cameraStyles;

export const SelfieCamera = ({ setIsCameraActive, setFormState }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

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

  return (
    <ImageBackground
      style={cameraBackground}
      source={require("../../images/photoBG.jpeg")}
    >
      <Camera
        type={CameraType.front}
        ref={setCamera}
        style={selfieCam}
      ></Camera>
      <TouchableOpacity
        style={selfieCamBtn}
        onPress={() => {
          takePhoto();
        }}
      >
        <AntDesign name="camera" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </ImageBackground>
  );
};
