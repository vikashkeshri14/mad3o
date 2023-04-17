import { View, Text, FlatList, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";

export default function AllInvitation(props) {
  const [listInvitations, setListInvitations] = useState([1, 2]);
  //useEffect(() => {}, [props]);
  const listItem = ({ item }) => {
    return (
      <View className="flex border-[1px] pl-[0px]  border-[#B2B2B2] rounded-[10px] flex-row">
        <View className=" flex">
          <Image
            className="h-[127px] w-[105px] rounded-tl-[10px]"
            source={require("../../assets/images/graduation.png")}
          />
        </View>
        <View className="flex flex-col ">
          <View className="mt-[10px]  pl-[20px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[16px] text-[#747474]"
            >
              تخرج مدرسة
            </Text>
          </View>
          <View className="pl-[20px] mt-[10px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-left text-[#ADADAD]"
            >
              21/2/2023
            </Text>
          </View>
          <View className="flex flex-row mt-[10px] pl-[20px]">
            <View className="mt-[6px]">
              <Image
                className="w-[15px] h-[15px]"
                source={require("../../assets/icons/ended.png")}
              />
            </View>
            <View className="pl-[5px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[14px] text-[#2B949A]/[0.43]"
              >
                {i18n.t("ended")}
              </Text>
            </View>
          </View>
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
    <View className="flex mt-[10px]">
      <FlatList
        data={listInvitations}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparator}
        //Item Separator View
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
  );
}
