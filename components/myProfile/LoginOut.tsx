import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/config/FirebaseConfig'
import { useRouter } from 'expo-router'
export default function LoginOut() {

    const myRouter = useRouter()
const LogUserOut= ()=>{
signOut(auth).then(()=>{
    myRouter.replace("/auth/Sign-in")
})
}
  return (
    <View>
      <TouchableOpacity onPress={() => LogUserOut()}>
        <Text className='bg-primary-200 p-3 rounded-2xl text-white font-semibold text-lg text-center'>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}