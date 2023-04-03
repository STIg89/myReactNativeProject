import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  header: {
    display: "flex",
    paddingTop: "13%",
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
    paddingBottom: "2%",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "500",
  },
  backBtn: {
    position: "absolute",
    left: 10,
    bottom: "25%",
  },
  logOutBtn: {
    position: "absolute",
    right: 10,
    bottom: "25%",
  },
});
