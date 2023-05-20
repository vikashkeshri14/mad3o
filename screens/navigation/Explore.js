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
import * as ApiService from "../../config/config";
import apiList from "../../config/apiList.json";
import config from "../../config/config.json";
export default function Explore() {
  const snapPoints = useMemo(() => ["95%"], []);
  const [listInvitations, setListInvitations] = useState([]);
  const [filterShow, setFilterShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    getDesignData();
    getCategories();
    getFilter();
  }, []);
  const getCategories = async () => {
    let params = { url: apiList.getCategories };
    let response = await ApiService.getData(params);
    console.log(response.result);
    setCategories((categories) => response.result);
  };
  const getFilter = async () => {
    let params = { url: apiList.getFilter };
    let response = await ApiService.getData(params);
    setFilter(response.result);
  };
  const getDesignData = async () => {
    let params = { url: apiList.getcards };
    let response = await ApiService.getData(params);
    setListInvitations(response.result);
  };
  const listItem = ({ item }) => {
    //console.log(config.imgUri + "/dadabase/" + item.CardSrc);
    return (
      <View className="flex  w-[50%] pl-[0px]  justify-center  border-[#B2B2B2] rounded-[10px]">
        <View className="flex">
          <Image
            className="h-[192px] w-[92%] self-center rounded-[10px]"
            source={{
              uri: config.imgUri + "/database/" + item.CardSrc,
            }}
          />
        </View>
        <View className="flex mt-[5px]">
          <Text
            style={GlobalStyles.cairoSemiBold}
            className="text-center text-[#747474] text-[14px]"
          >
            {item.mean}
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
              {categories.length > 0 &&
                categories.map((data, i) => {
                  return (
                    <View
                      key={i}
                      style={{ borderColor: "rgba(43,148,154,0.17)" }}
                      className="flex mr-[10px] ml-[10px] mt-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
                    >
                      <Text
                        style={GlobalStyles.cairoSemiBold}
                        className="text-[14px] text-[#747474]"
                      >
                        {data.mean}
                      </Text>
                    </View>
                  );
                })}
            </View>
            {filter.length > 0 &&
              filter.map((data, i) => {
                if (data.word == "Colors") {
                  return (
                    <>
                      <View className="flex mt-[10px]">
                        <Text
                          style={GlobalStyles.cairoBold}
                          className="text-[18px] text-left text-[#262626]"
                        >
                          {data.mean}
                        </Text>
                      </View>
                      <View className="flex   flex-row flex-wrap">
                        {data.filterVal.length > 0 &&
                          data.filterVal.map((fdata, fi) => {
                            return (
                              <View
                                style={{
                                  backgroundColor: fdata.code_name,
                                  borderColor: "rgba(43,148,154,0.17)",
                                }}
                                className="w-[22px] h-[22px] mr-[10px] ml-[10px] border-[1px]  rounded-[11px] mt-[10px]"
                              ></View>
                            );
                          })}
                      </View>
                    </>
                  );
                } else {
                  return (
                    <>
                      <View className="flex">
                        <Text
                          style={GlobalStyles.cairoBold}
                          className="text-[18px] text-left text-[#262626]"
                        >
                          {i18n.t("age-group")}
                        </Text>
                      </View>
                      <View className="flex  flex-row flex-wrap">
                        {data.filterVal.length > 0 &&
                          data.filterVal.map((fdata, fi) => {
                            return (
                              <View
                                style={{ borderColor: "rgba(43,148,154,0.17)" }}
                                className="flex mr-[10px] mt-[10px] ml-[10px] border-[1px] pl-[10px] pr-[10px] pt-[5px] pb-[5px] rounded-[10px]"
                              >
                                <Text
                                  style={GlobalStyles.cairoSemiBold}
                                  className="text-[14px] text-[#747474]"
                                >
                                  {fdata.mean}
                                </Text>
                              </View>
                            );
                          })}
                      </View>
                    </>
                  );
                }
              })}

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
