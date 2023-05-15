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
export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
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
                email
                  ? "border-[1.5px] pr-[10px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] "
                  : "border-[1px] pr-[10px] self-center w-[80%] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-right"
              }
            />
          </View>
          <View className="flex self-center w-[100%] mt-[20px]">
            <TextInput
              onChangeText={(e) => {
                setPassword(e);
              }}
              value={password}
              keyboardType="visible-password"
              returnKeyType="done"
              secureTextEntry={true}
              placeholder={i18n.t("pass-head")}
              className={
                password
                  ? "border-[1.5px] pr-[10px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] "
                  : "border-[1px] pr-[10px] self-center w-[80%] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-right"
              }
            />
          </View>
          <View className=" flex mt-[60px] mb-[0px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
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
