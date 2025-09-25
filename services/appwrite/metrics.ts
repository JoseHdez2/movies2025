import { Client, ID, Query, TablesDB } from 'react-native-appwrite'

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

// const result = await

const tables = new TablesDB(client)
const metricsTable = {
    databaseId: DATABASE_ID,
    tableId: COLLECTION_ID
}

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await tables.listRows({
            ...metricsTable, queries: [Query.equal('searchTerm', query)]
        });

        if (result.rows.length > 0) {
            const existingMovie = result.rows[0];
            await tables.updateRow({
                ...metricsTable,
                rowId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1
                } as Pick<TrendingMovie, 'count'>
            });
        } else {
            await tables.createRow({
                ...metricsTable,
                rowId: ID.unique(),
                data: {
                    title: movie.title,
                    searchTerm: query,
                    movie_id: movie.id,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                } as TrendingMovie
            });
        }
        return result
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateMovieCheckCount = async (movie: MovieDetails) => {
    try {
        const result = await tables.listRows({
            ...metricsTable, queries: [Query.equal('movie_id', movie?.id)]
        });

        if (result.rows.length > 0) {
            const existingMovie = result.rows[0];
            await tables.updateRow({
                ...metricsTable,
                rowId: existingMovie.$id,
                data: {
                    count: existingMovie.count + 1
                }
            });
        } else {
            await tables.createRow({
                ...metricsTable,
                rowId: ID.unique(),
                data: {
                    title: movie.title,
                    searchTerm: '',
                    movie_id: movie.id,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
            });
        }
        return result
    } catch (error) {
        console.log(error)
        throw error
    }

}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await tables.listRows({
            ...metricsTable,
            queries: [Query.limit(5), Query.orderDesc('count')]
        });
        return result.rows as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
