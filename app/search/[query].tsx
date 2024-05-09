import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { Data } from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";

const Search = () => {
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite({ fn: () => searchPosts(query as string) });

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item: Data) => item.$id.toString()}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            prompt={item.prompt}
            video={item.video}
            creator={item.creator}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results :
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this query"
            btnTitle="Create video"
            href="/create"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
