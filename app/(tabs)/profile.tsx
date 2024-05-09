import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import { Data } from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { router } from "expo-router";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { user, setIsLoggedIn, setUser } = useGlobalContext();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite({ fn: () => getUserPosts(user.$id) });

  const onrefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    signOut()
      .then(() => {
        router.replace("/sign-in");
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((e: any) => {
        Alert.alert("Error", e.message);
      });
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
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user.avatar }}
                resizeMode="cover"
                className="w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={user?.username || user?.email}
              titleStyles={"mt-5"}
              containerStyles={"text-lg"}
            />
            <View className="mt-5 flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                titleStyles={"text-xl"}
                containerStyles={"mr-10"}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles={"text-xl"}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this profile"
            btnTitle="Back to Explore"
            href="/home"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onrefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
