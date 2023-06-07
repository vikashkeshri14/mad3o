import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import moment from "moment";

export default function Subscribe({ navigation }) {
  const [loginUser, setLoginUser] = useState(null);
  const [subscription, setSubscription] = useState([]);
  const [cards, setCards] = useState([]);
  const [subscribtionLog, setSubscriptionLog] = useState([]);

  useEffect(() => {
    getValueAuth();
    // getSubscription();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getSubscription(user.id);
      getCardById(user.id);
      subscriptionLog(user.id);
    }
  };

  const getSubscription = async (userId) => {
    let obj = {
      userId: userId,
    };
    let params = { url: apiList.subscriptionByUserId, body: obj };
    let response = await ApiService.postData(params);
    setSubscription(response.result);
  };
  const subscriptionLog = async (userId) => {
    let obj = {
      userId: userId,
    };
    let params = { url: apiList.subscriptionLog, body: obj };
    let response = await ApiService.postData(params);
    setSubscriptionLog(response.result);
  };
  const getCardById = async (userId) => {
    let obj = {
      userId: userId,
    };
    let params = { url: apiList.getUserCardByUserId, body: obj };
    let response = await ApiService.postData(params);
    setCards(response.result);
  };
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ml-[20px] mr-[20px]">
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
              navigation.navigate("BottomNavigation", {
                screen: "RequestDesign",
              });
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
              {i18n.t("subscribe-to-invite")}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              borderColor: "rgba(178,178,178,0.45)",
            }}
            className="w-[90%] border-[0.5px] ml-auto mr-auto bg-[#ffffff] mt-[20px]  rounded-[10px] h-[325px]"
          >
            <View className="mt-[30px]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[18px] text-left ml-[20px] mr-[20px] text-[#262626]"
              >
                {subscription.length > 0 && subscription[0].subscripton_ar}
              </Text>
            </View>
            <View className="mt-[20px] flex flex-row">
              <View className="flex">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[35px] text-left ml-[20px] mr-[10px] text-[#2B949A]"
                >
                  {subscription.length > 0 && subscription[0].pricing}
                </Text>
              </View>
              <View className="flex mt-[25px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-left text-[#2B949A]"
                >
                  {i18n.t("riyal")}
                </Text>
              </View>
            </View>
            <View className="mt-[35px] flex flex-row ml-[20px]">
              <View className="mt-[8px]">
                <Image
                  className="w-[14px] h-[11px]"
                  source={require("../../assets/icons/point-black.png")}
                />
              </View>
              <View className="mt-[0px] ml-[10px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#262626] text-[14px]"
                >
                  {subscription.length > 0 && subscription[0].invitation}
                </Text>
              </View>
              <View className="mt-[0px] ml-[10px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#262626] text-[14px]"
                >
                  ضيف لكل دعوة
                </Text>
              </View>
            </View>
            <View className="mt-[25px] flex flex-row ml-[20px]">
              <View className="mt-[8px]">
                <Image
                  className="w-[14px] h-[11px]"
                  source={require("../../assets/icons/point-black.png")}
                />
              </View>
              <View className="mt-[0px] ml-[10px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#262626] text-[14px]"
                >
                  {subscription.length > 0 &&
                    subscription[0].invitation_description_ar}
                </Text>
              </View>
            </View>
          </View>
          {cards.map((data, i) => {
            return (
              <View
                key={i}
                style={{
                  borderColor: "rgba(178,178,178,0.45)",
                }}
                className="w-[90%] border-[0.5px] ml-auto mr-auto  bg-[#ffffff] mt-[20px]  rounded-[10px] "
              >
                <View className="ml-[20px] mt-[15px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-left text-[16px] text-[#ADADAD]"
                  >
                    {i18n.t("credit-card")}
                  </Text>
                </View>

                <View className="flex mt-[15px] ml-[20px] flex-row">
                  <View className="flex">
                    <Image
                      className="w-[49.65px] mt-[7px] h-[16.1px]"
                      source={require("../../assets/icons/visa.png")}
                    />
                  </View>
                  <View className="flex">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[18px] ml-[10px] text-[#262626]"
                    >
                      ************{data.card_number.slice(-3)}
                    </Text>
                  </View>
                </View>
                <View className="flex justify-start mr-[10px] mb-[15px] mt-[15px]">
                  <Image
                    className="w-[13.84px] self-end mt-[7px] h-[17.53px]"
                    source={require("../../assets/icons/trash.png")}
                  />
                </View>
              </View>
            );
          })}
          <View className="flex flex-row ml-[20px] mt-[15px]">
            <TouchableOpacity className="flex flex-row">
              <View className="flex mt-[12px]">
                <Image
                  className="w-[8.93px] h-[8.93px]"
                  source={require("../../assets/icons/add-request.png")}
                />
              </View>
              <View className="flex ml-[10px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#2B949A] text-[16px] text-left"
                >
                  {i18n.t("new-card")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderColor: "rgba(178,178,178,0.45)",
            }}
            className="w-[90%]  border-[0.5px]  ml-auto mr-auto  bg-[#ffffff] mt-[20px]  rounded-[10px] "
          >
            {subscribtionLog.map((data, i) => {
              return (
                <View key={i}>
                  <View className="flex justify-around mt-[10px] flex-row">
                    <View className="flex  self-end w-[40%]">
                      <Text
                        style={GlobalStyles.cairoBold}
                        className="text-[14px] text-[#747474] text-left"
                      >
                        {data.subscripton_ar}
                      </Text>
                    </View>
                    <View className="flex flex-row">
                      <View className="mt-[0px]">
                        <Text
                          className="text-[#747474] text-[14px]"
                          style={GlobalStyles.cairoSemiBold}
                        >
                          {i18n.t("subscription-start")} {" : "}
                        </Text>
                      </View>
                      <View className="ml-[5px]">
                        <Text
                          className="text-[#747474] text-[14px]"
                          style={GlobalStyles.cairoSemiBold}
                        >
                          {moment(data.subscription_date).format("YYYY-MM-DD")}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex justify-around mb-[10px] mt-[10px] flex-row">
                    <View className="flex flex-row self-end w-[40%]">
                      <View>
                        <Text
                          style={GlobalStyles.cairoSemiBold}
                          className="text-[14px] text-[#2B949A] text-left"
                        >
                          {data.amount}
                        </Text>
                      </View>
                      <View className="ml-[5px]">
                        <Text
                          style={GlobalStyles.cairoSemiBold}
                          className="text-[14px] text-[#2B949A] text-left"
                        >
                          {i18n.t("riyal")}
                        </Text>
                      </View>
                    </View>
                    <View className="flex flex-row">
                      <View className="mt-[0px]">
                        <Text
                          className="text-[#747474] text-[14px]"
                          style={GlobalStyles.cairoSemiBold}
                        >
                          {i18n.t("finish")}
                          {" : "}
                        </Text>
                      </View>
                      <View className="ml-[5px]">
                        <Text
                          style={GlobalStyles.cairoSemiBold}
                          className="text-[14px] text-[#747474] text-left"
                        >
                          {moment(data.subscription_enddate).format(
                            "YYYY-MM-DD"
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
