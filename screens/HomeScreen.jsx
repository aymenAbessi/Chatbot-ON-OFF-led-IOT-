import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import uuid from 'react-native-uuid';
import { Avatar } from 'react-native-elements'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Message from '../components/Message'
import {  signOut } from "firebase/auth";
import Input from '../components/Input'
import { getDatabase, ref, onValue,set} from "firebase/database";
import { auth } from '../firebase';
import * as Speech from 'expo-speech';


const HomeScreen = ({navigation}) => {
    const scrollViewRef = useRef();
    const db = getDatabase();

    const speak = (text) => {
     
      Speech.speak(text);
    };

    useEffect(()=>{
      setTimeout(function(){
        addOrder({
        

            from:"bot",
            id:uuid.v4(),
            text:"Hi Aymen !",
            image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
        
    })
    speak('Hi Aymen !')
    }, 2000);
        if(Platform.OS==="web")
        scrollViewRef.current?.scrollIntoView({behavior:"smooth"})
    },[chats])

    const [chats,setChats]=useState([])

    function addOrder(obj){
            setChats(prev=>prev.concat(obj))
    }
    const signout= async()=>{
        const res=await signOut(auth)
        navigation.replace('Login Screen')
       }
    
    useLayoutEffect(()=>{
    navigation.setOptions({
      title:'Command your esp32 with the',
      headerStyle:{backgroundColor:"#deeff6"},
      headerTitleStyle:{color:"#1f2644",fontWeight:'bold',fontSize:15 },
    
      headerTintColor:"black",
      headerLeft: () => (
     
        <View className="ml-3 mr-2">
          <TouchableOpacity>
        <Avatar
        rounded
          source={{uri :"https://cdn.sanity.io/images/wdfaoccv/production/f6cf95ab10a0fe1435bcf3c74037c2374a39afa4-1080x1166.jpg"}}
          onPress={signout}
        />
        </TouchableOpacity>
      </View>
    
      ),
    
     
      headerRight: () => (
   
        <View style={{
          flexDirection:"row",
          justifyContent:"space-between",
          width:80,
          marginRight:20}}>
  
          <TouchableOpacity activeOpacity={0.5} >
          
          <Avatar
        rounded
          source={{uri :"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"}}
          
        />
        <Text className="text-xs font-bold">
         Botfather
        </Text>
              
          </TouchableOpacity>
         
         
        </View>
    
      ),
  
     
   
    })
  },[navigation])


  useEffect(()=>{
    var cmd=false
        if(chats[chats?.length-1]?.text==="Turns on the red led"){
            cmd=true
            set(ref(db, 'redLed' ), "on");
            setTimeout(function(){
                addOrder({
                

                    from:"bot",
                    id:uuid.v4(),
                    text:"Led red is on",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
            }, 2000);
            speak("Led red is on")
        }
        if(chats[chats?.length-1]?.text==="Turns off the red led"){
            cmd=true
            setTimeout(function(){
                set(ref(db, 'redLed' ), "off");
                addOrder({
                
                    from:"bot",
                    id:uuid.v4(),
                    text:"Led red is off",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
            speak("Led red is off")
            }, 2000);
          
        }
        if(chats[chats?.length-1]?.text==="Turns on the green led"){
            cmd=true
            set(ref(db, 'greenLed' ), "on");
            setTimeout(function(){
                addOrder({
                

                    from:"bot",
                    id:uuid.v4(),
                    text:"Led green is on",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
            speak("Led green is on")
            }, 2000);
           
        }
        if(chats[chats?.length-1]?.text==="Turns off the green led"){
            cmd=true
            set(ref(db, 'greenLed' ), "off");
            setTimeout(function(){
                addOrder({
                
                    from:"bot",
                    id:uuid.v4(),
                    text:"Led green is off",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
            speak("Led green is off")
            }, 2000);
          
        }
        if(chats[chats?.length-1]?.text==="Temperature?"){
            cmd=true
            const refdb = ref(db, 'temperature');
            onValue(refdb, (snapshot) => {
                const data = snapshot.val();
                addOrder({
                
                    from:"bot",
                    id:uuid.v4(),
                    text:data+"° C",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
            speak(data+"° Celsius")
              });

          

         
         
          
        }
        if(chats[chats?.length-1]?.text==="Humidity?"){
            cmd=true
            const refdb = ref(db, 'humidity');
            onValue(refdb, (snapshot) => {
                const data = snapshot.val();
                addOrder({
                
                    from:"bot",
                    id:uuid.v4(),
                    text:data+"%",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
           speak( data+" %")
              });
          
        }
        else if( !cmd && chats[chats?.length-1]?.from==="user" ){

            setTimeout(function(){
                addOrder({
                
                    from:"bot",
                    id:uuid.v4(),
                    text:"rong cmd,try again",
                    image:"https://cdn-icons-png.flaticon.com/512/4233/4233830.png"
                
            })
            speak("rong cmd , try again")
            }, 2000);
          
        }
  },[chats])


  return (
    <View className="bg-[#1f2644] flex-1">
     <ScrollView ref={Platform.OS==='android' || Platform.OS==='ios' ? scrollViewRef:null} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
     {chats?.map(e=><Message key={e.id} text={e.text} img={e.image} fromUser={e.from ==="bot"? false :true}/>)}
     
     </ScrollView>
     <Input Messaging={addOrder}/>
    </View>
  )
}

export default HomeScreen
// exp+smarthome://expo-development-client/?url=http%3A%2F%2F192.168.43.108%3A8081



//create master

//docker run -itd --net=hadoop -p 50070:50070 -p 8088:8088 -p 7077:7077 -p 16010:16010 --name hadoop-master --hostname hadoop-master liliasfaxi/spark-hadoop:hv-2.7.2

//create slave 1
// docker run -itd -p 8040:8042 --net=hadoop --name hadoop-slave1 --hostname hadoop-slave1 liliasfaxi/spark-hadoop:hv-2.7.2


//create slave 2
// docker run -itd -p 8041:8042 --net=hadoop --name hadoop-slave1 --hostname hadoop-slave1 liliasfaxi/spark-hadoop:hv-2.7.2


// enter on the master m
//docker exec -it hadoop-master bash