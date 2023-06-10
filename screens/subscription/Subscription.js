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
export default function Subscription({ navigation }) {
  const [subscription, setSubscription] = useState([1, 2]);
  const [loginUser, setLoginUser] = useState(null);
  const [noOfGuest, setNoOfGuest] = useState(100);
  const [noOfMonth, setNoOfMonth] = useState(1);

  const [subsctiptionVal, setSubsctiptionVal] = useState(200);
  useEffect(() => {
    getValueAuth();
    getSubscription();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
    }
  };
  const getSubscription = async () => {
    let params = { url: apiList.getsubscription };
    let response = await ApiService.getData(params);
    setSubscription(response.result);
  };

  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ml-[10px] mr-[10px]">
          <View className="absolute  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("subscription")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BottomNavigation", {
                screen: "Menu",
              });
            }}
            className="flex mt-[0px] mb-[0px] justify-start pl-[0px]"
          >
            <View className="mt-[0px] flex justify-center  w-[28px] h-[28px]">
              <Image
                className="w-[7px] self-center h-[14px]"
                source={require("../../assets/icons/right-arrow-black.png")}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex bg-[#FDFDFD] mr-[20px] ml-[20px]">
          <View className="mt-[40px]">
            <Text
              className="text-[18px] text-[#040404] text-left"
              style={GlobalStyles.cairoBold}
            >
              {i18n.t("subscription-package")}
            </Text>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {subscription.map((data, i) => {
              return (
                <View
                  key={i}
                  style={
                    i == 0
                      ? {
                          backgroundColor: "rgba(178,178,178,0.14)",
                          borderColor: "rgba(178,178,178,0.45)",
                        }
                      : {
                          backgroundColor: "rgba(43,148,154,0.99)",
                          borderColor: "rgba(178,178,178,0.45)",
                        }
                  }
                  className="w-[295px] mt-[20px] ml-[10px] mr-[10px] rounded-[10px] h-[425px]"
                >
                  <View className="mt-[30px]">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className={
                        i == 0
                          ? "text-[18px] text-left ml-[20px] mr-[20px] text-[#262626]"
                          : "text-[18px] text-left ml-[20px] mr-[20px] text-[#ffffff]"
                      }
                    >
                      {data.subscripton_ar}
                    </Text>
                  </View>
                  <View className="mt-[20px] flex flex-row">
                    <View className="flex">
                      <Text
                        style={GlobalStyles.cairoBold}
                        className={
                          i == 0
                            ? "text-[35px] text-left ml-[20px] mr-[10px] text-[#2B949A]"
                            : "text-[35px] text-left ml-[20px] mr-[10px] text-[#ffffff]"
                        }
                      >
                        {data.pricing}
                      </Text>
                    </View>
                    <View className="flex mt-[25px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className={
                          i == 0
                            ? "text-[14px] text-left text-[#2B949A]"
                            : "text-[14px] text-left text-[#ffffff]"
                        }
                      >
                        {i18n.t("riyal")}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-[20px] flex flex-row ml-[20px]">
                    <View className="mt-[8px]">
                      {i == 0 ? (
                        <Image
                          className="w-[14px] h-[11px]"
                          source={require("../../assets/icons/point-black.png")}
                        />
                      ) : (
                        <Image
                          className="w-[14px] h-[11px]"
                          source={require("../../assets/icons/point-white.png")}
                        />
                      )}
                    </View>
                    <View className="mt-[0px] ml-[10px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className={
                          i == 0
                            ? "text-[#262626] text-[14px]"
                            : "text-[#ffffff] text-[14px]"
                        }
                      >
                        {data.invitation}
                      </Text>
                    </View>
                    <View className="mt-[0px] ml-[10px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className={
                          i == 0
                            ? "text-[#262626] text-[14px]"
                            : "text-[#ffffff] text-[14px]"
                        }
                      >
                        ضيف لكل دعوة
                      </Text>
                    </View>
                  </View>
                  <View className="mt-[20px] flex flex-row ml-[20px]">
                    <View className="mt-[8px]">
                      {i == 0 ? (
                        <Image
                          className="w-[14px] h-[11px]"
                          source={require("../../assets/icons/point-black.png")}
                        />
                      ) : (
                        <Image
                          className="w-[14px] h-[11px]"
                          source={require("../../assets/icons/point-white.png")}
                        />
                      )}
                    </View>
                    <View className="mt-[0px] ml-[10px]">
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className={
                          i == 0
                            ? "text-[#262626] text-[14px]"
                            : "text-[#ffffff] text-[14px]"
                        }
                      >
                        {data.invitation_description_ar}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("AddSubscription", {
                        subId: data.id,
                      });
                    }}
                    className={
                      i == 0
                        ? "mt-[80px] flex justify-center h-[50px] border-[1px] border-[#2B949A] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]"
                        : "mt-[80px] flex justify-center h-[50px] bg-[#ffffff] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]"
                    }
                  >
                    <Text
                      className={
                        i == 0
                          ? "text-center text-[#2B949A] text-[16px]"
                          : "text-center text-[#2B949A] text-[16px]"
                      }
                      style={GlobalStyles.cairoBold}
                    >
                      {i18n.t("subscription-now")}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}

            <View
              style={{
                backgroundColor: "rgba(178,178,178,0.14)",
                borderColor: "rgba(178,178,178,0.45)",
              }}
              className="w-[295px] mt-[20px] ml-[10px] mr-[10px] rounded-[10px] h-[425px]"
            >
              <View className="mt-[30px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[18px] text-left ml-[20px] mr-[20px] text-[#262626]"
                >
                  test
                </Text>
              </View>
              <View className="mt-[20px] flex flex-row">
                <View className="flex">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[35px] text-left ml-[20px] mr-[10px] text-[#2B949A]"
                  >
                    {subsctiptionVal}
                  </Text>
                </View>
                <View className="flex mt-[25px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className={"text-[14px] text-left text-[#2B949A]"}
                  >
                    {i18n.t("riyal")}
                  </Text>
                </View>
              </View>
              <View className="mt-[20px] flex  ml-[20px]">
                <View className="mt-[0px] ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[#262626] text-left text-[14px]"
                  >
                    {i18n.t("no-of-guest-per-invitation")}
                  </Text>
                </View>
                <View className="mt-[10px] flex flex-row ml-[0px]">
                  <Slider
                    style={{ width: 220, height: 40 }}
                    minimumValue={100}
                    maximumValue={5000}
                    step={100}
                    minimumTrackTintColor="#2B949A"
                    maximumTrackTintColor="#EAEAEA"
                    onValueChange={(e) => {
                      setNoOfGuest((noOfGuest) => e);
                      let price = e * 0.32 + 100;
                      if (price > 200) {
                        setSubsctiptionVal(price);
                      } else {
                        setSubsctiptionVal(200);
                      }
                    }}
                  />
                  <View className="mt-[10px]">
                    <Text className="text-left  ml-[5px]">{noOfGuest}</Text>
                  </View>
                </View>
              </View>
              <View className="mt-[10px] flex  ml-[20px]">
                <View className="mt-[0px] ml-[10px]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[#262626] text-left text-[14px]"
                  >
                    {i18n.t("subscription-period-month")}
                  </Text>
                </View>
                <View className="mt-[10px] flex flex-row ml-[0px]">
                  <Slider
                    style={{ width: 220, height: 40 }}
                    minimumValue={2}
                    maximumValue={12}
                    step={1}
                    minimumTrackTintColor="#2B949A"
                    maximumTrackTintColor="#EAEAEA"
                    onValueChange={(e) => {
                      setNoOfMonth((noOfMonth) => e);
                    }}
                  />
                  <View className="mt-[10px]">
                    <Text className="text-left  ml-[5px]">{noOfMonth}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity className="mt-[30px] flex justify-center h-[50px] border-[#2B949A] border-[1px] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]">
                <Text
                  className="text-center text-[#2B949A] text-[16px]"
                  style={GlobalStyles.cairoBold}
                >
                  {i18n.t("subscription-now")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
