import Background from '@/components/Background';
import { icons } from '@/constants/icons';
import { createAnonymousSession, getCurrentSession, getUsername } from '@/services/appwrite/auth';
import { useSessionStore } from '@/stores/sessionStore';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {

  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);


  useEffect(() => {
    // Recover current session, if any
    (async function() {
      const currentSession = await getCurrentSession();
      if(currentSession){ 
        setSession(currentSession);
      }
    })();
  }, [setSession]);

  const handleAnonymousLogin = async () => {
    let newSession = await createAnonymousSession();
    setSession(newSession || null);
  }

  return (
    <Background>
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tint-color="#fff" />
        <Text className="text-gray-500 text-base">Profile</Text>
        {session ? (<>
          <Text className="text-white text-xs mt-2">Session ID: {session.$id}</Text>
          <Text className="text-accent text-lg mt-2">Username: {getUsername(session)}</Text>
        </>) : (
          <TouchableOpacity
            className="mt-4 px-4 py-2 bg-accent rounded-full"
            onPress={handleAnonymousLogin}
          >
            <Text className="text-white font-semibold">Anonymous Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </Background>
  )
}

export default Profile