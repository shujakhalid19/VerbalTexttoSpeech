import * as React from 'react';
import { ActivityIndicator,Dimensions,Appearance,View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
const {width, height} = Dimensions.get('window')
export default function App() {
  const [text,setText]=React.useState();
  const [btnstate,setBtnState]=React.useState(false);
  const [isLoading,setisLoading]=React.useState(false);
  const speak = (thingToSay) => {Speech.speak(thingToSay);};const randomJoke=()=>{setisLoading(true);fetch('https://geek-jokes.sameerkumar.website/api?format=json',{method:"GET"}).then((data)=>{return data.json()}).then((data)=>{if(data.joke.length===0){false}else{ setText(data.joke);speak(data.joke);}setisLoading(false)}).catch((e)=>{return e;});}
  return (
   <ScrollView style={s.body}>
    <View style={s.container}>
    <View style={[s.fl1,s.row]}>
        <View style={[s.fl3,s.pdtp10]}>
          <Text style={s.basetext}>Verbal.</Text>
        </View>
        <View style={[s.fl1,s.pdtp10]}>
          {
            isLoading ?
              <ActivityIndicator size={"large"} color="#0000ff" />
              :
              <TouchableOpacity onPress={()=>{
                btnstate ? speak(text) : randomJoke()}} style={[s.btn,{backgroundColor:btnstate ?'cornflowerblue' : 'rgba(160,32,240,0.6)',}]}>
                  <Text style={{color:"#FFF",fontSize:btnstate ? 18 : 14}}>{btnstate ? 'Listen': 'Random Joke'}</Text>
              </TouchableOpacity>
        }
        </View>
      </View>
      <TextInput 
        placeholder="Type words you want to hear.."
        multiline={true}
        value={text}
        textAlignVertical='top'
        placeholderTextColor="#888" 
        onChangeText={(text)=>{
          (text.length===0) ? setBtnState(false) : setBtnState(true)
          setText(text);
        }}
        style={{
          width:'100%',
          height:height/1.2,
          fontSize:22,
          paddingTop:20,
          color:"#888"
        }}
      />
    </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  body:{
    backgroundColor: Appearance.getColorScheme()==='dark' ? '#101010' : '#ecf0f1'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 28,paddingLeft:10,paddingRight:10
  },
  fl1:{
    flex:1,
  },
  fl3:{
    flex:3
  },
  row:{
    flexDirection:'row',justifyContent:'space-between'
  },
  btn:{flex:1,height:30,justifyContent:'center',alignItems:'center'},
  basetext:{
    fontSize:32,color:Appearance.getColorScheme()==='dark' ? "#FFF" : '#000'
  },
  pdtp10:{
    paddingTop:10
  },
  justCenter:{
    justifyContent:'center'
  }
})