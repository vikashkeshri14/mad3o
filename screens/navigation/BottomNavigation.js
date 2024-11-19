import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Menu from "./Menu";
import RequestDesign from "./RequestDesign";
import Explore from "./Explore";
import AddRequest from "../request/AddRequest";

const Tab = createBottomTabNavigator();
export default function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        showLabel: false,
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 100,
          },

          shadowOpacity: 0.88,
          shadowRadius: 30.0,
          elevation: 8,
          borderTopWidth: 0,
          position: "absolute",
          borderTopLeftRadius: 0,
          borderTopWidth: 1,
          borderColor: "#E4E4E4",
          borderTopRightRadius: 0,
          height: 90,
        },
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        component={Home}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                {focused ? (
                  <View className="flex flex-col self-center justify-center">
                    <View className="self-center">
                      <Image
                        source={require("../../assets/icons/focus-home.png")}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    {/* <View className="self-center">
                      <Text
                        style={GlobalStyle.sstbold}
                        className="text-[10px] text-[#60BA62]"
                      >
                        {i18n.t("profile")}
                      </Text>
                    </View> */}
                  </View>
                ) : (
                  <View className="flex flex-col self-center justify-center">
                    <View className="self-center">
                      <Image
                        source={require("../../assets/icons/home.png")}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    {/* <View className="self-center">
                      <Text
                        style={GlobalStyle.sstmedium}
                        className="text-[10px] text-[#959494]"
                      >
                        {i18n.t("profile")}
                      </Text>
                    </View> */}
                  </View>
                )}
              </View>
            ),
            unmountOnBlur: true,
          };
        }}
      />
      <Tab.Screen
        name="Explore"
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        component={Explore}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                {focused ? (
                  <View className="flex flex-col self-center justify-center">
                    <View className="self-center">
                      <Image
                        source={require("../../assets/icons/focus-explore.png")}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    {/* <View className="self-center">
                      <Text
                        style={GlobalStyle.sstbold}
                        className="text-[10px] text-[#60BA62]"
                      >
                        {i18n.t("requests")}
                      </Text>
                    </View> */}
                  </View>
                ) : (
                  <View className="flex flex-col self-center justify-center">
                    <View className="self-center">
                      <Image
                        source={require("../../assets/icons/explore.png")}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    {/* <View className="self-center">
                      <Text
                        style={GlobalStyle.sstmedium}
                        className="text-[10px] text-[#959494]"
                      >
                        {i18n.t("requests")}
                      </Text>
                    </View> */}
                  </View>
                )}
              </View>
            ),
            unmountOnBlur: true,
          };
        }}
      />
      <Tab.Screen
        name="AddRequestHome"
        component={AddRequest}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => (
              <View className="  ">
                <Image
                  className="w-[51px]   h-[51px]"
                  source={require("../../assets/icons/add.png")}
                ></Image>
              </View>
            ),
            unmountOnBlur: false,
          };
        }}
      />
      <Tab.Screen
        name="RequestDesign"
        component={RequestDesign}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 5,
                }}
              >
                {focused ? (
                  <View className="flex flex-col self-center  justify-center">
                    <View className="self-center">
                      <Image
                        source={require("../../assets/icons/focus-request-design.png")}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    {/* <View className="self-center">
                      <Text
                        style={GlobalStyle.sstbold}
                        className="text-[10px] text-[#60BA62]"
                      >
                        {i18n.t("messages")}
                      </Text>
                    </View> */}
                  </View>
                ) : (
                  <View className="flex flex-col self-center justify-center">
                    <View className="self-center">
                      <Image
                        source={require("../../assets/icons/request-design.png")}
                        resizeMode="contain"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </View>
                    {/* <View className="self-center">
                      <Text
                        style={GlobalStyle.sstmedium}
                        className="text-[10px] text-[#959494]"
                      >
                        {i18n.t("messages")}
                      </Text>
                    </View> */}
                  </View>
                )}
              </View>
            ),
            unmountOnBlur: true,
          };
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={({ navigation }) => {
          return {
            tabBarLabel: () => {},
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("BottomNavigation", {
                    screen: "Menu",
                  })
                }
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    top: 5,
                  }}
                >
                  {focused ? (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Image
                          source={require("../../assets/icons/focus-menu.png")}
                          resizeMode="contain"
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />
                      </View>
                      {/* <View className="self-center">
                        <Text
                          style={GlobalStyle.sstbold}
                          className="text-[10px] text-[#60BA62]"
                        >
                          {i18n.t("Main")}
                        </Text>
                      </View> */}
                    </View>
                  ) : (
                    <View className="flex flex-col self-center justify-center">
                      <View className="self-center">
                        <Image
                          source={require("../../assets/icons/menu.png")}
                          resizeMode="contain"
                          style={{
                            width: 24,
                            height: 24,
                          }}
                        />
                      </View>
                      {/* <View className="self-center">
                        <Text
                          style={GlobalStyle.sstmedium}
                          className="text-[10px] text-[#959494]"
                        >
                          {i18n.t("Main")}
                        </Text>
                      </View> */}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ),
            unmountOnBlur: true,
          };
        }}
      />
    </Tab.Navigator>
  );
}
