import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const Searchbar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query);

  const handleSearch = (text: string) => {
    setQuery(text);

    if (!text.trim()) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query?.trim()) router.setParams({ query });
  };

  return (
    <View className="searchbar">
      {/* <Text>Searchbar</Text> */}
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers, etc."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor="#a0a0a0"
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />

      <TouchableOpacity
        className="pr-5"
        onPress={() => router.setParams({ query })}
      >
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor={`#5d5f6d`}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Searchbar;
