import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as SecureStore from "expo-secure-store";
export default function CustomerSupport({ navigation }) {
  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    getValueAuth()
  }, [])
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user)
    }
  };
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]   p-[10px] flex-row">
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
          <View className="flex w-full   ml-[0px] mt-[-5px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[22px] text-center text-[#040404]"
            >
              {i18n.t("customer-support")}
            </Text>
          </View>
          <View className="flex pl-[10px] pr-[10px]  self-center">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddSupport");
              }}
            >
              <Image
                source={require("../../assets/icons/add-request.png")}
                className="w-[15px] self-end h-[15px]"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-[#FDFDFD]">
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CustomerSupportChat");
              }}
            >
              <View
                style={{ borderColor: "rgba(178,178,178,0.45)" }}
                className=" flex bg-[#FFFFFF]  border-[1px] ml-[20px] mr-[20px] mt-[20px] rounded-[10px]"
              >
                <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                  <View className="flex flex-row w-[70%]  ml-[0px] mt-[-5px]">
                    <View className="flex flex-row self-center   ml-[0px] mt-[-5px]">
                      <View className="flex mr-[5px] mt-[10px]">
                        <Image
                          className="w-[12px] h-[12px]"
                          source={require("../../assets/icons/online.png")}
                        />
                      </View>
                      <View className="mt-[5px] ml-[5px]">
                        <Text
                          style={GlobalStyles.cairoBold}
                          className="text-[14px] text-left text-[#747474]"
                        >
                          {i18n.t("payment-problem")}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex w-[30%]  ml-[0px] mt-[-5px]">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[14px] text-right text-[#ADADAD]"
                    >
                      #29484
                    </Text>
                  </View>
                </View>
                <View className="flex  mt-[10px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                  <View className="flex    ml-[0px] mt-[-5px]">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[14px] text-left text-[#ADADAD]"
                    >
                      28 / 09 / 2022
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <View
              style={{ borderColor: "rgba(178,178,178,0.45)" }}
              className=" flex bg-[#FFFFFF]  border-[1px] ml-[20px] mr-[20px] mt-[20px] rounded-[10px]"
            >
              <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row w-[70%]  ml-[0px] mt-[-5px]">
                  <View className="flex flex-row self-center   ml-[0px] mt-[-5px]">
                    <View className="flex mr-[5px] mt-[10px]">
                      <Image
                        className="w-[12px] h-[12px]"
                        source={require("../../assets/icons/offline.png")}
                      />
                    </View>
                    <View className="mt-[5px] ml-[5px]">
                      <Text
                        style={GlobalStyles.cairoBold}
                        className="text-[14px] text-left text-[#747474]"
                      >
                        {i18n.t("special-design-request")}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="flex w-[30%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-right text-[#ADADAD]"
                  >
                    #29484
                  </Text>
                </View>
              </View>
              <View className="flex  mt-[10px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex    ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#ADADAD]"
                  >
                    28 / 09 / 2022
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
