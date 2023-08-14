import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogInScreen } from './screens/LogIn';

import SignUpScreen  from './screens/SignUp';
import { TutorialScreen } from './screens/Tutorial';

import * as Font from 'expo-font'


const Stack = createNativeStackNavigator();
  
let customFonts = {
  'Rubik-Medium': require('./styles/fonts/Rubik-Medium.ttf'),
  'Rubik-Regular': require('./styles/fonts/Rubik-Regular.ttf'),
};


export default class App extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  
  
  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <NavigationContainer>
         <Stack.Navigator 
          initialRouteName="SignUp"
          screenOptions = {{
            headerShown: false
          }}>
          <Stack.Screen name="LogIn" component={LogInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});