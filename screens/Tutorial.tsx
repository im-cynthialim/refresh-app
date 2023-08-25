import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, Pressable, Button, PressableProps, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import styles from '../styles/styles';
import TextLabel from '../styles/props/TextLabel';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function TutorialScreen({ navigation }) { 

  function ContainerSetup1() {
    return (
      <SafeAreaView style={{backgroundColor: '#FBFEFB', height: '100%'}}>
        {/* progress bar */}
        <View style={{flexDirection: 'row', paddingTop: 12, justifyContent: 'center', gap: 5}}>
          <View style={{borderRadius: 64, backgroundColor: '#EDEDED', width: '30%'}}>
            <View style={{zIndex: 1, borderRadius: 64, backgroundColor: '#052B2D', width: '30%', height: 10}}/>
          </View>
          <View style={{borderRadius: 64, backgroundColor: '#EDEDED', width: '30%'}}/>
          <View style={{borderRadius: 64, backgroundColor: '#EDEDED', width: '30%', height: 10}}/>
          
        </View>
        {/* content */}
        {/* <View
        style={{paddingHorizontal: 17, paddingTop: 17}}>
          <Pressable
            style={{backgroundColor: 'blue', zIndex: 1}}
            onPress = {() => "Signup"}>
            <Image
              source={require('../assets/images/arrowicon-green.png')}
              style={{ width: 9, height: 14, marginBottom: 28, alignSelf: 'flex-start'}}
            />
          </Pressable>

        </View> */}
        <View style={{alignItems: 'center', gap: 25, paddingTop: 30}}>
          <View style={{alignItems: 'center'}}>
          <Text style={[styles.subtitle, styles.textDefault]}>
            Set up your
          </Text>
          <Text style={[styles.subtitle, styles.textDefault, {marginBottom: 10}]}>
            first container
          </Text>
          <Text style={[styles.smalltext, styles.textDefault]}>
            This is the location you'll use to
          </Text>
          <Text style={[styles.smalltext, styles.textDefault, {marginBottom: 16}]}>
            store your foods
          </Text>

          <View style={[styles.horizontalRule]} />
          </View>

          <View style={{alignItems: 'center'}}>
          <Text style={[styles.label, styles.textDefault, {marginBottom: 10}]}>
            Choose a name for your container
          </Text>
          <Text style={[styles.smalltext, styles.textDefault, {marginBottom: 13}]}>
            You can make changes to this later
          </Text>      
            <TextInput
              placeholder={'Fridge'}
              placeholderTextColor={'#B0B6B3'}
              // onChangeText={}
              style={
              [styles.textbox,
                {
                backgroundColor: "#F2F2F2",
                color: '#052B2D', 
                paddingHorizontal: 9,
                borderRadius: 3,
                justifyContent: 'center', 
                paddingVertical: 14,
                }
              ]}
              />
          </View>
          <View style={{marginTop: 20}}>
            <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
            onPress={() => "ContainerSetup-1"}
          >
            <Text
              style={[styles.textDefault, styles.buttonText]}> Next </Text>
          </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const Tutorial = createNativeStackNavigator();
   
    return (
     <Tutorial.Navigator
        initialRouteName="ContainerSetup-1"
        screenOptions = {{
          headerShown: false
        }}>
        <Tutorial.Screen name="ContainerSetup-1" component={ContainerSetup1}/>
      </Tutorial.Navigator>
    );
  }


  export default TutorialScreen;