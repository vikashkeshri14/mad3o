import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
export default function Menu({ navigation }) {
  useEffect(() => {
    getValueAuth();
  }, []);
  const [loginUser, setLoginUser] = useState(null);

  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
    }
  };

  const logout = async () => {
    SecureStore.deleteItemAsync("LoginUser").then(
      navigation.navigate("SignIn")
    );
  };
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AccountEdit");
            }}
          >
            <View className="flex justify-center self-center w-[88px] h-[88px] rounded-[44px] border-[1px] bg-[#E4E4E4]/[0.80] border-[#2B949A]/[0.28] mt-[10%]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-center mt-[-10px] self-center justify-center text-[#2B949A] text-[32px]"
              >
                {i18n.t("for")}
              </Text>
            </View>
            <View className="flex justify-center self-center">
              <Image
                className="w-[37px] mt-[-20px] h-[37px]"
                source={require("../../assets/icons/edit.png")}
              />
            </View>
            <View className="flex mt-[-5px] ">
              <Text
                className="text-[16px] text-center text-[#262626]"
                style={GlobalStyles.cairoSemiBold}
              >
                {loginUser != null && loginUser.name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{ borderColor: "rgba(178,178,178,0.45)" }}
          className="mt-[10%] flex bg-[#FFFFFF]  border-[1px] m-[20px] rounded-[10px]"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Subscribe");
            }}
          >
            <View
              style={{ borderColor: "rgba(178,178,178,0.45)" }}
              className="flex mt-[15px] ml-[15px] mr-[15px] border-b-[1px] p-[10px] flex-row"
            >
              <View className=" w-[25px]">
                <Image
                  source={require("../../assets/icons/reward.png")}
                  className="w-[15px] h-[21px]"
                />
              </View>
              <View className=" ml-[10px] mt-[-5px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[16px] text-[#262626]"
                >
                  {i18n.t("your-subscription")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Subscription");
            }}
          >
            <View
              style={{ borderColor: "rgba(178,178,178,0.45)" }}
              className="flex mt-[15px] ml-[15px] mr-[15px] border-b-[1px] p-[10px] flex-row"
            >
              <View className=" w-[25px]">
                <Image
                  source={require("../../assets/icons/subscription.png")}
                  className="w-[25px] h-[19px]"
                />
              </View>
              <View className=" ml-[10px] mt-[-5px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[16px] text-[#262626]"
                >
                  {i18n.t("subscription")}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{ borderColor: "rgba(178,178,178,0.45)" }}
            className="flex mt-[10px] ml-[15px] mr-[15px] border-b-[1px] p-[10px] flex-row"
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CustomerSupport");
              }}
              className="flex flex-row"
            >
              <View className="w-[25px]">
                <Image
                  source={require("../../assets/icons/chat.png")}
                  className="w-[20.15px] h-[15.96px]"
                />
              </View>
              <View className=" ml-[10px] mt-[-10px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[16px] text-[#262626]"
                >
                  {i18n.t("customer-support")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex mt-[10px] ml-[15px] mr-[15px]  p-[10px] flex-row">
            <TouchableOpacity
              onPress={() => {
                logout();
              }}
              className="flex flex-row"
            >
              <View className="w-[25px]">
                <Image
                  source={require("../../assets/icons/logout.png")}
                  className="w-[18px] h-[18px]"
                />
              </View>
              <View className=" ml-[10px] mt-[-7px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[16px] text-[#262626]"
                >
                  {i18n.t("logout")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
