import { View, Text, FlatList, Image, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../hooks/GlobalStyles";

export default function AllInvitation(props) {
  const [listInvitations, setListInvitations] = useState([1, 2]);
  useEffect(() => {}, [props]);
  const listItem = ({ item }) => {
    return (
      <View className="flex w-full h-[403px] ">
        <View className="border-[1px] w-[100%] bg-black h-[403px]">
          <Text
            style={GlobalStyles.cairoBold}
            className="text-[21px] text-[#2B949A]"
          >
            test
          </Text>
        </View>
      </View>
    );
  };
  const ItemSeparator = () => {
    return (
      //Item Separator
      <View style={{ height: 10, width: 1 }} />
    );
  };
  return (
    <View className="flex mt-[10px]">
      <FlatList
        data={listInvitations}
        horizontal={false}
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
