import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'

const Message = ({fromUser,text,img}) => {
  return (
    <View className={`w-48 h-16  relative  mt-3 ml-2 ${fromUser && 'self-end'}`}>
      <View>
      <Text className={`p-2   text-base font-bold text-[#140f07] rounded-2xl bg-[#90a1fa]    ${fromUser && 'bg-[#d2f2f7]'}  `}>{text}</Text>
      <View   className={`absolute top-8 left-0 ${fromUser && 'right-0 left-40 top-8'} `}>
      <Avatar
        rounded
      
          source={{uri :img}}
          
        />
      </View>
      </View>
    </View>
  )
}

export default Message