import React from 'react';
import { FlatList, Text, View, Image } from 'react-native';

interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  poster: string;
}

const staticMovieData: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    year: 1994,
    genre: 'Drama',
    rating: 9.3,
    poster: 'https://via.placeholder.com/100x150/4A90E2/FFFFFF?text=Movie+1'
  },
  {
    id: '2',
    title: 'The Godfather',
    year: 1972,
    genre: 'Crime',
    rating: 9.2,
    poster: 'https://via.placeholder.com/100x150/50C878/FFFFFF?text=Movie+2'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    year: 2008,
    genre: 'Action',
    rating: 9.0,
    poster: 'https://via.placeholder.com/100x150/FF6B6B/FFFFFF?text=Movie+3'
  },
  {
    id: '4',
    title: 'Pulp Fiction',
    year: 1994,
    genre: 'Crime',
    rating: 8.9,
    poster: 'https://via.placeholder.com/100x150/FFD93D/FFFFFF?text=Movie+4'
  },
  {
    id: '5',
    title: 'Forrest Gump',
    year: 1994,
    genre: 'Drama',
    rating: 8.8,
    poster: 'https://via.placeholder.com/100x150/A8E6CF/FFFFFF?text=Movie+5'
  }
];

const MovieItem: React.FC<{ item: Movie }> = ({ item }) => (
  <View className="flex-row bg-gray-100 rounded-lg p-4 mb-3 shadow-sm">
    <Image 
      source={{ uri: item.poster }}
      className="w-16 h-24 rounded-md mr-4"
      resizeMode="cover"
    />
    <View className="flex-1 justify-between">
      <View>
        <Text className="text-lg font-bold text-gray-800 mb-1">
          {item.title}
        </Text>
        <Text className="text-sm text-gray-600 mb-1">
          {item.year} • {item.genre}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-sm font-semibold text-yellow-600">
          ⭐ {item.rating}
        </Text>
      </View>
    </View>
  </View>
);

const MovieList: React.FC = () => {
  return (
    <View className="flex-1 px-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top Movies
      </Text>
      <FlatList
        data={staticMovieData}
        renderItem={({ item }) => <MovieItem item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default MovieList;
