import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";

export default function ActivityIndicators(props) {
  return (
    <ActivityIndicator
      className="absolute opacity-[0.7] top-0 left-0 bottom-0 right-0 self-center justify-center z-50 bg-black"
      size="large"
      color="#60BA62"
    />
  );
}
