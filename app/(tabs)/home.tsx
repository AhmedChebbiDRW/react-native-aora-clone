import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending, { Data } from "../../components/Trending";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useGlobalContext();

  const { data: posts, isLoading, refetch } = useAppwrite({ fn: getAllPosts });
  const { data: latestPosts, refetch: refetchLatest } = useAppwrite({
    fn: getLatestPosts,
  });

  const onrefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchLatest();
    setRefreshing(false);
  };

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
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="Be the first one to upload a video"
            btnTitle="Create video"
            href="/create"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onrefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
