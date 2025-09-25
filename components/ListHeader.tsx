import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface ListHeaderProps {
  imageSource: ImageSourcePropType;
  text: string;
}

const ListHeader: React.FC<ListHeaderProps> = ({ imageSource, text }) => (
  <View className="flex justify-center items-center flex-1 max-h-40 flex-col gap-5">
    <Image source={imageSource} className="size-10" tintColor="#fff" />
    <Text className="text-gray-500 text-base">{text}</Text>
  </View>
);

export default ListHeader;
