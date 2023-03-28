import { Text, TouchableOpacity } from "react-native";
import { submitBtnStyles } from "./SubmitBtnStyles";
const { btn, btnText } = submitBtnStyles;

export const SubmitBtn = ({ text, handleSubmit }) => {
  return (
    <TouchableOpacity style={btn} activeOpacity={0.7} onPress={handleSubmit}>
      <Text style={btnText}>{text}</Text>
    </TouchableOpacity>
  );
};
