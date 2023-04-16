import { View, Text } from "react-native";
import React from "react";
import GlobalStyles from "../../hooks/GlobalStyles";

export default function Ended() {
  return (
    <View className="flex w-[100%] h-[127px] ">
      <Text
        style={GlobalStyles.cairoBold}
        className="text-[21px] text-[#2B949A]"
      >
        Test
      </Text>
    </View>
  );
}
