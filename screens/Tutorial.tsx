import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import TextLabel from '../styles/props/TextLabel';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDatabase, ref, set } from 'firebase/database';
import WheelPicker from 'react-native-wheely';


function TutorialScreen({ route, navigation }) { 

  function addContainer (containerName, containerTemp, factorsList, userId) {
    const db = getDatabase();
    // if user has been defined (aka gone through proper signup)
    if (userId){ 
      set(ref(db, 'userprofiles/' + JSON.stringify(userId) + '/containers/'), {
        containerName: containerName
      });
    }

    else{
      navigation.navigate("Login")
    }

  }
  

  function ContainerSetup1 ({route, navigation}) {
    const userId = route.params;
    const [containerName, setContainerName] = useState('')
    // const db = getDatabase();



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

        {/* page content */}
        <View style={{alignItems: 'center', gap: 25, paddingTop: 30}}>
          <View style={{alignItems: 'center'}}>
          <Text style={[styles.subtitle, styles.textDefault, {textAlign: 'center', marginBottom: 10}]}>
            Set up your {"\n"} first container
          </Text>
          <Text style={[styles.smalltext, styles.textDefault, {textAlign: 'center', marginBottom: 16}]}>
            This is the location you'll use to {"\n"} store your foods
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
              value={containerName}
              onChangeText={text=>setContainerName(text)}
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
            // onPress={() => addContainer(containerName, userId)}
            onPress={() => navigation.navigate("ContainerSetup-2")}
          >
            <Text
              style={[styles.textDefault, styles.buttonText]}> Next </Text>
          </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  function ContainerSetup2 ({navigation}) {

    const [containerTemp, setContainerTemp] = useState('Fridge Temperature (df - asd deg F/ dfa - dfas deg C');

    return (
      <SafeAreaView style={{backgroundColor: '#FBFEFB', height: '100%'}}>
        {/* progress bar */}
        <View style={{flexDirection: 'row', paddingTop: 12, justifyContent: 'center', gap: 5}}>
          <View style={{borderRadius: 64, backgroundColor: '#EDEDED', width: '30%'}}>
            <View style={{zIndex: 1, borderRadius: 64, backgroundColor: '#052B2D', width: '60%', height: 10}}/>
          </View>
          <View style={{borderRadius: 64, backgroundColor: '#EDEDED', width: '30%'}}/>
          <View style={{borderRadius: 64, backgroundColor: '#EDEDED', width: '30%', height: 10}}/>
          
        </View>

        {/* page content */}
        <View style={{alignItems: 'center', gap: 25, paddingTop: 30}}>
          <View style={{alignItems: 'center'}}>
          <Text style={[styles.subtitle, styles.textDefault, {textAlign: 'center', marginBottom: 10}]}>
            Set up your {"\n"} first container
          </Text>
          {/* <Text style={[styles.smalltext, styles.textDefault]}>
            This is the location you'll use to
          </Text>
          <Text style={[styles.smalltext, styles.textDefault, {marginBottom: 16}]}>
            store your foods
          </Text> */}

          <View style={[styles.horizontalRule]} />
          </View>

          <View style={{alignItems: 'center'}}>
            <Text style={[styles.label, styles.textDefault, {textAlign: 'center', marginBottom: 10}]}>
              Choose the temperature {"\n"} of your container

            </Text>
            <Text style={[styles.smalltext, styles.textDefault, {marginBottom: 13}]}>
              You can make changes to this later
            </Text>

          <WheelPicker
            options ={['Room Temperature \n(70 °F / 21 °C)', 'Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)', 'Freezer Temperature \n(0 °F / -18 °C)']}
            selected={'Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)'}
            onChange={(temp) => setContainerTemp(temp)}
            itemHeight={55}
            selectedIndicatorStyle={{alignSelf: 'center'}}
            containerStyle={{width: '70%'}}
            itemTextStyle = {{fontFamily: 'Rubik-Medium', fontSize: 14, textAlign: 'center'}}
          />
          </View>
          <View style={{marginTop: 20}}>
            <Pressable
            style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
            onPress={() => navigation.navigate("ContainerSetup-3")}
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
        initialRouteName="ContainerSetup-2"
        screenOptions = {{
          headerShown: false
        }}>
        <Tutorial.Screen name="ContainerSetup-1" component={ContainerSetup1}/>
        <Tutorial.Screen name="ContainerSetup-2" component={ContainerSetup2}/>
        {/* <Tutorial.Screen name="ContainerSetup-3" component={ContainerSetup3}/> */}
      </Tutorial.Navigator>
    );
  }


  export default TutorialScreen;