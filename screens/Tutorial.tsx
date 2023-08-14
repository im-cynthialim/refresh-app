import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, Pressable, Button, PressableProps} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../hooks';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
// import auth from '@react-native-firebase/auth';


export function TutorialScreen({ navigation }) { 

    return (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
        <Text> hi </Text>
        </View>
    )
  }

  export default {TutorialScreen};