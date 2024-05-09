import { View, Text } from "react-native";
import React from "react";

interface InfoBoxProps {
  title: string | number;
  subtitle?: string;
  titleStyles?: string;
  containerStyles?: string;
}

const InfoBox = ({
  title,
  subtitle,
  titleStyles,
  containerStyles,
}: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className={`text-gray-100 text-sm text-center font-pregular`}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
