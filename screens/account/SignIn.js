import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import * as SecureStore from "expo-secure-store";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";
export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [credential, setCredential] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [key, onChangeKey] = useState("LoginUser");
  const saveUser = async (key, value) => {
    const auth = JSON.stringify(value);
    await SecureStore.setItemAsync(key, auth);
    return true;
  };
  const login = async () => {
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);
    setButtonClick(true);
    const obj = {
      mobile: email,
      password: password,
    };
    let params = { url: apiList.loginUser, body: obj };
    let response = await ApiService.postData(params);
    //console.log(response.result);
    if (response.success) {
      setButtonClick(false);
      const save = await saveUser(key, response.result[0]);
      setCredential(false);
      navigation.navigate("BottomNavigation", { screen: "Home" });
    } else {
      setButtonClick(false);
      setCredential(true);
    }
  };
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      {buttonClick && <ActivityIndicators />}

      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex ">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
            className="flex mt-[10px] mb-[30px] justify-start pl-[20px] flex-row"
          >
            <View className="mt-[8px] ml-[10px]">
              <Image
                className="w-[7px] h-[14px]"
                source={require("../../assets/images/right-arrrow.png")}
              />
            </View>
            <View className=" ml-[10px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[#2B949A] text-[16px]"
              >
                {i18n.t("back")}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex mt-[40px] ">
          <Text
            style={GlobalStyles.cairoBold}
            className="text-[26px] text-center text-[#040404]"
          >
            {i18n.t("sign-in")}
          </Text>
        </View>
        <View className="flex mt-[100px] justify-center self-center w-[100%]">
          {credential && (
            <View className="flex w-[100%]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-center text-[16px] text-[#D10000]"
              >
                اعتماد خاطئ
              </Text>
            </View>
          )}

          <View className="flex self-center w-[100%] ">
            <TextInput
              onChangeText={(e) => {
                setEmail(e);
              }}
              value={email}
              keyboardType="email-address"
              returnKeyType="done"
              placeholder={i18n.t("enter-mobile-or-email")}
              className={
                emailError
                  ? "border-[1.5px] pr-[10px] pl-[10px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#D10000] text-[17px] rounded-[10px] text-[#040404] "
                  : email
                    ? "border-[1.5px] pr-[10px] pl-[10px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] "
                    : "border-[1px] pr-[10px] pl-[10px] self-center w-[80%] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-right"
              }
            />
          </View>
          <View className="flex self-center w-[100%] mt-[20px]">
            <TextInput
              onChangeText={(e) => {
                setPassword(e);
              }}
              value={password}
              keyboardType="default"
              returnKeyType="done"
              secureTextEntry={true}
              placeholder={i18n.t("pass-head")}
              className={
                passwordError
                  ? "border-[1.5px] pr-[10px] pl-[10px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#D10000] text-[17px] rounded-[10px] text-[#040404] "
                  : password
                    ? "border-[1.5px] pr-[10px] pl-[10px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] "
                    : "border-[1px] pr-[10px] pl-[10px] self-center w-[80%] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-right"
              }
            />
          </View>
          <View className=" flex mt-[60px] mb-[0px]">
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("Register");
                login();
              }}
              className="w-[80%] self-center flex  justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
            >
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[16px] text-center text-[#ffffff]"
              >
                {i18n.t("sign-in")}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex mt-[20px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ForgetPassword");
              }}
            >
              <Text
                style={GlobalStyles.cairoBold}
                className="text-center text-[14px] text-[#2B949A]"
              >
                {i18n.t("forget-your-password")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
