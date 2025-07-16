import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import Searchbar from "@/components/Searchbar";
import { getCategories } from "@/lib/category";
import useAppwrite from "@/lib/hooks/useAppwrite";
import { getMenu } from "@/lib/menu";
import { Category, MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();

  const { data, loading, error, refetch } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({ category, query, limit: 6 });

    return () => {};
  }, [category, query]);

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="text-dark-100 paragraph-semibold">
                    Find your favourite food
                  </Text>
                </View>
              </View>

              <CartButton />
            </View>

            <Searchbar />
            <Filter categories={categories as Category[]} />
          </View>
        )}
        data={data || []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => {
          const isFirstRightColItem = index % 2 === 0;

          return (
            <View
              className={cn(
                `flex-1 max-w-[48%]`,
                !isFirstRightColItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListEmptyComponent={() =>
          !loading ? (
            <Text>No results</Text>
          ) : (
            <ActivityIndicator size={`large`} />
          )
        }
      />
    </SafeAreaView>
  );
};

export default Search;
