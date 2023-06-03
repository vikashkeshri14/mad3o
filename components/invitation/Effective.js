import { View, Text, FlatList, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
export default function Effective(props) {
  const [listInvitations, setListInvitations] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    getValueAuth();
  }, []);
  const getValueAuth = async () => {
    let result = await SecureStore.getItemAsync("LoginUser");
    if (result) {
      let user = JSON.parse(result);
      setLoginUser(user);
      getEvent(user.id);
    }
  };

  const getEvent = async (id) => {
    const obj = {
      status: "1",
      userId: id,
    };
    let params = { url: apiList.getAllEventByUserId, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      setListInvitations(response.result);
    }
    // console.log(obj);
  };

  //useEffect(() => {}, [props]);
  const listItem = ({ item }) => {
    return (
      <View className="flex border-[1px] pl-[0px]  border-[#B2B2B2] rounded-[10px] flex-row">
        <View className=" flex">
          <Image
            className="h-[127px] w-[105px] rounded-tr-[10px]"
            source={{
              uri: config.imgUri + "/database/" + item.usercards[0].CardSrc,
            }}
          />
        </View>
        <View className="flex flex-col ">
          <View className="mt-[10px]  pl-[20px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[16px] text-left text-[#747474]"
            >
              {item.EventTitle}
            </Text>
          </View>
          <View className="pl-[20px] mt-[10px]">
            <Text
              style={GlobalStyles.cairoSemiBold}
              className="text-[14px] text-left text-[#ADADAD]"
            >
              {moment(item.Date1).format("DD/MM/YYYY")}
            </Text>
          </View>
          <View className="flex flex-row mt-[10px] pl-[20px]">
            <View className="mt-[6px]">
              <Image
                className="w-[15px] h-[15px]"
                source={require("../../assets/icons/ongoing.png")}
              />
            </View>
            <View className="pl-[5px]">
              <Text
                style={GlobalStyles.cairoBold}
                className="text-[14px] text-[#2B949A]"
              >
                {i18n.t("ongoing")}
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
            ? { paddingBottom: 350 }
            : { paddingBottom: 280 }
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
