import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect, useMemo } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export default function Explore() {
  const snapPoints = useMemo(() => ["95%"], []);
  const [listInvitations, setListInvitations] = useState([
    1, 2, 3, 4, 5, 7, 8, 9, 0, 10, 11, 12,
  ]);
  const [filterShow, setFilterShow] = useState(false);

  const listItem = ({ item }) => {
    return (
      <View className="flex  w-[50%] pl-[0px]  justify-center  border-[#B2B2B2] rounded-[10px]">
        <View className="flex">
          <Image
            className="h-[192px] w-[92%] self-center rounded-[10px]"
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
      </View>
    );
  };

  const ItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 20, width: 1 }} />
    );
  };
  return (
    <>
      <View
        className={
          filterShow
            ? "flex-1 opacity-10 flex-col bg-[#FDFDFD]"
            : "flex-1 flex-col bg-[#FDFDFD]"
        }
      >
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <View className="flex justify-evenly  flex-row">
            <View className="flex w-[50%] justify-center  pl-[20px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-left text-[#040404] text-[22px]"
              >
                {i18n.t("browse-design")}
              </Text>
            </View>
            <View className="flex w-[50%] justify-center mt-[8px] pr-[20px]">
              <TouchableOpacity
                onPress={() => {
                  setFilterShow((filterShow) => !filterShow);
                }}
              >
                <Image
                  className="w-[20px] self-end  h-[20px] "
                  source={require("../../assets/icons/filter.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex pl-[20px] pr-[20px] mt-[15px]">
            <FlatList
              data={listInvitations}
              //data defined in constructor
              ItemSeparatorComponent={ItemSeparator}
              //Item Separator View
              numColumns={2}
              renderItem={listItem}
              contentContainerStyle={
                Platform.OS == "android"
                  ? { paddingBottom: 250 }
                  : { paddingBottom: 280 }
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </SafeAreaView>
      </View>
      {filterShow && (
        <BottomSheet
          backgroundStyle={{
            borderTopEndRadius: 32,
            borderTopRightRadius: 32,
          }}
          enablePanDownToClose={true}
          onClose={() => {
            setFilterShow((filterShow) => !filterShow);
          }}
          snapPoints={snapPoints}
        >
          <View className="flex mt-[0px]">
            <Text
              style={GlobalStyles.cairoBold}
              className="text-[26px] text-center text-[#040404]"
            >
              {i18n.t("filter")}
            </Text>
          </View>
          <View
            style={{ borderColor: "rgba(43,148,154,0.17)" }}
            className=" mt-[5px]  border-t-[1px]"
          ></View>
          <ScrollView className="ml-[15px] mr-[15px] mt-[10px]">
            <View className="flex">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-left text-[#262626]"
              >
                {i18n.t("categories")}
              </Text>
            </View>

            <View className="flex   flex-row flex-wrap">
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] ml-[10px] mt-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("exhibition-conference")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex  mr-[10px] mt-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("baby-shower")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] mt-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("graduation")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] mt-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("birthday")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] mt-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("wedding")}
                </Text>
              </View>
            </View>
            <View className="flex">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-left text-[#262626]"
              >
                {i18n.t("age-group")}
              </Text>
            </View>
            <View className="flex mt-[10px]  flex-row flex-wrap">
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("children")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex  mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("youth")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("adult")}
                </Text>
              </View>
            </View>
            <View className="flex mt-[10px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-left text-[#262626]"
              >
                {i18n.t("card-with-number")}
              </Text>
            </View>
            <View className="flex mt-[10px]  flex-row flex-wrap">
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("yes")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex  mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("no")}
                </Text>
              </View>
            </View>
            <View className="flex mt-[10px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-left text-[#262626]"
              >
                {i18n.t("picture")}
              </Text>
            </View>
            <View className="flex   flex-row flex-wrap">
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px] mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("without-photo")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px] mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("one-picture")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px]  mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("two-picture")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px] mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("more-photo")}
                </Text>
              </View>
            </View>

            <View className="flex mt-[10px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-left text-[#262626]"
              >
                {i18n.t("call-id")}
              </Text>
            </View>
            <View className="flex   flex-row flex-wrap">
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px] mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("cheerful")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px] mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("luxury")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px]  mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("classic")}
                </Text>
              </View>
              <View
                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                className="flex mt-[10px] mr-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
              >
                <Text
                  style={GlobalStyles.cairoSemiBold}
                  className="text-[14px] text-[#747474]"
                >
                  {i18n.t("modern")}
                </Text>
              </View>
            </View>
            <View className="flex mt-[10px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[18px] text-left text-[#262626]"
              >
                {i18n.t("color")}
              </Text>
            </View>
            <View className="flex   flex-row flex-wrap">
              <View className="w-[22px] h-[22px] bg-[#C40000] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#076FE8] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#25A00E] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#747474] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#DECE07] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#262626] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#93278F] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#F2559E] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#FFFFFF] border-[1px] border-[#E4E4E4] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#45B5E6] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#E56100] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#C9B38B] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#1204BE] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#886402] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
              <View className="w-[22px] h-[22px] bg-[#ffff00] mr-[10px] ml-[10px] rounded-[11px] mt-[10px]"></View>
            </View>
            <View className="w-full flex mt-[25px] mb-[120px]">
              <TouchableOpacity
                onPress={() => {
                  setFilterShow((filterShow) => !filterShow);
                }}
                className="  self-start rounded-[10px] flex justify-center w-[120px] h-[50px] bg-[#2B949A]"
              >
                <Text
                  style={GlobalStyles.cairoBold}
                  className="text-[#fff]  text-center "
                >
                  {i18n.t("apply")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BottomSheet>
      )}
    </>
  );
}
