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
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpasswword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCpasswwordError] = useState("");
  const [key, onChangeKey] = useState("LoginUser");
  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser((loginUser) => user);
      setFullname(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
    }
  };
  const saveUser = async (key, value) => {
    const auth = JSON.stringify(value);
    await SecureStore.setItemAsync(key, auth);
    return true;
  };
  const updateUser = async () => {
    setButtonClick(true);
    if (!fullname) {
      setFullnameError(true);
      return;
    }
    setFullnameError(false);
    if (!email) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    if (!mobile) {
      setMobileError(true);
    }
    setMobileError(false);
    if (password) {
      if (password.length < 6) {
        setPasswordError(true);
        return;
      }
    }
    setPasswordError(false);
    if (cpassword) {
      if (cpassword.length < 6) {
        setCpasswwordError(true);
        return;
      }
    }
    setCpasswwordError(false);

    if (password != cpassword) {
      setCpasswwordError(true);
      return;
    }
    setCpasswwordError(false);

    const obj = {
      name: fullname,
      email: email,
      mobile: mobile,
      password: password,
      userId: loginUser.id,
    };
    let params = { url: apiList.updateAccount, body: obj };
    let response = await ApiService.postData(params);
    if (response.success) {
      setButtonClick(false);
      console.log(response);
      const save = await saveUser(key, response.result[0]);
      if (save) {
        getValueAuth();
        alert("User updated successfully");
      }

      // navigation.navigate("BottomNavigation", { screen: "Home" });
    } else {
      setButtonClick(false);
      if (response.check == "2") {
        alert("Mobile exists");
      }
      if (response.check == "3") {
        alert("Email exists");
      }
      if (response.check == "4") {
        alert("Something went wrong try again");
      }
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
                    {i18n.t("email")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    emailError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setEmail}
                    value={email}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("email")}
                  />
                </View>
              </View>
              <View className="mt-[15px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("phone")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    mobileError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setMobile}
                    value={mobile}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("phone")}
                  />
                </View>
              </View>
              <View className="mt-[15px]">
                <View className="flex ml-[20px] mr-[20x]">
                  <Text
                    style={GlobalStyles.cairoSemiBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("password")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    passwordError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setPassword}
                    value={password}
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
                    {i18n.t("cpassword")}
                  </Text>
                </View>

                <View
                  style={{ backgroundColor: "rgba(228,228,228,0.29)" }}
                  className={
                    cpasswordError
                      ? "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#EF1414] border-[1px] ml-[20px]"
                      : "mt-[5px]  h-[48px] rounded-[10px] pl-[10px] pr-[10px] mr-[20px] border-[#E4E4E4] border-[1px] ml-[20px]"
                  }
                >
                  <TextInput
                    style={GlobalStyles.cairoRegular}
                    className="text-[14px] text-right text-[#040404] h-[48px]"
                    onChangeText={setCpasswword}
                    value={cpassword}
                    returnKeyType="done"
                    placeholderTextColor="#040404"
                    placeholder={i18n.t("full-name")}
                  />
                </View>
              </View>
              <View className="mt-[25px]">
                <TouchableOpacity
                  onPress={() => {
                    updateUser();
                  }}
                  className="mt-[30px] flex justify-center bg-[#2B949A] h-[50px] border-[#2B949A] border-[1px] rounded-[8px] mb-[20px] ml-[20px]  mr-[20px]"
                >
                  <Text
                    className="text-center text-[#ffffff] text-[16px]"
                    style={GlobalStyles.cairoBold}
                  >
                    {i18n.t("save-changes")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
