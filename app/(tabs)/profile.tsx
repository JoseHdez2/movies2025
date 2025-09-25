import Background from '@/components/Background';
import { icons } from '@/constants/icons';
import { createAnonymousSession, getCurrentSession } from '@/services/appwrite/auth';
import { useSessionStore } from '@/stores/sessionStore';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {

  const sessionId = useSessionStore((state) => state.sessionId);
  const setSessionId = useSessionStore((state) => state.setSessionId);


  useEffect(() => {
    // Recover current session, if any
    (async function() {
      const currentSession = await getCurrentSession()
      if(currentSession){ 
        setSessionId(currentSession?.$id) 
      }
    })()
  }, [])

  const handleAnonymousLogin = async () => {
    let session = await createAnonymousSession();
    setSessionId(session?.$id || null);
  }

  return (
    <Background>
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tint-color="#fff" />
        <Text className="text-gray-500 text-base">Profile</Text>
        {sessionId ? (
          <Text className="text-white text-xs mt-2">Session ID: {sessionId}</Text>
        ) : (
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