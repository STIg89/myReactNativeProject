import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { headerStyles } from "./HeaderStyles";
import { useNavigation } from "@react-navigation/native";
const { header, headerTitle, backBtn, logOutBtn } = headerStyles;

export const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={header}>
      <Text style={headerTitle}>{title}</Text>
      {title === "Публикации" && (
        <TouchableOpacity
          style={logOutBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      )}

      {title !== "Публикации" && (
        <TouchableOpacity
          style={backBtn}
          onPress={() => navigation.navigate("Posts")}
        >
          <AntDesign name="arrowleft" size={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};
