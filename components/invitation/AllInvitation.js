import {
  View,
  Text,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";
import i18n from "../../hooks/Language";
import * as SecureStore from "expo-secure-store";
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
import moment from "moment";
import ActivityIndicators from "../activityindicator/ActivityIndicators";

export default function AllInvitation(props) {
  const [listInvitations, setListInvitations] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [curDate, setCurDate] = useState(new Date());
  const [load, setLoad] = useState(false);
  useEffect(() => {
    getValueAuth();
    console.log(props);
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
      status: "all",
      userId: id,
    };
    let params = { url: apiList.getAllEventByUserId, body: obj };
    let response = await ApiService.postData(params);
    if (response) {
      setListInvitations(response.result);
      setLoad(true);
    } else {
      setLoad(true);
    }
    // console.log(obj);
  };
  const listItem = ({ item }) => {
    let endDate = new Date(item.EndDate1);

    return (
      <TouchableOpacity
        onPress={() => {
          props.navigate.navigate("EventDetails", item);
        }}
      >
        <View className="flex border-[1px] pl-[0px]  border-[#B2B2B2] rounded-[10px] flex-row-reverse">
          <View className=" flex">
            <Image
              className="h-[127px] w-[105px] rounded-tr-[10px] rounded-br-[10px]"
              source={{
                uri: config.imgUri + "/database/" + item.usercards[0].CardSrc,
              }}
            />
          </View>
          <View className="flex flex-col ">
            <View className="mt-[10px]  pr-[20px]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[16px] text-right text-[#747474]"
              >
                {item.EventTitle}
              </Text>
            </View>
            <View className="pr-[20px] mt-[10px]">
              <Text
                style={GlobalStyles.cairoSemiBold}
                className="text-[14px] text-right text-[#ADADAD]"
              >
                {moment(item.Date1).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View className="flex flex-row-reverse mt-[10px] pr-[20px]">
              <View className="mt-[6px]">
                {item.Ended == "1" || curDate > endDate ? (
                  <Image
                    className="w-[15px] h-[15px]"
                    source={require("../../assets/icons/ended.png")}
                  />
                ) : (
                  <Image
                    className="w-[15px] h-[15px]"
                    source={require("../../assets/icons/ongoing.png")}
                  />
                )}
              </View>
              <View className="pr-[5px]">
                {item.Ended == "1" || curDate > endDate ? (
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-[#2B949A]/[0.43]"
                  >
                    {i18n.t("ended")}
                  </Text>
                ) : (
                  <Text
                    style={GlobalStyles.cairoBold}
                    className="text-[14px] text-[#2B949A]"
                  >
                    {i18n.t("efective")}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
      {load ? (
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
      ) : (
        <ActivityIndicators />
      )}
    </View>
  );
}
