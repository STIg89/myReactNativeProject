import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  header: {
    display: "flex",
    paddingTop: 55,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    paddingBottom: 11,
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 500,
  },
  backBtn: {
    position: "absolute",
    left: 10,
    top: 55,
  },
  logOutBtn: {
    position: "absolute",
    right: 10,
    top: 55,
  },
});
