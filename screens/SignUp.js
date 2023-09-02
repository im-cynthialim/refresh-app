import { auth } from '../firebase'
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
// import { useNavigation } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Pressable, Button, PressableProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../styles/styles';
import TextLabel from '../styles/props/TextLabel';

// export function SignUpScreen() {
const SignUpScreen = () => {

  const auth = getAuth();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigation.replace("Login")
  //     }
  //   })

  //   return unsubscribe
  // }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
          const userId = user.uid;
          console.log('Registered with:', user.email);
          navigation.navigate('Tutorial', {screen: 'ContainerSetup-1', params: {userId: userId}});
       
      })

      .catch(error => alert(error.message))
        
        // user.displayName = username;
  }




  return (
    <SafeAreaView style={{ backgroundColor: '#FBFEFB', flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>


      <Text style={{ fontSize: 23, textAlign: 'center', width: 230 }}>
        <Text style={[styles.regularFont, { color: '#052B2D' }]}>Start your adventure with </Text>
        <Text style={[styles.textDefault, { color: '#052B2D' }]}>Refresh.</Text>
        <Text style={[styles.regularFont, { color: '#052B2D' }]}> today</Text>
      </Text>

      <View style={{ gap: 15 }}>
        <View>
          <TextLabel label="username" />

          <TextInput
            placeholder="username"
            placeholderTextColor='#B0B6B3'
            autoCapitalize='none'
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.textbox}
          />
        </View>
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
      </View>

      <View>
        <Pressable
          style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.button]}
          onPress={() => handleSignUp()}
        >
          <Text
            style={[styles.textDefault, styles.buttonText]}> Sign Up </Text>
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
        <Pressable
          onPress={() => navigation.navigate("Login")}>

          <Text>
            <Text> Ended up on the wrong page? </Text>
            <Text style={[styles.textDefault, { textDecorationLine: 'underline' }]}>Log in here</Text>
          </Text>
        </Pressable>
      </View>


    </SafeAreaView>
  );
}

export default SignUpScreen