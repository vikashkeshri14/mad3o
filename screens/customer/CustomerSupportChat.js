import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useRef, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";

export default function CustomerSupportChat() {
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex  mt-[15px] ml-[15px] mr-[15px]   p-[10px] flex-row">
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("BottomNavigation", {
                screen: "Menu",
              });
            }}
            className="flex mt-[0px]  pl-[10px] pr-[10px]  mb-[0px] justify-start "
          >
            <View className="mt-[8px]">
              <Image
                className="w-[7px] h-[14px]"
                source={require("../../assets/icons/right-arrow-black.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("BottomNavigation", {
                screen: "Menu",
              });
            }}
            className="flex mt-[0px]  pl-[10px] pr-[10px]  mb-[0px] justify-start "
          >
            <View className="mt-[8px]">
              <Image
                className="w-[40px] h-[40px]"
                source={require("../../assets/icons/logo.png")}
              />
            </View>
          </TouchableOpacity>
          <View className="flex  ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[22px] text-left text-[#040404]"
            >
              {i18n.t("customer-support")}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
