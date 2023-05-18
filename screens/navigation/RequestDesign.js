import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useRef, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default function RequestDesign({ navigation }) {
  const [itemType, setItemType] = useState([1, 2, 3, 4]);
  const snapPoints = useMemo(() => ["95%"], []);
  const [designShow, setdesignShow] = useState(false);
  const getDesign = async (args) => {
    //console.log(args);
    setdesignShow((designShow) => !designShow);
  };
  const ItemView = ({ item }) => {
    //console.log(item);
    return (
      <View className="flex pl-[5px] pr-[5px] border-[#B2B2B2] rounded-[10px]">
        <TouchableOpacity
          onPress={() => {
            getDesign(item);
          }}
          className="flex"
        >
          <View className="flex">
            <Image
              className="h-[175px] w-[143px] rounded-[10px]"
              source={require("../../assets/images/graduation.png")}
            />
          </View>
          <View className="flex mt-[5px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-center text-[#747474] text-[14px]"
            >
              دعوة زواج مزخرفة
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <View
        className={
          designShow
            ? "flex-1 opacity-20 flex-col bg-[#FDFDFD]"
            : "flex-1 flex-col bg-[#FDFDFD]"
        }
      >
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <ScrollView>
            <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[10px] flex-row">
              <View className="flex w-[50%]  ml-[0px] mt-[-5px]">
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[22px] text-left text-[#040404]"
                >
                  {i18n.t("request-design")}
                </Text>
              </View>
              <View className="flex w-[50%] self-center">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddRequest");
                  }}
                >
                  <Image
                    source={require("../../assets/icons/add-request.png")}
                    className="w-[15px] self-end h-[15px]"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex mt-[20px] ml-[25px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[16px] text-left text-[#040404]"
              >
                {i18n.t("current-design")}
              </Text>
            </View>
            <View
              style={{ borderColor: "rgba(178,178,178,0.45)" }}
              className=" flex bg-[#FFFFFF]  border-[1px] m-[20px] rounded-[10px]"
            >
              <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("invitation-type")} :{" "}
                  </Text>
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("marriage")}
                  </Text>
                </View>
                <View className="flex w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-right text-[#747474]"
                  >
                    28 / 09 / 2022
                  </Text>
                </View>
              </View>
              <View className="flex justify-evenly mt-[10px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    #29484
                  </Text>
                </View>
                <View className="flex w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-right text-[#747474]"
                  >
                    07:30 م
                  </Text>
                </View>
              </View>
              <View className="flex  mt-[5px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row self-center   ml-[0px] mt-[-5px]">
                  <View className="flex mr-[5px] mt-[10px]">
                    <Image
                      className="w-[11px] h-[11px]"
                      source={require("../../assets/icons/selected.png")}
                    />
                  </View>
                  <View>
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[14px] text-left text-[#3497F9]"
                    >
                      {i18n.t("work-is-underway")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{ borderColor: "rgba(178,178,178,0.45)" }}
              className=" flex bg-[#FFFFFF]  border-[1px] m-[20px] rounded-[10px]"
            >
              <View className="flex justify-evenly mt-[15px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("invitation-type")} :{" "}
                  </Text>
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    {i18n.t("marriage")}
                  </Text>
                </View>
                <View className="flex w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-right text-[#747474]"
                  >
                    28 / 09 / 2022
                  </Text>
                </View>
              </View>
              <View className="flex justify-evenly mt-[10px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-left text-[#747474]"
                  >
                    #29484
                  </Text>
                </View>
                <View className="flex w-[50%]  ml-[0px] mt-[-5px]">
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-right text-[#747474]"
                  >
                    07:30 م
                  </Text>
                </View>
              </View>
              <View className="flex  mt-[5px] ml-[15px] mr-[15px]  p-[5px] flex-row">
                <View className="flex flex-row self-center   ml-[0px] mt-[-5px]">
                  <View className="flex mr-[5px] mt-[10px]">
                    <Image
                      className="w-[11px] h-[11px]"
                      source={require("../../assets/icons/selected.png")}
                    />
                  </View>
                  <View>
                    <Text
                      style={GlobalStyles.cairoSemiBold}
                      className="text-[14px] text-left text-[#3497F9]"
                    >
                      {i18n.t("work-is-underway")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex mt-[0px] ml-[25px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[16px] text-left text-[#040404]"
              >
                {i18n.t("my-design")}
              </Text>
            </View>
            <View className="pl-[10px] mt-[20px] mb-[110px]">
              <FlatList
                data={itemType}
                horizontal={true}
                //data defined in constructor
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                //Item Separator View
                renderItem={ItemView}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
      {designShow && (
        <BottomSheet
          backgroundStyle={{
            borderTopEndRadius: 32,
            borderTopRightRadius: 32,
          }}
          enablePanDownToClose={true}
          onClose={() => {
            setdesignShow((designShow) => !designShow);
          }}
          snapPoints={snapPoints}
        >
          <ScrollView className="ml-[15px] mr-[15px] mt-[10px]">
            <View className="flex">
              <Image
                className="h-[333px] rounded-[10px] w-[80%] m-auto"
                source={require("../../assets/images/image_first.png")}
              />
            </View>
            <View className="flex pt-[20px] w-[80%] m-auto flex-row">
              <View className="mt-[10px] ml-[0px]">
                <Image
                  className="w-[14.97px] h-[11.24px]"
                  source={require("../../assets/icons/dot.png")}
                />
              </View>
              <View className="ml-[15px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#747474] text-left  text-[16px]"
                >
                  {i18n.t("change-text-background")}
                </Text>
              </View>
            </View>
            <View className="flex pt-[20px] w-[80%] m-auto flex-row">
              <View className="mt-[10px] ml-[0px]">
                <Image
                  className="w-[14.97px] h-[11.24px]"
                  source={require("../../assets/icons/dot.png")}
                />
              </View>
              <View className="ml-[15px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#747474] text-left text-[16px]"
                >
                  {i18n.t("add-invitation-details-create-import-guest-list")}
                </Text>
              </View>
            </View>
            <View className="flex pt-[20px] w-[80%] m-auto flex-row">
              <View className="mt-[10px] ml-[0px]">
                <Image
                  className="w-[14.97px] h-[11.24px]"
                  source={require("../../assets/icons/dot.png")}
                />
              </View>
              <View className="ml-[15px]">
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[#747474] text-left  text-[16px]"
                >
                  {i18n.t("track-rsvp")}
                </Text>
              </View>
            </View>
            <TouchableOpacity className=" flex justify-center h-[50px] mb-[40px] bg-[#2B949A] rounded-[8px] mt-[20px] w-[80%] ml-auto mr-auto">
              <Text
                className="text-center text-[#FFFFFF] text-[16px]"
                style={GlobalStyles.cairoBold}
              >
                {i18n.t("create-new-invitation")}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </BottomSheet>
      )}
    </>
  );
}
