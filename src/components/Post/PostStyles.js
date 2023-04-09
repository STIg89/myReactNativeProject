import { StyleSheet } from "react-native";

export const postStyles = StyleSheet.create({
  photoWrap: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  photoDetailsEl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  wrap: {
    marginBottom: 32,
  },
  nameText: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "500",
  },
  btnWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comText: {
    fontSize: 16,
    marginLeft: 6,
  },
  locText: {
    fontSize: 16,
    marginLeft: 4,
  },
});
