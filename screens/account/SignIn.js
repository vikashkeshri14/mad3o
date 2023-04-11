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
  return (
    <View className="flex-1 flex-col bg-[#FDFDFD]">
      <SafeAreaView style={GlobalStyles.droidSafeArea}>
        <View className="flex ">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
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
        <View className="flex-1 self-center w-[100%] justify-center">
          <TextInput
            onChangeText={(e) => {
              setEmail(e);
            }}
            value={email}
            maxLength={1}
            keyboardType="email-address"
            returnKeyType="done"
            className={
              email
                ? "border-[1.5px] self-center  w-[80%] h-[50px] bg-[#E4E4E4] border-[#2B949A] text-[17px] rounded-[10px] text-[#040404] text-center"
                : "border-[1px] self-center w-[80%] h-[50px] bg-[#E4E4E4] border-[#EBEBEB] text-[17px] rounded-[10px] text-[#040404] text-center"
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
