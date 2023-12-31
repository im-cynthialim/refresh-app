import React, { useEffect, useState } from 'react';

import { RefreshControl, Text, FlatList, TextInput, View, Image, Pressable, Button, PressableProps } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { getDatabase, ref, child, get, onValue } from 'firebase/database';


export function HomeScreen({ route, navigation }) {
  const { userId } = route.params;
  const dbRef = ref(getDatabase());
  const [DATA, setDATA] = useState([]);
  const [foodListData, setFoodListData] = useState([]);
  const db = getDatabase();
  // const [refreshing, setRefreshing] = useState(false);
  // const [refreshData, setRefreshData] = useState(false);

  function retrieveData(userId) {
    useEffect(() => {
    const retrieveContent = new Promise((resolve, reject) => {
      // setRefreshData(!refreshData);
      if (userId) {
        // setRefreshing(true);
        // console.log(JSON.stringify(userId))
        // const retrieveContentRef = ref(db, '/userprofiles/{"userId":"sEXeq7pzI7X7DhPG4MyQw97p9HF2"}/containers');
        // const retrieveContentRef = ref(db, '/userprofiles/'+ JSON.stringify(userId) + '/containers');
        const retrieveContentRef = ref(db, '/userprofiles/' + JSON.stringify(userId) + '/containers');

          onValue (retrieveContentRef, (snapshot) => {

            const dataList = [];

            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              dataList.push(childData);
              // console.log(dataList)
            })

            resolve(dataList);
        });
      }

      else {
            reject(new Error('User does not exist'));
      }
       
    });

  
      Promise.all([retrieveContent])
      .then(([containerData]) => {
        setDATA(containerData);
      })
      .catch((error) => {
        console.log("error")
      });
  }, []);
}

  retrieveData(userId);



  type ItemData = {
    containerName: string;
    containerTemp: string;
    foodList: ProductData[];
  }

  type ProductData = {
    productName: string;
    productType: string;
    productQuantity: number;
    productCategory: string;
    dateBought: string;
    dateStored: string;
    dateOpened: string;
    personalNotes: string;

  }

  // console.log(DATA)
  //renders each container from data
  const renderItem = ({ item }: { item: ItemData }) => {

    return (
      <View style={{ backgroundColor: '#021E20', paddingVertical: 18, borderRadius: 8, paddingHorizontal: 19, marginTop: 9, marginHorizontal: 9, width: 'auto', height: 'auto' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>

          <Text style={[styles.title, styles.textDefault, { color: '#FBFEFB' }]}>{item.containerName}</Text>
          <Pressable
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              borderWidth: 0,
              backgroundColor: '#FBFEFB',
              borderRadius: 37,
              width: 35,
              height: 20,
            }}
            
            onPress={
              () => navigation.navigate("ExpandContainer", {
                itemData: item,
                userId: userId
              })
            }
          >
            <Image
              source={require('../assets/images/arrowicon-green.png')}
              style={{
                alignSelf: 'center',
                transform: [{ rotateY: '180deg' }],
                width: 5,
                height: 10,
              }}
            />
          </Pressable>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={Object.values(item.foodList)}
          renderItem={renderItemContainer}
          
        />
      </View>

    );
  };

  //renders produce in each container
  // Define each item as this type of object, then retrieve specific components and display
  const renderItemContainer = ({ item }: { item: ProductData }) => {
    return (

      <View style={{ marginRight: 15 }}>
        <Image
          source={require('../assets/images/categories/tomatoes.png')}
          style={{
            marginTop: 10,
            resizeMode: 'stretch',
            borderRadius: 5,
            width: 107,
            height: 70,
          }} />
        <Text style={[styles.label, styles.textDefault, {fontSize: 18, marginBottom: 0, color: '#fbfefb', paddingTop: 5}]}>{item.productName} </Text>
        <Text style={{ color: '#fbfefb', paddingTop: 2}}>expiry date here</Text>
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
        // extraData={refreshData}
        // refreshing={true}
        // onRefresh= {() => setRefreshData(!refreshData)}
        ListFooterComponent={
          NewContainer
        }
      />

    </View>

  );

}



export default HomeScreen;