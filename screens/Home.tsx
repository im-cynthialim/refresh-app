import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, FlatList, TextInput, View, Image, Pressable, Button, PressableProps } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';


export function HomeScreen({ route, navigation }) {
  const { userId, containerName } = route.params;
  const dbRef = ref(getDatabase());
  const [DATA, setDATA] = useState([]);
  const db = getDatabase();


  function retrieveContent(userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      const retrieveContentRef = ref(db, '/userprofiles/{"userId":"sEXeq7pzI7X7DhPG4MyQw97p9HF2"}/containers');
      onValue (retrieveContentRef, (snapshot) => {
        const dataList = [];
        const foodItemList = [];
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          dataList.push(childData);
          // console.log(childData.foodList)
          // foodItemList.push(childData.foodList);
          // childData.foodList.forEach((foodItem) => {
          //   foodItemList.push(foodItem);
          // })
          
          
          // console.log(childData.containerName)
          // const dataList = [childData.containerName, childData.foodList]
        })
        // console.log(foodItemList);
        
        resolve(dataList);
      });
    }
    else{ 
      reject (new Error ('Snapshot does not exist'));
    }
  });
}

useEffect(() => {
async function getData (){
  try{
    const data = await(retrieveContent(userId));
    // console.log(data.containerTemp);
    setDATA(data);
    // return data;
  }
  catch (error){
    console.log("error")
  }
}

getData();
}, [userId, containerName]);

// console.log(DATA);


  // const DATA: ItemData[] =[
  //   {
  //     name: "Fridge",
  //     description: "hello",
  //     products: ["tomato", "lettuce"],
  //   },
  // ];
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

  type ItemData = {
    containerName: string;
    containerTemp: string;
    foodList: ItemProduct[];
  }

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

  type ItemProps = {
    item: ItemData;
  };


  type inputData = {
    searchinput: string;
  };

  type productData = {
    productlist: string[];
  };

  //renders each container from data
  const renderItem = ({ item }: { item: ItemData }) => {

    return (
      <View style={{ backgroundColor: '#052B2D', paddingVertical: 18, borderRadius: 8, paddingHorizontal: 19, marginTop: 9, marginHorizontal: 9, width: 'auto', height: 'auto' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>

          <Text style={[styles.subtitle, { color: '#FBFEFB' }]}>{item.containerName}</Text>
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
              () => navigation.navigate("ExpandContainer", {
                itemdata: { item },
              })
            }
          >
            <Image
              source={require('../assets/images/arrowicon-green.png')}
              style={{
                alignSelf: 'center',
                transform: [{ rotateY: '180deg' }],
                width: 4.5,
                height: 7,
              }}
            />
          </Pressable>
        </View>
        {/* <Text style={{ color: '#FBFEFB', paddingVertical: 10 }}> {item.containerTemp}</Text> */}
        {/* <ContainerDisplay productlist={item.products}/> */}

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={item.foodList}
          renderItem={renderItemContainer}
        // keyExtractor={item => item.toString()}
        />
      </View>

    );
  };

  //renders produce in each container
  // Define each item as this type of object, then retrieve specific components and display
  const renderItemContainer = ({ item }: { item: ItemProduct }) => {
    return (

      <View style={{ marginRight: 7 }}>
        {/* <Text>
            {item}
          </Text> */}
        <Image
          source={require('../assets/images/categories/tomatoes.png')}
          style={{
            borderRadius: 5,
            width: 107,
            height: 65,
          }} />
        <Text style={{ color: '#fbfefb' }}>{item.productName} </Text>
        <Text style={{ color: '#fbfefb' }}>expiry date here</Text>
      </View>

    );
  };

  //footer design - new container button
  const NewContainer = () => {
    return (
      <Pressable
        style={({ pressed }) => [{ backgroundColor: pressed ? '#E7E7E7' : '#EDEDED', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 9, marginHorizontal: 9, alignSelf: 'stretch', height: 54 }]
        }
        onPress={
          () => navigation.navigate("NewContainer")
        }>

        <Image
          source={require('../assets/images/newcontainericon.png')}
          style={{
            width: 20,
            height: 20,
          }}
        />
      </Pressable>
    );
  };


  /* //   <Text>{productlist.map((item) => ( */
  /* //     <Text key={item.index}> {item.product} </Text>
  //   ))}
  //   </Text>
  // ); }
    */

  return (

    <View style={{
      backgroundColor: '#FBFEFB',
      height: '100%',
    }}>


      <SafeAreaView
        style={{
          justifyContent: 'center',
          // flex: 1,
          backgroundColor: '#FBFEFB',
          // height: 80,
          paddingBottom: 20,
          alignSelf: 'stretch',
          // marginBottom: 4,
          paddingLeft: 24,
          paddingRight: 9,
          shadowOffset: {
            height: -1,
            width: 0,
          },
          shadowOpacity: 0.25,
          shadowRadius: 17,
        }}
      >

        <Pressable
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EDEDED',
            width: 25,
            height: 17,
            borderRadius: 37,
            alignSelf: 'flex-end',
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

        <View style={{
          backgroundColor: '#EDEDED',
          width: '70%',
          borderRadius: 37,
          zIndex: 2,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,

        }}>
          <Image
            source={require('../assets/images/searchicon.png')}
            style={{
              height: 11,
              width: 11,
              marginLeft: 12,
            }} />
          <TextInput style={{
            fontFamily: 'Rubik-Medium',
            fontSize: 11,
            paddingLeft: 12,
            paddingRight: 15,

          }}
            placeholder={'Foods, containers, etc.'}
            placeholderTextColor={'#B0B6B3'}
            autoCapitalize={'none'}
          />
        </View>
      </SafeAreaView>

      {/* background shapes */}
      <View style={{ zIndex: -1, borderBottomRightRadius: 16, borderTopRightRadius: 16, position: 'absolute', backgroundColor: '#99E2B4', width: 95, height: 35, top: '15%' }} />
      <View style={{ zIndex: -1, borderRadius: 50, position: 'absolute', backgroundColor: '#55AA90', width: 60, height: 180, top: 170, right: -25 }} />
      <View style={{ zIndex: -1, borderRadius: 50, position: 'absolute', backgroundColor: '#248276', width: 70, height: 100, top: 550 }} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={renderItem}
        ListFooterComponent={
          NewContainer
        }
      />

    </View>

  );

}



export default HomeScreen;