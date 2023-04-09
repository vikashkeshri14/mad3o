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
export default function Register({ navigation }) {
  const snapPoints = useMemo(() => ["90%"], []);
  const [showToken, setShowToken] = useState(false);
  const [pin1, setPin1] = useState(1);
  const [pin2, setPin2] = useState(null);
  const [pin3, setPin3] = useState(null);
  const [pin4, setPin4] = useState(null);

  const pin1Ref = useRef();
  const pin2Ref = useRef();
  const pin3Ref = useRef();
  const pin4Ref = useRef();
  return (
    <>
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
              <View className="flex mb-[65px]">
                <View className="flex mt-[20px] ml-[20px] mr-[20px] border-[0.5px] border-[#B2B2B2] rounded-[10px] bg-white">
                  <View className="ml-[20px] mr-[20px] bg-[#E4E4E4] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pr-[10px]"
                      placeholder={i18n.t("full-name")}
                      style={GlobalStyles.cairoRegular}
                      placeholderTextColor="#ADADAD"
                    ></TextInput>
                  </View>
                  <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pr-[10px]"
                      placeholder={i18n.t("email")}
                      placeholderTextColor="#ADADAD"
                      style={GlobalStyles.cairoRegular}
                    ></TextInput>
                  </View>
                  <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pr-[10px]"
                      placeholder={i18n.t("phone")}
                      placeholderTextColor="#ADADAD"
                      style={GlobalStyles.cairoRegular}
                    ></TextInput>
                  </View>
                  <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pr-[10px]"
                      placeholder={i18n.t("password")}
                      placeholderTextColor="#ADADAD"
                      style={GlobalStyles.cairoRegular}
                    ></TextInput>
                  </View>
                  <View className="ml-[20px] bg-[#E4E4E4] mr-[20px] flex justify-center h-[48px] border-[1px] border-[#E4E4E4] mt-[40px] rounded-[10px]">
                    <TextInput
                      className="text-right h-[48px] text-[#040404] text-[14px] pr-[10px]"
                      placeholder={i18n.t("cpassword")}
                      style={GlobalStyles.cairoRegular}
                      placeholderTextColor="#ADADAD"
                    ></TextInput>
                  </View>
                  <View className=" flex mt-[60px] mb-[50px]">
                    <TouchableOpacity
                      onPress={() => {
                        //navigation.navigate("Register");
                        setShowToken(true);
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
                  <View>
                    <Text
                      style={GlobalStyles.cairoBold}
                      className="text-[#2B949A] text-center text-[14px]"
                    >
                      {i18n.t("sign-in")}
                    </Text>
                  </View>
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
              056953408
            </Text>
          </View>

          <View className="flex mt-[40px] flex-row w-[80%] self-center justify-around">
            <TextInput
              ref={pin1Ref}
              onChangeText={(pin1) => {
                setPin1(pin1);
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
                navigation.navigate("Register");
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
