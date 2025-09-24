import Layout from '@/components/Layout'
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Profile = () => {
  return (
    <Layout>
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tint-color="#fff" />
        <Text className="text-gray-500 text-base">Profile</Text>
      </View>
    </Layout>
  )
}

export default Profile