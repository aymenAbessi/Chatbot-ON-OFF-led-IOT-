import {StatusBar, Text, TextInput, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button } from '@rneui/themed';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation()
    const [email,setEmail]= useState()
    const [pass,setPass]= useState()


    useLayoutEffect(()=>{
        navigation.setOptions({
       
          headerStyle:{backgroundColor:"#182740"},
          headerTitleStyle:{color:"#d2f2f7" },
          headerTintColor:"black"})})
 
 
    const signIn = async()=>{

        try{
          const res=await signInWithEmailAndPassword(auth, email, pass)
             
             
        }catch(e){
          alert(e.message)
        }
      }

    useEffect(()=>{

        const unsub= auth.onAuthStateChanged((authUser)=>{
        
                     if(authUser){ 
                         navigation.replace('Home Screen')
                     }
             })
     
         return unsub
     },[])

  return (
    <View className="flex-1 items-center bg-[#d2f2f7]">
        <StatusBar />
        <Text className="text-2xl uppercase font-bold text-[#182740]  mt-20">Welcome My Dear User</Text>
       <View className="w-80 mt-10 justify-center items-center space-y-10">
       <TextInput className="w-80 border-b border-b-gray-400 h-10 text-lg p-1" placeholder='enter your email'  onChangeText={e=>setEmail(e)}/>
        <TextInput className="w-80 border-b border-b-gray-400 h-10 text-lg p-1" placeholder='enter your password' secureTextEntry={true} onChangeText={e=>setPass(e)}/>
       <View >
       <Button
        onPress={()=>{
            signIn()
        }}
        title="LOG IN"
        buttonStyle={{
          backgroundColor: '#48609e',
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: 'bold' }}
      />
       </View>
       </View>
       
       <Text className="mt-10 w-64"> ملحوظة🛑 : برمج هاذا التطبيق بكل شغف لغاية حصة الأشغال التطبيقية آنترنات الأشياء ♥😁</Text>
       <Text className="text-gray-500 text-sm self-start ml-10 mt-10">Copyright © 2022 Aymen Abassi</Text>
    </View>
  )
}

export default LoginScreen

