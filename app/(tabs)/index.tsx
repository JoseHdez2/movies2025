
import Background from "@/components/Background";
import ListLogo from "@/components/list/ListLogo";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite/metrics";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import "../globals.css";

// create a react native component showing a flatlist with static data and show it in index.tsx
export default function Index() {
  const router = useRouter();

  const { 
    data: trendingMovies, 
    loading: trendingLoading, 
    error: trendingError 
  } = useFetch(() => getTrendingMovies());

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch(() => fetchMovies({ 
      query: ''
  }));

  return (
    <Background>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} 
        contentContainerStyle={{minHeight: "100%", paddingBottom: 10 }}
      >
          <ListLogo />

          { moviesLoading || trendingLoading ? (<ActivityIndicator
          size="large"
          color="#00f"
          className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text>Error : {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push('/search')} 
              placeholder="Search for a movie"
            />
            { trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white ">Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mb-4 mt-3" 
                  data={trendingMovies} 
                  renderItem={({item, index}) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                />
                
              </View>
            )}
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              <FlatList
                data={movies}
                renderItem={({item}) => (
                  <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </Background>
  );
}