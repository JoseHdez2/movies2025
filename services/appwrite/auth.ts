import { Account, Client, Models } from "react-native-appwrite";
import { adjectives, animals, colors, uniqueNamesGenerator } from 'unique-names-generator';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)


export const createAnonymousSession = async () => {
    const account = new Account(client);

    try {
    
    const session: Models.Session  = await account.createAnonymousSession();
    
    return session

    } catch (error) {
        console.error('Error creating anonymous session: ', error)
    }
}

export const getCurrentSession = async () => {
    const account = new Account(client);
    try {
        const session: Models.Session = await account.getSession({sessionId: 'current'});
        return session;
    } catch (error) {
        console.error('Error getting current session: ', error);
        return null;
    }
}

export const getUsername = (session: Models.Session): string => (
    session.provider === "anonymous" ? getAnonymousUsername(session.userId) : session.userId
)

export const getAnonymousUsername = (userId: string) => (
    uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 2,
        separator: '-',
        style: 'capital',
        seed: parseInt(userId)
      })
)