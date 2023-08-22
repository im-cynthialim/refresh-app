import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpPage  from './screens/SignUp';
import LogInScreen from './screens/LogIn';
import TutorialScreen from './screens/Tutorial';
import HomeScreen from './screens/Home';
import ExpandContainerScreen from './screens/ExpandContainer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Font from 'expo-font'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
  
let customFonts = {
  'Rubik-Medium': require('./styles/fonts/Rubik-Medium.ttf'),
  'Rubik-Regular': require('./styles/fonts/Rubik-Regular.ttf'),
};

function NewContainerScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>NewContainer</Text>
    </View>
  );
}

function AlertsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Under Construction</Text>
    </View>
  );
}

function LogFoodScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Log Food</Text>
    </View>
  );
}

function RecipesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Under Construction</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Under Construction</Text>
    </View>
  );
}

function MainScreen() {
  return(
      <Tab.Navigator
        screenOptions = {{
          headerShown: false,
          tabBarStyle: [
            {
              alignSelf: 'center',
              flexDirection: 'row',
              height: 65,
              paddingBottom: 8,
              backgroundColor: '#FBFEFB',
            }
          ], /*+ insets.bottom for new ios versions */
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarActiveTintColor: '#248276'
        }}

        >

          <Tab.Screen 
            name = "Home" 
            component={HomeScreen} 
            options={{
              tabBarLabelStyle: {fontFamily: 'Rubik-Medium', fontSize: 9}, 
              tabBarIcon: () => (  
                <Image 
                  source={require('./assets/images/homeicon.png')} 
                  style={{
                    height: 21,
                    width: 18,
                    marginTop: 8,
                  }}/>
                ),
              }}
            />

          <Tab.Screen 
            name = "Alerts" 
            component={AlertsScreen}
            
            options={{

              tabBarLabelStyle: {fontFamily: 'Rubik-Medium', fontSize: 9}, 
              tabBarIcon: () => (
                <Image 
                  source={require('./assets/images/alertsicon.png')} 
                  style={{
                    height: 22,
                    width: 21,
                    marginTop: 8,
                  }}/>
                ),
              }}/>

          <Tab.Screen 
            name = "LogFood" 
            component={LogFoodScreen}
            options={{
              tabBarActiveTintColor: '#67B99A',
              tabBarLabelStyle: {fontFamily: 'Rubik-Medium', fontSize: 9, color: 'transparent'}, 
              tabBarIcon: () => (
                <Image 
                  source={require('./assets/images/logicon.png')} 
                  style={{
                    height: 51,
                    width: 51,
                    marginTop: 21,
                    
                  }}/>
                ),
              }}/>

          <Tab.Screen 
            name = "Recipes" 
            component={RecipesScreen}
            options={{
              tabBarLabelStyle: {fontFamily: 'Rubik-Medium', fontSize: 9}, 
              tabBarIcon: () => (
                <Image 
                  source={require('./assets/images/recipesicon.png')} 
                  style={{
                    height: 24,
                    width: 21,
                    marginTop: 8,
                  }}/>
                ),
              }}/>

          <Tab.Screen 
            name = "Account" 
            component={AccountScreen}
            options={{
              tabBarLabelStyle: {fontFamily: 'Rubik-Medium', fontSize: 9}, 
              tabBarIcon: () => (
                <Image 
                  source={require('./assets/images/profileicon.png')} 
                  style={{
                    height: 22,
                    width: 16,
                    marginTop: 8,
                  }}/>
                ),
              }}/>
        </Tab.Navigator>
  );
}


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
          initialRouteName="Tutorial"
          screenOptions = {{
            headerShown: false
          }}>
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="Login" component={LogInScreen} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
          
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="NewContainer" component={NewContainerScreen} />
          <Stack.Screen name="ExpandContainer" component={ExpandContainerScreen} />

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