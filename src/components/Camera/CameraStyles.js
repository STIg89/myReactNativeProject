import { StyleSheet } from "react-native";

export const cameraStyles = StyleSheet.create({
  cameraBackground: {
    flex: 1,
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  selfieCam: {
    width: "95%",
    height: 350,
    borderRadius: 20,
  },
  selfieCamBtn: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  mainCam: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  mainCamBtn: {
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    opacity: 0.3,
    borderRadius: 30,
  },
});
