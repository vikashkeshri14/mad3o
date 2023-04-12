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
export default function ForgetPassword({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showToken, setShowToken] = useState(false);
  const snapPoints = useMemo(() => ["95%"], []);
  const [pin1, setPin1] = useState(1);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);

  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();
  useEffect(() => {
    console.log(route);
  }, []);
  return (
    <>
      <View className="flex-1 flex-col bg-[#FDFDFD]">
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View className="flex ">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
              className="flex mt-[10px] mb-[30px] justify-end pr-[30px] flex-row"
            >
              <View className="">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[#2B949A] text-[16px]"
                >
                  {i18n.t("retry")}
                </Text>
              </View>
              <View className="mt-[5px] ml-[10px]">
                <Image
                  className="w-[7px] h-[14px]"
                  source={require("../../assets/images/right-arrrow.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex justify-center">
            <View className="flex mt-[40px] mb-[40px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[26px] text-center text-[#040404]"
              >
                {i18n.t("forget-your-password")}
              </Text>
            </View>
            <View className="flex self-center w-[100%] mt-[60px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-center text-[#747474] text-[16px]"
              >
                {i18n.t("enter-the-register-email")}
              </Text>
            </View>
            <View className="flex self-center w-[100%] mt-[30px]">
              <TextInput
                onChangeText={(e) => {
                  setEmail(e);
                }}
                value={email}
                maxLength={1}
                keyboardType="email-address"
                returnKeyType="done"
                placeholder={i18n.t("email")}
                className={
                  email
                    ? "border-[1.5px] self-center text-right  w-[80%] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] pr-[10px] "
                    : "border-[1px] pr-[10px] self-center w-[80%] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-right"
                }
              />
            </View>
            <View className=" flex mt-[60px] mb-[0px]">
              <TouchableOpacity
                onPress={() => {
                  setShowToken(true);
                }}
                className="w-[80%] self-center flex  justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
              >
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[16px] text-center text-[#ffffff]"
                >
                  {i18n.t("submit")}
                </Text>
              </TouchableOpacity>
            </View>
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
              className="flex mt-[10px] mb-[30px] justify-end pr-[30px] flex-row"
            >
              <View className="">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[#2B949A] text-[16px]"
                >
                  {i18n.t("retry")}
                </Text>
              </View>
              <View className="mt-[5px] ml-[10px]">
                <Image
                  className="w-[7px] h-[14px]"
                  source={require("../../assets/images/right-arrrow.png")}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View className="flex mt-[15px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[26px] text-center text-[#040404]"
            >
              {i18n.t("enter-the-token-you-receives")}
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
              056953408
            </Text>
          </View>

          <View className="flex mt-[40px] flex-row w-[80%] self-center justify-around">
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
          </View>
          <View className=" flex mt-[60px] mb-[50px]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ResetPassword");
                setShowToken(false);
              }}
              className="w-[75%] self-center flex  justify-center h-[50px] rounded-[8px] bg-[#2B949A]"
            >
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[16px] text-center text-[#ffffff]"
              >
                {i18n.t("submit")}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex mt-[10px] justify-evenly flex-row">
            <View className="flex w-[45%] pl-[20px] flex-row">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[#2B949A] text-[14px]"
              >
                {i18n.t("resend-the-code")}
              </Text>
            </View>
            <View className="flex w-[45%] justify-end pr-[20px] flex-row">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[#040404] pr-[5px] pt-[2px] text-[14px]"
              >
                00:30
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
