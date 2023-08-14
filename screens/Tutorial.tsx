import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, Pressable, Button, PressableProps} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import styles from '../styles/styles';
import TextLabel from '../styles/props/TextLabel';

export function LogInScreen({ navigation }) { 

   
    return (
     <View>

      <Text> hi </Text>
    </View>
    );
  }

  export default {LogInScreen};