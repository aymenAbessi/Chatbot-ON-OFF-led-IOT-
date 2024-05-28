import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import uuid from 'react-native-uuid';
import Ionicons from '@expo/vector-icons/Ionicons';

const Input = ({Messaging}) => {
    const [input,setInput]=useState()


    const sendMsg=()=>{
     
                Messaging({
                    from:"user",
                    id:uuid.v4(),
                    text:input,
                    image:"https://cdn.sanity.io/images/wdfaoccv/production/f6cf95ab10a0fe1435bcf3c74037c2374a39afa4-1080x1166.jpg"
                })
                setInput("")
    }
  return (
    <View style={styles.footer} className="space-x-4">
    
    <TextInput placeholder='Signals Message' style={styles.input} onChangeText={(text)=>setInput(text)} value={input} onSubmitEditing={()=>console.log('')}/>
 
    <TouchableOpacity onPress={sendMsg}>
      <Ionicons name="send" size={24} color="#505ea0"/>
    </TouchableOpacity>
   
</View>
  )
}
const styles = StyleSheet.create({

   
    footer:{
        flexDirection:"row",
        alignItems:"center",
        
        width:"100%",
        padding:15
    },
    input:{
      buttom:0,
      height:40,
      flex:1,
      marginRight:15,
      backgroundColor:"#ececec"
      ,color:"gray",
      borderRadius:30,
      padding:10
  
    },})



export default Input