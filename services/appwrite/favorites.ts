import { Client, ID, Query, TablesDB } from 'react-native-appwrite'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_TABLE_ID!

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const tables = new TablesDB(client)

const favoritesTable = {
    databaseId: DATABASE_ID,
    tableId: TABLE_ID
}

export const saveMovie = async ({
    movie,
    userId,
}: {
    movie: MovieDetails, 
    userId: string,
}) => {
    try {
        const result = await tables.createRow({
            ...favoritesTable,
            rowId: ID.unique(),
            data: {
                movie_title: movie.title,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_details: JSON.stringify(movie),
                user_id: userId
            } as FavoriteMovie
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUserFavoriteMovie = async ({
    user_id,
    movie_id
}: Pick<FavoriteMovie, "user_id" | "movie_id">) => {
    try {
        const favoriteMovie = getUserFavoriteMovie({user_id, movie_id})
        if (!favoriteMovie) {
            throw new Error(`NotFound: Could not delete user favorite: ${{user_id, movie_id}}`)
        }
        const result = await tables.deleteRow({
            ...favoritesTable,
            rowId: ID.unique()
        });
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserFavoriteMovies = async (userId: string): Promise<FavoriteMovie[] | undefined> => {
    try {
        const result = await tables.listRows({
            ...favoritesTable,
            queries: [Query.equal('user_id', userId)]
        });
        return result.rows as unknown as FavoriteMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

export const getUserFavoriteMovie = async ({user_id, movie_id}: Pick<FavoriteMovie, "user_id" | "movie_id">): Promise<FavoriteMovie[] | undefined> => {
    try {
        const result = await tables.listRows({
            ...favoritesTable,
            queries: [Query.equal('user_id', user_id), Query.equal('movie_id', movie_id)]
        });
        return result.rows as unknown as FavoriteMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}