import { View, Text } from "react-native";
import React from "react";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  keyboardType?: string;
}

const FormField = ({
  title,
  value,
  handleChangeText,
  keyboardType,
  otherStyles,
}: FormFieldProps) => {
  return (
    <View className="space-y-2">
      <Text className="text-base text-gray-100 font-pmedium">FormField</Text>
    </View>
  );
};

export default FormField;
