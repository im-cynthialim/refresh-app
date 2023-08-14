import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { TextInput, Text, Pressable, View, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

import TextLabel from '../styles/props/TextLabel';
import styles from '../styles/styles';

export function LogInScreen({navigation}) {
// const LogInScreen = () => {

  const auth = getAuth();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const navigation = useNavigation()


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.navigate("LogIn")
  //     }

  //     else {
  //       navigation.navigate("SignUp")
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  const handleLogin = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate("Main")
      })
      .catch(error => alert(error.message))
  }

  // const handleSignOut = () => {
  //   auth
  //     .signOut()
  //     .then(() => {
  //       navigation.navigate("LogIn")
  //     })
  //     .catch(error => alert(error.message))
  // }

  return (
    <SafeAreaView style={{ backgroundColor: '#FBFEFB', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
        <View style={{gap: 20}}>
          <Image
                source = {require('../assets/images/lettucelogo.png')}
                style={{width: 88, height: 95, marginBottom: 28, alignSelf: 'center'}}
          /> 
        <View>
          <TextLabel label="email" />

          <TextInput
            placeholder="email"
            placeholderTextColor='#B0B6B3'
            autoCapitalize='none'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.textbox}
          />

        </View>

        <View>
          <TextLabel label="password" />

          <TextInput
            placeholder="password"
            placeholderTextColor='#B0B6B3'
            autoCapitalize='none'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.textbox}
            secureTextEntry={true}
          />

        </View>
        <Pressable>
          <Text style={[styles.textDefault, { fontSize: 9, alignSelf: 'flex-end', textDecorationLine: 'underline' }]}>
            Forgot your password?
          </Text>
        </Pressable>
      </View>

      <View>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.button]}
          onPress={() => handleLogin()}
        >
          <Text
            style={[styles.textDefault, styles.buttonText]}> Log In </Text>
        </Pressable>
      </View>
      <View style={styles.horizontalRule} />


      <View style={styles.linkLogInButton}>
        <Pressable>
          <Text style={[styles.textDefault, styles.linkLogIn, { alignItems: 'center', color: '#B0B6B3', width: 222 }]}>Sign Up with Google</Text>

        </Pressable>
      </View>
      <View style={styles.linkLogInButton}>
        <Pressable>
          <Text style={[styles.textDefault, styles.linkLogIn, { alignItems: 'center', color: '#B0B6B3', width: 222 }]}>Sign Up with Facebook</Text>

        </Pressable>
      </View>

      <View style={{ flexDirection: 'row' }}>


        <Text> Not sure how you got here? </Text>
        <Pressable
          onPress={() => navigation.navigate("SignUp")}>
          <Text style={[styles.textDefault, { textDecorationLine: 'underline' }]}>Sign up now</Text>
        </Pressable>
      </View>







    </SafeAreaView>
  );
}

export default LogInScreen
