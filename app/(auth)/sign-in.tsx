import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });

      // Alert.alert("User signed in successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("An error occurred", error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => {
          setForm({ ...form, email: text });
        }}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {
          setForm({ ...form, password: text });
        }}
        label="Password"
        secureTextEntry={true}
      />

      <CustomButton
        title="Sign In"
        onPress={handleSubmit}
        isLoading={isSubmitting}
      />

      <View className="flex-center flex-row gap-2 mt-5">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href={`/sign-up`} className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
