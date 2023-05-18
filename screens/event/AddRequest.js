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
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";

export default function AddRequest({ navigation }) {
  const [username, setUsername] = useState("");
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ml-[20px] mr-[20px]">
          <TouchableOpacity
            onPress={() => {
              setShowToken(false);
            }}
            className="flex mt-[0px] mb-[0px] justify-start pl-[0px]"
          >
            <View className="mt-[8px]">
              <Image
                className="w-[7px] h-[14px]"
                source={require("../../assets/icons/right-arrow-black.png")}
              />
            </View>
          </TouchableOpacity>
          <View className="flex  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("design-request")}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View className="bg-[#FDFDFD]">
            <View
              style={{ borderColor: "rgba(178,178,178,0.45)" }}
              className="flex bg-[#FFFFFF]  border-[1px] m-[25px] rounded-[10px]"
            >
              <View className="mt-[10px] ml-[10px]">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="tex-[14px] text-[#262626]"
                >
                  {i18n.t("design-information")}
                </Text>
              </View>
              <View className="mt-[25px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("username")}
                </Text>
              </View>
              <View
                style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
              >
                <TextInput
                  style={GlobalStyles.cairoRegular}
                  className="text-[14px] text-right h-[48px]"
                  onChangeText={setUsername}
                  value={username}
                  placeholder={i18n.t("username")}
                />
              </View>
              <View className="mt-[20px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("email")}
                </Text>
              </View>
              <View
                style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
              >
                <TextInput
                  style={GlobalStyles.cairoRegular}
                  className="text-[14px] text-right h-[48px]"
                  onChangeText={setUsername}
                  value={username}
                  placeholder={i18n.t("email")}
                />
              </View>
              <View className="mt-[20px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("phone")}
                </Text>
              </View>
              <View
                style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                className="mt-[10px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
              >
                <TextInput
                  style={GlobalStyles.cairoRegular}
                  className="text-[14px] text-right h-[48px]"
                  onChangeText={setUsername}
                  value={username}
                  placeholder={i18n.t("phone")}
                />
              </View>
              <View className="mt-[20px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("order-details")}
                </Text>
              </View>
              <View
                style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                className="mt-[10px]  h-[150px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
              >
                <TextInput
                  style={GlobalStyles.cairoRegular}
                  className="text-[14px] text-right h-[48px]"
                  onChangeText={setUsername}
                  value={username}
                  multiline={true}
                  placeholder={i18n.t("order-details")}
                />
              </View>
              <View className="mt-[20px] ml-[20px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("order-details")}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  // setShowToken(false);
                }}
                className="flex mt-[10px] mb-[0px] justify-start pl-[10px] flex-row"
              >
                <View className="mt-[8px] ml-[10px]">
                  <Image
                    className="w-[13.28px] h-[12.85px]"
                    source={require("../../assets/icons/upload.png")}
                  />
                </View>
                <View className="ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[#2B949A] text-[16px]"
                  >
                    {i18n.t("back")}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="mt-[20px] flex justify-center h-[50px] bg-[#2B949A] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]">
                <Text
                  className="text-center text-[#FFFFFF] text-[16px]"
                  style={GlobalStyles.cairoBold}
                >
                  {i18n.t("submit-design-request")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
