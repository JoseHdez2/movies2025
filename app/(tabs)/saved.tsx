import Background from '@/components/Background'
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Saved = () => {
  return (
    <Background>
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tint-color="#fff" />
        <Text className="text-gray-500 text-base">Saved</Text>
      </View>
    </Background>
  )
}

export default Saved