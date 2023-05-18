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

export default function AddSupport({ navigation }) {
  const [username, setUsername] = useState("");

  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]   p-[10px] flex-row">
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("CustomerSupport");
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
          <View className="flex w-full pl-[10px] pr-[10px]   ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[22px] text-center text-[#040404]"
            >
              {i18n.t("add-ticket")}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View className="flex ml-[30px] mt-[20px]  mr-[30px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[#747474] text-[14px]"
            >
              {i18n.t("ticket-type")}
            </Text>
          </View>
          <View className="flex flex-row ml-[30px] mt-[10px]  mr-[30px] ">
            <View className="flex mr-[5px] mt-[10px]">
              <Image
                className="w-[20px] h-[20px]"
                source={require("../../assets/icons/radio.png")}
              />
            </View>
            <View className="mt-[6px] ml-[5px]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[16px] text-left text-[#747474]"
              >
                {i18n.t("inquery")}
              </Text>
            </View>
          </View>
          <View className="flex flex-row ml-[30px] mt-[10px]  mr-[30px] ">
            <View className="flex mr-[5px] mt-[10px]">
              <Image
                className="w-[20px] h-[20px]"
                source={require("../../assets/icons/radio.png")}
              />
            </View>
            <View className="mt-[6px] ml-[5px]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[16px] text-left text-[#747474]"
              >
                {i18n.t("suggesation")}
              </Text>
            </View>
          </View>
          <View className="flex flex-row ml-[30px] mt-[10px]  mr-[30px] ">
            <View className="flex mr-[5px] mt-[10px]">
              <Image
                className="w-[20px] h-[20px]"
                source={require("../../assets/icons/radio.png")}
              />
            </View>
            <View className="mt-[6px] ml-[5px]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[16px] text-left text-[#747474]"
              >
                {i18n.t("technical-support")}
              </Text>
            </View>
          </View>
          <View
            style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
            className="mt-[40px]   h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[30px] border-[#E4E4E4] border-[1px] ml-[30px]"
          >
            <TextInput
              style={GlobalStyles.cairoRegular}
              className="text-[14px] text-right h-[48px]"
              onChangeText={setUsername}
              value={username}
              placeholder={i18n.t("ticket-address")}
            />
          </View>
          <View
            style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
            className="mt-[40px]   h-[166px] rounded-[10px] pl-[10px] pr-[10px] mr-[30px] border-[#E4E4E4] border-[1px] ml-[30px]"
          >
            <TextInput
              style={GlobalStyles.cairoRegular}
              className="text-[14px] text-right h-[48px]"
              onChangeText={setUsername}
              value={username}
              multiline={true}
              placeholder={i18n.t("details")}
            />
          </View>
          <TouchableOpacity className="mt-[50px] flex justify-center h-[50px] bg-[#2B949A] rounded-[8px] mb-[20px] ml-[30px]  mr-[30px]">
            <Text
              className="text-center text-[#FFFFFF] text-[16px]"
              style={GlobalStyles.cairoBold}
            >
              {i18n.t("create-the-ticket")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
