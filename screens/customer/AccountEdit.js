import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import moment from "moment";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";

export default function AccountEdit({ navigation }) {
  const [loginUser, setLoginUser] = useState(null);
  const [buttonClick, setButtonClick] = useState(false);
  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
    }
  };
  return (
    <View className="flex-1 flex-col bg-[#FAFAFA]">
      {buttonClick && <ActivityIndicators />}
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex justify-start flex-row ml-[15px] mr-[15px]">
          <View className="absolute  w-full self-center ">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-center text-[#262626] text-[16px] "
            >
              {i18n.t("account-information")}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              // setShowToken(false);
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
        <KeyboardAvoidingView
          keyboardVerticalOffset="50"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex"
        >
          <ScrollView>
            <View
              style={{
                borderColor: "rgba(178,178,178,0.45)",
              }}
              className="w-[90%] pb-[30px] border-[0.5px] ml-auto mr-auto bg-[#ffffff] mt-[20px]  rounded-[10px]"
            >
              <View className="flex mt-[15px] ml-[10px] mr-[15x]">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[14px] text-[#262626] text-left "
                >
                  {i18n.t("basic-information")}
                </Text>
              </View>

              <View className="mt-[25px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("full-name")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    fullnameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setFullname}
                    value={fullname}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[15px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("full-name")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    fullnameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setFullname}
                    value={fullname}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[15px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("full-name")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    fullnameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setFullname}
                    value={fullname}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[15px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("full-name")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    fullnameError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setFullname}
                    value={fullname}
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
