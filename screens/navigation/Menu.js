import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";

export default function Menu() {
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-center self-center w-[88px] h-[88px] rounded-[44px] border-[1px] bg-[#E4E4E4]/[0.80] border-[#2B949A]/[0.28] mt-[10%]">
          <Text
            style={GlobalStyles.cairoBold}
            className="text-center mt-[-10px] self-center justify-center text-[#2B949A] text-[32px]"
          >
            {i18n.t("for")}
          </Text>
        </View>
        <View className="flex "></View>
      </SafeAreaView>
    </View>
  );
}
