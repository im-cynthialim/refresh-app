import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, TextInput, View, Image, Pressable, Button, PressableProps } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';

function ExpandContainerScreen({route, navigation}) {

  const {itemdata} = route.params;

 
  type ContainerContents = {
    containername: string;
    description: string;
    products: string[][];
    
  }


  const DATA: ItemData[] =[
    {
      name: "Fridge",
      description: "hello",
      products: ["tomato", "lettuce"],
    },
    {
      name: "test2",
      description: "world",
      products: ["cucumber", "toast"],
    },
    //  {
    //    name: "test",
    //    description: "hello",
    //    products: ["tomato", "lettuce"],
    // },
    // {
    //   name: "",
    //   description: "na",
    //   products: ["na"],
    // }
    // {
    //   name: "test",
    //   description: "hello",
    //   products: ["tomato", "lettuce", "burger"],
    // },
    // {
    //   name: "test",
    //   description: "hello",
    //   products: ["tomato", "lettuce", "burger"],
    // },
    // {
    //   name: "test",
    //   description: "hello",
    //   products: ["tomato", "lettuce", "burger"],
    // },
  ];

    type ItemData = {
      name: string;
      description: string;
      products: string[];
    };

    type ItemProps = {
      item: ItemData;
    };

    type ItemProduct = {
      name: string;
      note: string;
    };

    type inputData = {
      searchinput: string;
    };

    type productData = {
      productlist: string[];
    };

    const renderItem = ({item}: {item: ItemData}) => {

      return (
        <View style={{backgroundColor: '#052B2D', paddingVertical: 18, borderRadius: 8, paddingHorizontal: 19, marginTop: 9, marginHorizontal: 9, width: 'auto', height: 'auto'}}>
          <View
            style = {{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
         
            <Text style={[styles.subtitle, {color: '#FBFEFB'}]}> {item.name}</Text>
            <Pressable
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                borderWidth: 1,
                backgroundColor: '#FBFEFB',
                borderRadius: 37,
                width: 25,
                height: 17,
              }}
              onPress={
                () => navigation.navigate('ExpandContainer')
              }
              >
              <Image
                source = {require('../assets/images/arrowicon-green.png')}
                style = {{
                  alignSelf: 'center',
                  transform: [{rotateY: '180deg'}],
                  width: 4.5,
                  height: 7,
                }}
                />
              </Pressable>
          </View>
          <Text style={{color: '#FBFEFB', paddingVertical: 10}}> {item.description}</Text>
          {/* <ContainerDisplay productlist={item.products}/> */}

          
        </View>

      );
  };

    return (
      <View style={{ 
        backgroundColor: '#FBFEFB',
        height: '100%',
         }}>
  
        
        <SafeAreaView
          style={{
            justifyContent: 'flex-start',
            backgroundColor: '#052B2D',
            paddingTop: 10,
            height: 141,
            alignSelf: 'stretch',
            marginBottom: 4,
            shadowOffset: {
              height: -1,
              width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 17,
          }}
        >
          {/* buttons */}
          <View
            style ={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // alignContent: 'center',
              // alignItems: 'flex-start',
              marginHorizontal: 11,
            }}>
            <View
              style = {{
                flex: 1,
             
              }}>
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: '#FBFEFB',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: 21,
                  height: 17,
                  borderRadius: 37,

                }}>
                <Image 
                  source = {require('../assets/images/arrowicon-white.png')}
                  style={{
                    alignSelf: 'center',
                    width: 4.5,
                    height: 7,
                  }}/>
              </Pressable>
            
            </View>
            <View
              style = {{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 10,
              }}>
              <Pressable
                style={{
                  borderWidth: 1,
                  backgroundColor: '#FBFEFB',
                  borderColor: 'transparent',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 17,
                  borderRadius: 37,

                }}>
                <Text
                  style={{
                    color: '#052B2D',
                    alignSelf: 'center',
                    fontFamily: 'Rubik-Medium',
                    fontSize: 9,

                  }}>
                  Add
                </Text>
              </Pressable>

              <Pressable
                style={{
                  borderWidth: 1,
                  backgroundColor: '#FBFEFB',
                  borderColor: 'transparent',
                  alignContent: 'center',
                  justifyContent: 'center',
                  width: 60,
                  height: 17,
                  borderRadius: 37,

                }}>
                <Text
                  style={{
                    color: '#052B2D',
                    alignSelf: 'center',
                    fontFamily: 'Rubik-Medium',
                    fontSize: 9,

                  }}>
                  Select
                </Text>
              </Pressable>

              <Pressable 
                style = {{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FBFEFB',
                  width: 25,
                  height: 17,
                  borderRadius: 37,
                  alignSelf: 'center',
                }}
                
                onPress={
                  () => navigation.navigate("NewContainer")
                }
                >
                <Image 
                  source={require('../assets/images/ellipsesicon.png')}
                  style={{
                    width: 11,
                    height: 3,
                  }}/>

              </Pressable>

              
              </View>
            
          </View> 
            
          <View>
              {/* Container info */}
              <Text style={[styles.title, styles.textDefault]}> Fridge </Text>
              <Text style={[styles.description, styles.regularFont]}> Lorem ipsum dolor sit amet, - container desc here, have max # of chars </Text>
          </View>
        </SafeAreaView>
        <View>
          <FlatList
          data={itemdata.products}
          renderItem={renderItem}>

          </FlatList>


        </View>
      </View>
    );
}




export default ExpandContainerScreen;