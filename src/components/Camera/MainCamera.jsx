import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { cameraStyles } from "./CameraStyles";

const { mainCam, mainCamBtn } = cameraStyles;

export const MainCamera = ({ setLocation, setFormState }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

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
  };

  const uploadPhoto = async () => {
    const resp = await fetch(photo);
    const file = await resp.blob();
    const photoId = Date.now().toString();
    const storageRef = ref(storage, `images/${photoId}`);
    const uploadPhoto = await uploadBytesResumable(storageRef, file);
    const photoRef = await getDownloadURL(uploadPhoto.ref);
    setFormState((prevState) => ({ ...prevState, photoUrl: photoRef }));
  };

  return (
    <Camera style={mainCam} ref={setCamera}>
      <TouchableOpacity
        style={mainCamBtn}
        onPress={() => {
          takePhoto();
        }}
      >
        <AntDesign name="camera" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </Camera>
  );
};
