import React, { useState } from 'react';
import { StyleSheet, Text, FlatList, TextInput, View, Image, Pressable, Button, PressableProps } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import HomeScreen from './Home';

function ExpandContainerScreen({ route, navigation }) {

  const { itemData, userId } = route.params;


  // type ContainerContents = {
  //   containername: string;
  //   products: string[][];

  // }


  // const DATA: ItemProduct[] =[
  //   {
  //     name: "Fridge",
  //     description: "hello",
  //     products: ["tomato", "lettuce"],
  //   },
  //   {
  //     name: "test2",
  //     description: "world",
  //     products: ["cucumber", "toast"],
  //   },
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
  // ];

  // type ItemData = {
  //   name: string;
  //   description: string;
  //   products: string[];
  // };

  type ItemProduct = {
    productName: string;
    productType: string;
    productQuantity: number;
    productCategory: string;
    dateBought: string;
    dateStored: string;
    dateOpened: string;
    personalNotes: string;

  }


  // type ItemProps = {
  //   item: ItemData;
  // };


  type inputData = {
    searchinput: string;
  };

  type productData = {
    productlist: string[];
  };


  const renderItem = ({ item }: { item: ItemProduct }) => {

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 15}}>


      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 20, marginTop: 20}}>
        <View>
          <Image
            source={require('../assets/images/categories/tomatoes.png')}
            style={{ borderRadius: 7, width: 150, height: 100, resizeMode: 'stretch' }}

          />
        </View>

        <View style={{ paddingLeft: 20, gap: 7, width: 'auto' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={[styles.textDefault, { color: '#021E20', fontSize: 18 }]}>
              {item.productName}
            </Text>

            <Image
              source={require('../assets/images/raw-tag.png')}
              style={{width: 30, height: 15, resizeMode: 'center'}}
            />
          </View>

          <Text style={[styles.regularFont, { color: "#021E20", fontSize: 10 }]}>
            {item.dateStored}
          </Text>

          <Text style={[styles.regularFont, { color: "#021E20", fontSize: 10 }]}>
            EXPIRY DATE HERE
          </Text>

          <Text style={[styles.regularFont, { color: "#021E20", fontSize: 10 }]}>
            Date Opened : {item.dateOpened}
          </Text>

          <Text style={[styles.regularFont, { color: "#021E20", fontSize: 10 }]}>
            Date Bought: {item.dateBought}
          </Text>

        </View>
      </View>

        <View style={{marginTop: 20}}>
          <Text style={[styles.textDefault, styles.label, {color: "#021E20", fontSize: 18 }]}>
            {item.productQuantity}
          </Text>

        </View>


    




    </View>
    );
        /* <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Text>{item.productlist.map((item) => (
                <Text key={item.index}> {item.product} </Text>
            ))}
            </Text>
            </View> */
      // </View>
    // );
  }
  //         <View style={{backgroundColor: '#052B2D', paddingVertical: 18, borderRadius: 8, paddingHorizontal: 19, marginTop: 9, marginHorizontal: 9, width: 'auto', height: 'auto'}}>
  //           <View
  //             style = {{
  //               flexDirection: 'row',
  //               alignItems: 'flex-start',
  //               justifyContent: 'space-between',
  //             }}>

  //             <Text style={[styles.subtitle, {color: '#FBFEFB'}]}> {item.name}</Text>
  //             <Pressable
  //               style={{
  //                 justifyContent: 'center',
  //                 alignContent: 'center',
  //                 border Width: 1,
  //                 backgroundColor: '#FBFEFB',
  //                 borderRadius: 37,
  //                 width: 25,
  //                 height: 17,
  //               }}
  //               onPress={
  //                 () => navigation.navigate('ExpandContainer')
  //               }
  //               >
  //               <Image
  //                 source = {require('../assets/images/arrowicon-green.png')}
  //                 style = {{
  //                   alignSelf: 'center',
  //                   transform: [{rotateY: '180deg'}],
  //                   width: 4.5,
  //                   height: 7,
  //                 }}
  //                 />
  //               </Pressable>
  //           </View>
  //           <Text style={{color: '#FBFEFB', paddingVertical: 10}}> {item.description}</Text>
  //           {/* <ContainerDisplay productlist={item.products}/> */}


  //         </View>

  //       );
  //   };

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
          height: 'auto',
          alignSelf: 'stretch',
          marginBottom: 4,
          shadowOffset: {
            height: -1,
            width: 0,
          },
          shadowOpacity: 0.15,
          shadowRadius: 20,
        }}
      >
        {/* buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignContent: 'center',
            // alignItems: 'flex-start',
            marginHorizontal: 11,
          }}>
          <View
            style={{
              flex: 1,

            }}>
            <Pressable
              style={{
                borderWidth: 2,
                borderColor: '#FBFEFB',
                justifyContent: 'center',
                alignContent: 'center',
                borderRadius: 37,
                width: 35,
                height: 22,

              }}

              onPress={() => navigation.navigate("Main", { screen: "Home", params: { userId: userId } })}>
              <Image
                source={require('../assets/images/arrowicon-white.png')}
                style={{
                  alignSelf: 'center',
                  width: 5,
                  height: 10,
                }} />
            </Pressable>

          </View>
          <View
            style={{
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
                height: 20,
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
                height: 20,
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
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FBFEFB',
                width: 25,
                height: 20,
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
                }} />

            </Pressable>


          </View>

        </View>

        <View style={{ paddingLeft: 22, paddingVertical: 23 }}>
          {/* Container info */}
          <Text style={[styles.title, styles.textDefault]}>{itemData.containerName} </Text>
          <Text style={[styles.description, styles.regularFont, { width: '80%' }]}>Lorem ipsum dolor sit amet, - container desc here, have max # of chars </Text>
        </View>
      </SafeAreaView>
      <View style={{height: '100%'}}>
        <FlatList

          data={itemData.foodList}
          renderItem={renderItem}>

        </FlatList>


      </View>
    </View>
  );

}




export default ExpandContainerScreen;