import { images } from "@/constants";
import useAuthStore from "@/store/auth.store";
import { Redirect, Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

const AuthLayout = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // adjust if header present
      >
        <ScrollView
          className="flex-1"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            className="w-full relative"
            style={{ height: Dimensions.get("screen").height / 2.5 }}
          >
            <ImageBackground
              source={images.loginGraphic}
              className="size-full rounded-b-lg"
              resizeMode="stretch"
            />
            <Image
              source={images.logo}
              className="self-center size-48 absolute -bottom-16 z-10"
            />
          </View>

          <View className="flex-1">
            <Slot />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthLayout;
