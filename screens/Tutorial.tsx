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
        <View style={{alignItems: 'center'}}>
          <Text style={[styles.subtitle, styles.textDefault]}>
            Set up your first container
          </Text>
          <Text style={[styles.smalltext, styles.textDefault]}>
            This is the location you'll use to store your foods
          </Text>
          <View style={styles.horizontalRule} />

          <Text style={[styles.label, styles.textDefault]}>
            Choose a name for your container
          </Text>
          <Text style={[styles.smalltext, styles.textDefault]}>
            You can make changes to this later
          </Text>

      
            <TextInput
              placeholder={ 'e.g. Fridge'}
              placeholderTextColor={'#B0B6B3'}
              // onChangeText={}
              style={
              [styles.textDefault, styles.label,
                {
                height: 35,
                width: '70%',
                backgroundColor: "#F2F2F2",
                color: '#052B2D', 
                paddingHorizontal: 8,
                borderRadius: 3,
                justifyContent: 'center', 
                paddingVertical: 14,
                }
              ]}
              />
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