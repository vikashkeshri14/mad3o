import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import GlobalStyles from "../hooks/GlobalStyles";
import i18n from "../hooks/Language";

export default function Welcome({ navigation }) {
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-evenly flex-row">
          <Image
            className="w-[80%] h-[425px]"
            source={require("../assets/images/home1.png")}
          />
          <Image
            className="w-[15%] h-[425px]"
            source={require("../assets/images/home1.png")}
          />
        </View>
        <View className="flex flex-col">
          <View className="flex mt-[40px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[24px] text-center "
            >
              {i18n.t("welcome-to-invite")}
            </Text>
          </View>
          <View className=" flex mt-[40px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
              className="ml-[20px] mr-[20px] flex justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
            >
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[16px] text-center text-[#ffffff]"
              >
                {i18n.t("join-the-inviter")}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-center mt-[40px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[14px] text-[#2B949A]"
            >
              {i18n.t("sign-in")}
            </Text>
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] pl-[5px] text-[#747474]"
            >
              {i18n.t("do-you-have-account")}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
