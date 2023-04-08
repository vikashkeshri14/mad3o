import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";

export default function Register() {
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex flex-col">
          <View className="flex mt-[10px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[26px] text-center text-[#040404]"
            >
              {i18n.t("create-an-account-to-invite")}
            </Text>
          </View>
          <ScrollView>
            <View className="flex mt-[20px] ml-[20px] mr-[20px] border-[0.5px] border-[#B2B2B2] rounded-[10px] bg-white">
              <View className="ml-[20px] mr-[20px] bg-[#E4E4E4] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                <TextInput
                  className="text-right h-[48px] pr-[10px]"
                  placeholder={i18n.t("full-name")}
                ></TextInput>
              </View>
              <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                <TextInput
                  className="text-right h-[48px] pr-[10px]"
                  placeholder={i18n.t("full-name")}
                ></TextInput>
              </View>
              <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                <TextInput
                  className="text-right h-[48px] pr-[10px]"
                  placeholder={i18n.t("full-name")}
                ></TextInput>
              </View>
              <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                <TextInput
                  className="text-right h-[48px] pr-[10px]"
                  placeholder={i18n.t("full-name")}
                ></TextInput>
              </View>
              <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                <TextInput
                  className="text-right h-[48px] pr-[10px]"
                  placeholder={i18n.t("full-name")}
                ></TextInput>
              </View>
              <View className=" flex mt-[60px] mb-[50px]">
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
            </View>
            <View className="flex mt-[20px] ml-[40px] mr-[40px] justify-around flex-row">
              <View className="border-t-[0.5px] mt-[10px] h-[0.5px] basis-[42%] border-[#E4E4E4]"></View>
              <View className="flex  basis-[6%]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="pt-[0px] leading-[24px] text-[16px]"
                >
                  {i18n.t("or")}
                </Text>
              </View>
              <View className="border-t-[0.5px] mt-[10px] h-[0.5px] basis-[42%] border-[#E4E4E4]"></View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
