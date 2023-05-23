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
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import * as SecureStore from "expo-secure-store";
import ActivityIndicators from "../../components/activityindicator/ActivityIndicators";

export default function Register({ navigation }) {
  const snapPoints = useMemo(() => ["90%"], []);
  const [showToken, setShowToken] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpasswword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCpasswwordError] = useState(false);
  const [resendShow, setResendShow] = useState(false);
  const [counter, setCounter] = useState("00:60");
  const [buttonClick, setButtonClick] = useState(false);
  const [pin1, setPin1] = useState(null);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);
  const [otpValue, setOtpValue] = useState(null);
  const [key, onChangeKey] = useState("LoginUser");
  const saveUser = async (key, value) => {
    const auth = JSON.stringify(value);
    await SecureStore.setItemAsync(key, auth);
    return true;
  };
  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();

  const getOtp = async () => {

    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;



    if (!name) {
      setNameError(true);
      return;
    }
    if (!email) {
      setEmailError(true);
      return;
    }
    if (!emailRegexp.test(email)) {
      setEmailError(true);
      return;
    }
    if (!mobile) {
      setMobileError(true);
      return;
    }
    if (!password) {
      setPasswordError(true);
      return;
    }
    if (!cpassword) {
      setCpasswwordError(true);
      return;
    }
    if (cpassword != password) {
      setCpasswwordError(true);
      return;
    }


    timer()
    let otpNumber = Math.floor(Math.random() * 9000) + 1000;
    alert("Otp value" + otpNumber);
    setOtpValue(otpNumber);

    setShowToken(true);
  };
  const register = async () => {
    if (!pin1 || !pin2 || !pin3 || !pin4) {
      alert(i18n.t("please-fill-the-otp"));
      return false;
    }
    setButtonClick(true);
    let pin = pin1 + "" + pin2 + "" + "" + pin3 + "" + pin4;
    if (pin == otpValue) {
      const obj = {
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        type: "User",
      };
      let params = { url: apiList.register, body: obj };
      let response = await ApiService.postData(params);
      if (response.success) {
        setButtonClick(false);
        const save = await saveUser(key, response.result[0]);
        navigation.navigate("BottomNavigation", { screen: "Home" });
      } else {
        setButtonClick(false);
      }
    } else {
      alert(i18n.t("please-fill-the-otp"));
    }
  };
  const timer = async () => {
    let counterVal = 60;
    let counterText = "00:60";
    setResendShow(false);
    var oneSecInterval = setInterval(() => {
      // console.log(counter);
      counterVal--;
      counterText = "00:" + counterVal;
      setCounter((counter) => counterText);
      if (counterVal == 0) {
        setResendShow(true);
        clearInterval(oneSecInterval);
      }
    }, 1000);
  };



  const resendOtp = async () => {
    let otp = Math.floor(Math.random() * 9000) + 1000;
    timer();
    //alert("otp" + otp);
    if (otp) {
      alert("Otp value" + otp);
      setOtpValue(otp);
      //setOtpShow(true);
      // setOtpVerifyEnable(true);
      // const obj = {
      //   phone: number,
      //   otp: otp,
      // };
      // let params = { url: apiList.sendOtp, body: obj };
      // let response = await ApiService.postData(params);
      pin1Ref.current.focus();
    }
  };

  return (
    <>
      {buttonClick && <ActivityIndicators />}
      <View
        className={
          showToken
            ? "opacity-[0.5] bg-[#040404]"
            : "flex-1 flex-col bg-[#FDFDFD]"
        }
      >
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View className="flex flex-col">
            <View className="flex mt-[10px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[26px] text-center text-[#040404]"
              >
                {i18n.t("create-an-account-to-invite")}
              </Text>
            </View>
            <ScrollView>
              <View className="flex mb-[95px]">
                <View className="flex mt-[20px] ml-[20px] mr-[20px] border-[0.5px] border-[#B2B2B2] rounded-[10px] bg-white">
                  <View
                    className={
                      nameError
                        ? "ml-[20px] mr-[20px] bg-[#E4E4E4] flex justify-center h-[48px] border-[1px] border-[#D10000] mt-[40px] rounded-[10px]"
                        : "ml-[20px] mr-[20px] bg-[#E4E4E4] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]"
                    }
                  >
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pl-[10px] pr-[10px]"
                      placeholder={i18n.t("full-name")}
                      onChangeText={(e) => {
                        setName(e);
                      }}
                      value={name}
                      returnKeyType="done"
                      style={GlobalStyles.cairoRegular}
                      placeholderTextColor="#ADADAD"
                    ></TextInput>
                  </View>
                  <View
                    className={
                      emailError
                        ? "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#D10000] mt-[40px] rounded-[10px]"
                        : "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]"
                    }
                  >
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pl-[10px] pr-[10px]"
                      placeholder={i18n.t("email")}
                      returnKeyType="done"
                      onChangeText={(e) => {
                        setEmail(e);
                      }}
                      value={email}
                      placeholderTextColor="#ADADAD"
                      style={GlobalStyles.cairoRegular}
                    ></TextInput>
                  </View>
                  <View
                    className={
                      mobileError
                        ? "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#D10000] mt-[40px] rounded-[10px]"
                        : "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]"
                    }
                  >
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pl-[10px] pr-[10px]"
                      placeholder={i18n.t("phone")}
                      onChangeText={(e) => {
                        setMobile(e);
                      }}
                      value={mobile}
                      returnKeyType="done"
                      placeholderTextColor="#ADADAD"
                      style={GlobalStyles.cairoRegular}
                    ></TextInput>
                  </View>
                  <View
                    className={
                      passwordError
                        ? "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#D10000] mt-[40px] rounded-[10px]"
                        : "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]"
                    }
                  >
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pl-[10px] pr-[10px]"
                      placeholder={i18n.t("password")}
                      keyboardType="default"
                      secureTextEntry={true}
                      onChangeText={(e) => {
                        setPassword(e);
                      }}



                      value={password}
                      style={GlobalStyles.cairoRegular}
                      placeholderTextColor="#ADADAD"


                    ></TextInput>
                  </View>
                  <View
                    className={
                      cpasswordError
                        ? "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#D10000] mt-[40px] rounded-[10px]"
                        : "ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]"
                    }
                  >
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pl-[10px]  pr-[10px]"
                      placeholder={i18n.t("cpassword")}
                      keyboardType="default"
                      secureTextEntry={true}
                      onChangeText={(e) => {
                        setCpasswword(e);
                      }}
                      value={cpassword}
                      style={GlobalStyles.cairoRegular}
                      placeholderTextColor="#ADADAD"
                    ></TextInput>
                  </View>
                  <View className=" flex mt-[60px] mb-[50px]">
                    <TouchableOpacity
                      onPress={() => {
                        getOtp();
                        //navigation.navigate("Register");
                      }}
                      className="ml-[20px] mr-[20px] flex justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
                    >
                      <Text
                        style={GlobalStyles.cairoBold}
                        className="text-[16px] text-center text-[#ffffff]"
                      >
                        {i18n.t("create-an-account")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className="flex mt-[20px] ml-[40px] mr-[40px] justify-around flex-row">
                  <View className="border-t-[0.5px] mt-[10px] h-[0.5px] basis-[42%] border-[#E4E4E4]"></View>
                  <View className="flex  basis-[6%]">
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="pt-[0px] leading-[24px] text-[16px]"
                    >
                      {i18n.t("or")}
                    </Text>
                  </View>
                  <View className="border-t-[0.5px] mt-[10px] h-[0.5px] basis-[42%] border-[#E4E4E4]"></View>
                </View>
                <View className="flex mt-[20px]">
                  <View>
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[#747474] text-center text-[16px]"
                    >
                      {i18n.t("do-you-have-account")}
                    </Text>
                  </View>
                </View>
                <View className="flex mt-[20px]">
                  <TouchableOpacity
                    onPress={() => {
                      setShowToken(false);
                      navigation.navigate("SignIn");
                    }}
                  >
                    <View>
                      <Text
                        style={GlobalStyles.cairoBold}
                        className="text-[#2B949A] text-center text-[14px]"
                      >
                        {i18n.t("sign-in")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
      {showToken && (
        <BottomSheet
          backgroundStyle={{ borderTopEndRadius: 32, borderTopRightRadius: 32 }}
          snapPoints={snapPoints}
        >
          <View className="flex ">
            <TouchableOpacity
              onPress={() => {
                setShowToken(false);
              }}
              className="flex mt-[10px] mb-[30px] justify-start pl-[20px] flex-row"
            >
              <View className="mt-[8px] ml-[10px]">
                <Image
                  className="w-[7px] h-[14px]"
                  source={require("../../assets/images/right-arrrow.png")}
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
          </View>
          <View className="flex mt-[15px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[26px] text-center text-[#040404]"
            >
              {i18n.t("mobile-number-activation")}
            </Text>
          </View>
          <View className="flex  mt-[20px] self-center w-[80%]">
            <Text
              style={GlobalStyles.cairoRegular}
              className="text-[16px] text-center"
            >
              {i18n.t(
                "to-complete-the-activation-process-please-enter-the-code"
              )}{" "}
              {mobile}
            </Text>
          </View>

          <View className="flex mt-[40px] flex-row w-[80%] self-center justify-around">
            <TextInput
              ref={pin4Ref}
              onChangeText={(pin4) => {
                setPin4(pin4);
                pin4 ? "" : pin3Ref.current.focus();
              }}
              value={pin4}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="done"
              className={
                pin4
                  ? "border-[1.5px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] text-center"
                  : "border-[1px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-center"
              }
            />
            <TextInput
              ref={pin3Ref}
              onChangeText={(pin3) => {
                setPin3(pin3);
                pin3 ? pin4Ref.current.focus() : pin2Ref.current.focus();
              }}
              value={pin3}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="done"
              className={
                pin3
                  ? "border-[1.5px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] text-center"
                  : "border-[1px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-center"
              }
            />
            <TextInput
              ref={pin2Ref}
              onChangeText={(pin2) => {
                setPin2(pin2);
                pin2 ? pin3Ref.current.focus() : pin1Ref.current.focus();
              }}
              value={pin2}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="done"
              className={
                pin2
                  ? "border-[1.5px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] text-center"
                  : "border-[1px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-center"
              }
            />
            <TextInput
              ref={pin1Ref}
              onChangeText={(pin1) => {
                setPin1(pin1);
                pin1 ? pin2Ref.current.focus() : "";
              }}
              value={pin1}
              maxLength={1}
              keyboardType="numeric"
              returnKeyType="done"
              className={
                pin1
                  ? "border-[1.5px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] text-center"
                  : "border-[1px] ml-[5px] w-[54px] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-center"
              }
            />




          </View>
          <View className=" flex mt-[60px] mb-[50px]">
            <TouchableOpacity
              onPress={() => {
                register()
              }}
              className="w-[75%] self-center flex  justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
            >
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[16px] text-center text-[#ffffff]"
              >
                {i18n.t("activate-account")}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex mt-[10px] justify-evenly flex-row">
            <View className="flex w-[45%] pl-[20px] flex-row">
              <TouchableOpacity
                disabled={!resendShow}
                onPress={() => {
                  if (resendShow) {
                    resendOtp();
                  }
                }}
              >
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[#2B949A] text-[14px]"
                >
                  {i18n.t("resend-the-code")}
                </Text></TouchableOpacity>
            </View>
            <View className="flex w-[45%] justify-end pr-[20px] flex-row">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[#040404] pl-[5px] pt-[6px] text-[14px]"
              >
                {counter}
              </Text>
              <Image
                className="w-[18.84px] mt-[7px] h-[18.84px]"
                source={require("../../assets/icons/timer.png")}
              />
            </View>
          </View>
        </BottomSheet>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  textInput: {
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
