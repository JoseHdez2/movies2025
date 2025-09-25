import Background from '@/components/Background'
import ListHeader from '@/components/ListHeader'
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import { getAllUserFavoriteMovies } from '@/services/appwrite/favorites'
import useFetch from '@/services/useFetch'
import { useSessionStore } from '@/stores/sessionStore'
import React from 'react'
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native'

const Saved = () => {

  const session = useSessionStore((state) => state.session);

  const {
    data: savedMovies,
    loading: savedMoviesLoading,
    error: savedMoviesError
  } = useFetch(
    () => getAllUserFavoriteMovies(session?.userId!))

  return (
    <Background>
      <ListHeader imageSource={icons.save} text="Saved Movies" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {savedMoviesLoading ? (<ActivityIndicator
          size="large"
          color="#00f"
          className="mt-10 self-center"
        />
        ) : savedMoviesError ? (
          <Text>Error: {savedMoviesError.message}</Text>
        ) : savedMovies && savedMovies?.length > 0 ? (
          <FlatList
            keyExtractor={(item) => item.movie_id.toString()}
            numColumns={3}
            data={savedMovies}
            renderItem={({ item }) => (
              <MovieCard {...{
                id: item.movie_id,
                title: item.movie_title,
                poster_path: item.poster_url,
                vote_average: (JSON.stringify(item.movie_details) as unknown as MovieDetails).vote_average
              }}
              />
            )}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 20,
              paddingRight: 5,
              marginBottom: 10
            }}
            scrollEnabled={false}
          />
        ) : (
          <View className="flex justify-center items-center flex-1 flex-col gap-5">
            <Text className="text-gray-500 text-base">No Saved Movies</Text>
          </View>
        )}
      </ScrollView>
    </Background>
  )
}

export default Saved