import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  regWrapper: {
    position: "relative",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingTop: 92,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logWrapper: {
    position: "relative",
    alignItems: "stretch",
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrap: {
    position: "absolute",
    display: "flex",
    top: -60,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
  },
  inputWrap: {
    gap: 16,
  },
  input: {
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordWrap: {
    position: "relative",
  },
  showBtn: {
    position: "absolute",
    display: "flex",
    right: 16,
    bottom: 0,
    height: "100%",
    fontSize: 16,
    color: "#fff",
    justifyContent: "center",
  },
  showBtnText: {
    fontSize: 16,
    color: "#1B4371",
  },
  link: {},
  linkText: {
    padding: 16,
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
