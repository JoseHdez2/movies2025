import { icons } from '@/constants/icons';
import React from 'react';
import { Image, View } from 'react-native';

const ListLogo: React.FC = () => (
    <View className='flex-row justify-center mt-20'>
        <Image source={icons.logo} className='w-16 h-16' />
    </View>
)

export default ListLogo;