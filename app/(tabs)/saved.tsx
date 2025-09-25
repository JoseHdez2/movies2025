import Background from '@/components/Background'
import { icons } from '@/constants/icons'
import { getAllUserFavoriteMovies } from '@/services/appwrite/favorites'
import useFetch from '@/services/useFetch'
import { useSessionStore } from '@/stores/sessionStore'
import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Saved = () => {

  const session = useSessionStore((state) => state.session);

  const {data: savedMovies, loading: savedMoviesLoading, error: savedMoviesError} = useFetch(
    () => getAllUserFavoriteMovies(session?.userId!))

  return (
    <Background>
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tint-color="#fff" />
        <Text className="text-gray-500 text-base">Saved</Text>
         { savedMoviesLoading ? (<ActivityIndicator
                  size="large"
                  color="#00f"
                  className="mt-10 self-center"
                  />
                ) : savedMoviesError ? (
                  <Text>Error: {savedMoviesError.message}</Text>
                ) : (
                  <FlatList
                    data={savedMovies}
                    renderItem={({item}) => <Text>{JSON.stringify(item)}</Text> }
                  />
                ) }
      </View>
    </Background>
  )
}

export default Saved