import React from "react";
import { useDispatch } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { headerStyles } from "./HeaderStyles";
import { useNavigation } from "@react-navigation/native";
import { authLogoutUser } from "../../redux/auth/authOperations";

const { header, headerTitle, backBtn, logOutBtn } = headerStyles;

export const Header = ({ title, navigateFrom }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={header}>
      <Text style={headerTitle}>{title}</Text>
      {title === "Публикации" && (
        <TouchableOpacity
          style={logOutBtn}
          onPress={() => dispatch(authLogoutUser())}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      )}

      {title !== "Публикации" && (
        <TouchableOpacity
          style={backBtn}
          onPress={() => navigation.navigate(navigateFrom)}
        >
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};
