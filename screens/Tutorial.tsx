import React, { useState, useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import Modal from "react-native-modal";
import { Text, TextInput, View, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDatabase, ref, set, push, update} from 'firebase/database';
import WheelPicker from 'react-native-wheely';
import { CheckBox, Icon } from '@rneui/themed';
import ConfettiCannon from 'react-native-confetti-cannon';
import TextLabel from '../styles/props/TextLabel';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';


function TutorialScreen({ route, navigation }) {

  function addContainer(containerName, containerTemp, factorsList, userId) {
    const db = getDatabase();
    // console.log("addcontainer" + JSON.stringify(userId));
    // if user has been defined (aka gone through proper signup)
    if (userId) {
      // console.log("Container Added")
      // console.log(JSON.stringify(userId))
      set(ref(db, 'userprofiles/' + JSON.stringify(userId) + '/containers/' + JSON.stringify(containerName)), {
        containerName: containerName,
        containerTemp: containerTemp,
        factorsList: factorsList,
      });

      
      navigation.navigate("FoodSetup", { containerName: containerName, userId: userId})
    }

    else {
      navigation.navigate("Login")
    }

  }


  function addFood(productName, productType, productQuantity, productCategory, dateBought, dateStored, dateOpened, personalNotes, containerName, userId) {
    const db = getDatabase();
    // if user has been defined (aka gone through proper signup)
    if (userId) {
      const foodData = 
        [
          {
        productName: productName,
        productType: productType,
        productQuantity: productQuantity,
        productCategory: productCategory,
        dateBought: dateBought,
        dateStored: dateStored,
        dateOpened: dateOpened,
        personalNotes: personalNotes
          }
        ]
        const updates = {};
        updates ['userprofiles/' + JSON.stringify(userId) + '/containers/' + JSON.stringify(containerName) + '/foodList'] = foodData;
        navigation.navigate("Main", {screen: "Home", params: {userId: userId}})
        return update(ref(db), updates);    
    }

    else {
      navigation.navigate("Login")
    }

  }




  function ContainerSetup1({ route, navigation }) {
    const {userId} = route.params;
    const [containerName, setContainerName] = useState('')
    // const db = getDatabase();



    return (
      <SafeAreaView style={{ backgroundColor: '#FBFEFB', height: '100%' }}>
        {/* progress bar */}
        <View style={{ flexDirection: 'row', paddingTop: 12, justifyContent: 'center', gap: 5 }}>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }}>
            <View style={{ zIndex: 1, borderRadius: 64, backgroundColor: '#052B2D', width: '30%', height: 10 }} />
          </View>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }} />
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%', height: 10 }} />

        </View>

        <View style={{ alignItems: 'center', gap: 25, paddingTop: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.subtitle, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Set up your {"\n"} first container
            </Text>
            <Text style={[styles.smalltext, styles.textDefault, { color: '#B0B6B3', textAlign: 'center', marginBottom: 16 }]}>
              This is the location you'll use to {"\n"} store your foods
            </Text>
            <View style={[styles.horizontalRule]} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, styles.textDefault, { color: '#021E20', marginBottom: 10 }]}>
              Choose a name for your container
            </Text>
            <Text style={[styles.smalltext, styles.textDefault, { marginBottom: 13 }]}>
              You can make changes to this later
            </Text>
            <TextInput
              placeholder={'Fridge'}
              placeholderTextColor={'#B0B6B3'}
              value={containerName}
              onChangeText={text => setContainerName(text)}
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
          <View style={{ marginTop: 20 }}>
            <Pressable
              style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
              // onPress={() => addContainer(containerName, userId)}
              onPress={() => navigation.navigate("ContainerSetup-2", { containerName: containerName, userId: userId })}
            >
              <Text
                style={[styles.textDefault, styles.buttonText]}> Next </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  function ContainerSetup2({ route, navigation }) {
    const { containerName, userId } = route.params;
    const [containerTemp, setContainerTemp] = useState('Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)');
    // const sliceIndex = containerTemp.indexOf("\n");

    // const finalTemp = containerTemp.slice(0, sliceIndex + 1);


    return (
      <SafeAreaView style={{ backgroundColor: '#FBFEFB', height: '100%' }}>
        {/* progress bar */}
        <View style={{ flexDirection: 'row', paddingTop: 12, justifyContent: 'center', gap: 5 }}>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }}>
            <View style={{ zIndex: 1, borderRadius: 64, backgroundColor: '#052B2D', width: '60%', height: 10 }} />
          </View>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }} />
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%', height: 10 }} />

        </View>

        {/* <View
          style={{paddingHorizontal: 17, paddingTop: 17}}>
            <Pressable
              style={{zIndex: 1}}
              onPress = {() => navigation.push("ContainerSetup-1")}>
              <Image
                source={require('../assets/images/arrowicon-green.png')}
                style={{ width: 9, height: 14, marginBottom: 28, alignSelf: 'flex-start'}}
              />
            </Pressable>

        </View> */}

        {/* page content */}
        <View style={{ alignItems: 'center', gap: 25, paddingTop: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.subtitle, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Set up your {"\n"} first container
            </Text>

            <View style={[styles.horizontalRule]} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Choose the temperature {"\n"} of your container

            </Text>
            <Text style={[styles.smalltext, styles.textDefault, { marginBottom: 13 }]}>
              You can make changes to this later
            </Text>

            <WheelPicker
              options={['Room Temperature \n(70 °F / 21 °C)', 'Pantry Temperature \n(50-70°F / 10-21 °C )', 'Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)', 'Freezer Temperature \n(0 °F / -18 °C)']}
              selected={'Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)'}
              onChange={(temp) => setContainerTemp(temp)}
              itemHeight={55}
              selectedIndicatorStyle={{ alignSelf: 'center' }}
              containerStyle={{ width: '70%' }}
              itemTextStyle={{ fontFamily: 'Rubik-Medium', color: '#021E20', fontSize: 14, textAlign: 'center' }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Pressable
              style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
              onPress={() => navigation.navigate("ContainerSetup-3", { containerName: containerName, containerTemp: containerTemp, userId: userId })}
            >
              <Text
                style={[styles.textDefault, styles.buttonText]}> Next </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  function ContainerSetup3({ route, navigation }) {

    const {containerName, containerTemp, userId} = route.params;

    const [expiryDate, setExpiryDate] = useState(true);
    const [showDateBought, setShowDateBought] = useState(false);
    const [showDateStored, setShowDateStored] = useState(true);
    const [showDateOpened, setShowDateOpened] = useState(false);
    const [itemCategory, setItemCategory] = useState(false);
    const [itemQuantity, setItemQuantity] = useState(true);


    const [yesterdayDate, setYesterdayDate] = useState('');
    const [twoDaysAgo, setTwoDaysAgo] = useState('');
    // const [fewDaysAgo, setFewDaysAgo] = useState('');

    const factorsList = [expiryDate, showDateBought, itemQuantity, showDateStored, itemCategory, showDateOpened];


    useEffect(() => {
      var date = new Date().getDate() - 1; //Yesterday Date
      var month = new Date().toLocaleString('default', { month: 'long' }); + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year

      
      setYesterdayDate(
        month + ' ' + date + ', ' + year
      );

      setTwoDaysAgo(
        month + ' ' + (date - 1) + ', ' + year
      )

      // setFewDaysAgo(
      //   month + ' ' + (date - 2) + ', ' + year
      // )
    }, []);

    const [modalVisibility, setModalVisibility] = useState(false);


    return (
      <SafeAreaView style={{ backgroundColor: '#FBFEFB', height: '100%' }}>
        {/* progress bar */}
        <View style={{ flexDirection: 'row', paddingTop: 12, justifyContent: 'center', gap: 5 }}>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }}>
            <View style={{ zIndex: 1, borderRadius: 64, backgroundColor: '#052B2D', width: '100%', height: 10 }} />
          </View>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }} />
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%', height: 10 }} />

        </View>

        {/* page content */}
        <View style={{ alignItems: 'center', gap: 25, paddingTop: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.subtitle, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Set up your {"\n"} first container
            </Text>

            <View style={[styles.horizontalRule]} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.label, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Select some factors you'd {"\n"} like to display

            </Text>
            <Text style={[styles.smalltext, styles.textDefault, { marginBottom: 13 }]}>
              You can make changes to this later
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              <CheckBox
                title="Expiry Date"
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                checked={expiryDate}
                onPress={() => setExpiryDate(!expiryDate)}
                fontFamily='Rubik-Medium'
                uncheckedColor='#021E20'
                textStyle={{ color: '#021E20' }}
                checkedColor='#55AA90'
                checkedIcon={'check-square'}
                uncheckedIcon={'square'}
                iconType='feather'
              />




              <CheckBox
                title="Date Bought"
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                checked={showDateBought}
                onPress={() => setShowDateBought(!showDateBought)}
                fontFamily='Rubik-Medium'
                textStyle={{ color: '#021E20' }}
                uncheckedColor='#021E20'
                checkedColor='#55AA90'
                checkedIcon={'check-square'}
                uncheckedIcon={'square'}
                iconType='feather'
              />

              <CheckBox
                title="Item Quantity"
                checked={itemQuantity}
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                onPress={() => setItemQuantity(!itemQuantity)}
                fontFamily='Rubik-Medium'
                textStyle={{ color: '#021E20' }}
                uncheckedColor='#021E20'
                checkedColor='#55AA90'
                checkedIcon={'check-square'}
                uncheckedIcon={'square'}
                iconType='feather'
              />

              <CheckBox
                title="Date Stored"
                checked={showDateStored}
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                onPress={() => setShowDateStored(!showDateStored)}
                fontFamily='Rubik-Medium'
                textStyle={{ color: '#021E20' }}
                uncheckedColor='#021E20'
                checkedColor='#55AA90'
                checkedIcon={'check-square'}
                uncheckedIcon={'square'}
                iconType='feather'
              />

              <View style={{ width: '45%', flexDirection: 'row', gap: -25, zIndex: 1, alignItems: 'center' }}>
                <CheckBox
                  title="Item Category"
                  checked={itemCategory}
                  // containerStyle={{ width: '40%' }}
                  onPress={() => setItemCategory(!itemCategory)}
                  fontFamily='Rubik-Medium'
                  textStyle={{ color: '#021E20' }}
                  uncheckedColor='#021E20'
                  checkedColor='#55AA90'
                  checkedIcon={'check-square'}
                  uncheckedIcon={'square'}
                  iconType='feather'
                />
                <Pressable
                  style={{ width: 'auto' }}
                  onPress={() => setModalVisibility(!modalVisibility)}
                >
                  <Icon
                    name="info"
                    type='feather'
                    color="#021E20"
                    size={15}
                  />

                </Pressable>
              </View>

              <CheckBox
                title="Date Opened"
                checked={showDateOpened}
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                onPress={() => setShowDateOpened(!showDateOpened)}
                fontFamily='Rubik-Medium'
                textStyle={{ color: '#021E20' }}
                uncheckedColor='#021E20'
                checkedColor='#55AA90'
                checkedIcon={'check-square'}
                uncheckedIcon={'square'}
                iconType='feather'
              />

            </View>
          </View>



          {/* Model Display */}
          <View style={{}}>
            <Text style={[styles.textDefault, styles.label, { paddingLeft: 7, color: '#96979C' }]}>
              Model Display
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View>
                <Image
                  source={require('../assets/images/categories/tomatoes.png')}
                  style={{ borderRadius: 7, width: 150, height: 100, resizeMode: 'stretch' }}

                />
              </View>

              <View style={{ paddingLeft: '5%', gap: 7, width: '50%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Text style={[styles.textDefault, { color: '#021E20', fontSize: 18 }]}>
                    Tomatoes
                  </Text>

                  <Image
                    source={require('../assets/images/raw-tag.png')}
                    style={{ opacity: itemCategory ? 1 : 0, width: 30, height: 15, resizeMode: 'center' }}
                  />
                </View>

                <Text style={[styles.regularFont, { color: "#021E20", opacity: showDateStored ? 100 : 0, position: showDateStored ? 'relative' : 'absolute', fontSize: 10 }]}>
                  {yesterdayDate}
                </Text>

                <Text style={[styles.regularFont, { color: "#9AB725", opacity: expiryDate ? 100 : 0, position: expiryDate ? 'relative' : 'absolute', fontSize: 10 }]}>
                  2 days
                </Text>

                <Text style={[styles.regularFont, { color: "#B0B6B3", opacity: showDateOpened ? 100 : 0, position: showDateOpened ? 'relative' : 'absolute', fontSize: 10 }]}>
                  Date Opened : {yesterdayDate}
                </Text>

                <Text style={[styles.regularFont, { color: "#B0B6B3", opacity: showDateBought ? 100 : 0, position: showDateBought ? 'relative' : 'absolute', fontSize: 10 }]}>
                  Date Bought: {twoDaysAgo}
                </Text>

              </View>


              <View>
                <Text style={[styles.textDefault, styles.label, { color: itemQuantity ? "#021E20" : '#FBFEFB', fontSize: 18 }]}>
                  4
                </Text>

              </View>


            </View>




          </View>
          <View style={{ marginTop: 20 }}>
            <Pressable
              style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
              // onPress={() => navigation.navigate("ContainerSetup-4")}
            onPress={() => addContainer(containerName, containerTemp, factorsList, userId)}
            >
              <Text
                style={[styles.textDefault, styles.buttonText]}> Next </Text>
            </Pressable>
          </View>




        </View>



        <View>
          <Modal
            isVisible={modalVisibility}
            animationInTiming={200}
            style={{ margin: 0 }}
            // backdropColor='rgb(7,7,7)'
            backdropOpacity={0.56}
            onBackdropPress={() => setModalVisibility(false)}
            onSwipeComplete={() => setModalVisibility(false)}
            swipeDirection={'down'}
          >
            <View style={{ backgroundColor: '#FBFEFB', marginTop: '75%', justifyContent: 'flex-start', paddingTop: '8%', paddingHorizontal: '10%', flex: 1, borderTopLeftRadius: 21, borderTopRightRadius: 21 }}>

              <Text style={[styles.textDefault, styles.subtitle]}>
                Item Category
              </Text>
              <Text style={[styles.regularFont, { paddingTop: 5, paddingBottom: 15, fontSize: 14, color: '#96979C', textAlign: 'left' }]}>
                Indicate the state of foods in your container with one of the following tags
              </Text>

              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/raw-tag.png')}
                    style={{ width: 120, height: 55, resizeMode: 'center' }}
                  />
                  <View style={{ paddingLeft: '5%' }}>
                    <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Raw Food </Text>
                    <Text style={[styles.regularFont, { fontSize: 12, color: '#96979C', width: '50%' }]}>Includes items such as fresh produce and uncooked meat </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/cooked-tag.png')}
                    style={{ width: 120, height: 55, resizeMode: 'center' }}
                  />
                  <View style={{ paddingLeft: '5%' }}>
                    <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Cooked Food </Text>
                    <Text style={[styles.regularFont, { fontSize: 12, color: '#96979C' }]}>Includes all cooked items </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/meal-tag.png')}
                    style={{ width: 120, height: 55, resizeMode: 'center' }}
                  />
                  <View style={{ paddingLeft: '5%' }}>
                    <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Meal </Text>
                    <Text style={[styles.regularFont, { fontSize: 12, color: '#96979C', width: '40%' }]}>Includes items composed of multiple foods, such as yesterday's pasta dinner </Text>
                  </View>
                </View>

              </View>

              <View style={{ alignItems: 'center', paddingTop: 20 }}>
                <Pressable
                  style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
                  onPress={() => setModalVisibility(false)}
                >
                  <Text
                    style={[styles.textDefault, styles.buttonText]}> Close </Text>
                </Pressable>
              </View>

            </View>

          </Modal>
        </View>
      </SafeAreaView>
    );
  };

  function ContainerSetup4({ navigation }) {

    return (
      <SafeAreaView style={{ backgroundColor: '#FBFEFB', height: '100%', justifyContent: 'center' }}>
        {/* <ConfettiCannon 
        count={200}
        origin={{x:-20, y:-10}}
        fadeOut={true}
        colors={['#99E2B4', '#55AA90']}/> */}

        {/* page content */}
        <View style={{ alignItems: 'center' }}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.subtitle, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Container Added!
            </Text>
          </View>
          <View style={{ marginTop: 50 }}>
            <Pressable
              style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
              onPress={() => navigation.navigate("FoodSetup")}
            >
              <Text
                style={[styles.textDefault, styles.buttonText]}> Next </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };


  function FoodSetup({route, navigation }) {

    const {containerName, userId} = route.params;

    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState(''); //automated
    const [productQuantity, setProductQuantity] = useState(''); //can't be 0
    const [productCategory, setProductCategory] = useState(''); //dropdown menu
    const [dateBought, setDateBought] = useState('');
    const [dateStored, setDateStored] = useState('');
    const [dateOpened, setDateOpened] = useState('');
    const [personalNotes, addPersonalNotes] = useState('');
    const [ptModalVisibility, setPTModalVisibility] = useState(false);
    const [cModalVisibility, setCModalVisibility] = useState(false);


    const categoryTags = [
      { key: '1', value: ' ' },
      { key: '2', value: 'Raw Food' },
      { key: '3', value: 'Cooked Food' },
      { key: '4', value: 'Meal' },

    ]


    const numberField = (text) => {
      if (/^[0-9]+$/.test(text) || text === '') {
        setProductQuantity(text);
      }


    }

    return (
      <SafeAreaView style={{ backgroundColor: '#FBFEFB', height: '100%' }}>
        {/* progress bar */}
        <View style={{ flexDirection: 'row', paddingTop: 12, justifyContent: 'center', gap: 5 }}>
          <View style={{ borderRadius: 64, backgroundColor: '#052B2D', width: '30%' }} />

          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%' }}>
            <View style={{ zIndex: 1, borderRadius: 64, backgroundColor: '#052B2D', width: '30%', height: 10 }} />
          </View>
          <View style={{ borderRadius: 64, backgroundColor: '#EDEDED', width: '30%', height: 10 }} />

        </View>

        {/* <ScrollView>   */}
        <View style={{ alignItems: 'center', gap: 25, paddingTop: 30 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.subtitle, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
              Add your food
            </Text>
            <Text style={[styles.smalltext, styles.textDefault, { color: '#B0B6B3', textAlign: 'center', marginBottom: 16 }]}>
              Add some foods to store in your {"\n"} new container
            </Text>
          </View>

          {/* product line */}
          {/* <View style={{alignItems: 'flex-start'}}> */}


          <View style={{ paddingHorizontal: '2%', alignSelf: 'flex-start', paddingLeft: 40, flexDirection: 'row', gap: 20 }}>
            <View style={{ width: '30%' }}>
              <TextLabel label="product name" />
              <TextInput
                placeholder={'Tomatoes'}
                placeholderTextColor={'#B0B6B3'}
                value={productName}
                onChangeText={text => setProductName(text)}
                style={{
                  fontFamily: 'Rubik-Medium',
                  backgroundColor: "#F2F2F2",
                  color: '#052B2D',
                  paddingHorizontal: 12,
                  borderRadius: 3,
                  justifyContent: 'center',
                  paddingVertical: 14,
                }}
              />
            </View>
            <View style={{ width: '30%' }}>
              <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <Text style={[styles.textDefault, { fontSize: 14, color: '#052B2D' }]}>
                  product type
                </Text>

                <Pressable style={{ paddingLeft: 2 }}
                  onPress={() => setPTModalVisibility(!ptModalVisibility)}
                >
                  <Icon
                    name="info"
                    type='feather'
                    color="#021E20"
                    size={15}
                  />

                </Pressable>
              </View>

              <TextInput
                placeholder={'Tomatoes'}
                placeholderTextColor={'#B0B6B3'}
                value={productType}
                onChangeText={text => setProductType(text)}
                style={{
                  fontFamily: 'Rubik-Medium',
                  backgroundColor: "#F2F2F2",
                  color: '#052B2D',
                  paddingHorizontal: 12,
                  borderRadius: 3,
                  justifyContent: 'center',
                  paddingVertical: 14,
                }}
              />
            </View>
            <View style={{ width: '20%' }}>
              <TextLabel label="quantity" />
              <TextInput
                placeholder={'1'}
                placeholderTextColor={'#B0B6B3'}
                keyboardType='numeric'
                value={productQuantity}
                onChangeText={text => numberField(text)}
                style={{
                  fontFamily: 'Rubik-Medium',
                  backgroundColor: "#F2F2F2",
                  color: '#052B2D',
                  paddingHorizontal: 12,
                  borderRadius: 3,
                  justifyContent: 'center',
                  paddingVertical: 14,
                }}
              />
            </View>
          </View>
          {/* category line */}
          <View style={{ alignSelf: 'flex-start', paddingLeft: 40 }}>
            <View style={{ width: 200 }}>
              <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                <Text style={[styles.textDefault, { fontSize: 14, color: '#052B2D' }]}>
                  item category
                </Text>

                <Pressable style={{ paddingLeft: 5 }}
                  onPress={() => setCModalVisibility(!cModalVisibility)}
                >
                  <Icon
                    name="info"
                    type='feather'
                    color="#021E20"
                    size={15}
                  />

                </Pressable>
              </View>

              <SelectList
                setSelected={(val) => setProductCategory(val)}
                data={categoryTags}
                search={false}
                fontFamily='Rubik-Medium'
                defaultOption={{ key: '1', value: ' ' }}
                boxStyles={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderRadius: 3 }}
                dropdownStyles={{ backgroundColor: '#F2F2F2', borderWidth: 0, borderRadius: 3 }}
                dropdownItemStyles={{ backgroundColor: '#F2F2F2' }}
                save="value"
              />
            </View>


          </View>
          {/* date line */}
          <View style={{ paddingHorizontal: '2%', alignSelf: 'flex-start', paddingLeft: 40, flexDirection: 'row', gap: 20 }}>
            <View style={{ width: '30%' }}>
              <TextLabel label="date bought" />


                {/* <RNDateTimePicker value={new Date()} maximumDate={(new Date().getDate(),  new Date.getMonth() + 1, new Date().getFullYear())} onChange={this.setDateBought} textColor='#B0B6B3' accentColor='#248276' mode="date"/> */}

              <TextInput
                placeholder={'DD/MM/YYYY'}
                placeholderTextColor={'#B0B6B3'}
                value={dateBought}
                onChangeText={text => setDateBought(text)}
                style={{
                  fontFamily: 'Rubik-Medium',
                  backgroundColor: "#F2F2F2",
                  color: '#052B2D',
                  paddingHorizontal: 12,
                  borderRadius: 3,
                  justifyContent: 'center',
                  paddingVertical: 14,
                }}
              />
            </View>
            <View style={{ width: '30%' }}>
              <TextLabel label="date stored" />
              <TextInput
                placeholder={'DD/MM/YYYY'}
                placeholderTextColor={'#B0B6B3'}
                value={dateStored}
                onChangeText={text => setDateStored(text)}
                style={{
                  fontFamily: 'Rubik-Medium',
                  backgroundColor: "#F2F2F2",
                  color: '#052B2D',
                  paddingHorizontal: 12,
                  borderRadius: 3,
                  justifyContent: 'center',
                  paddingVertical: 14,
                }}
              />
            </View>
            <View style={{ width: '30%' }}>
              <TextLabel label="date opened" />
              <TextInput
                placeholder={'DD/MM/YYYY'}
                placeholderTextColor={'#B0B6B3'}
                value={dateOpened}
                onChangeText={text => setDateOpened(text)}
                style={{
                  fontFamily: 'Rubik-Medium',
                  backgroundColor: "#F2F2F2",
                  color: '#052B2D',
                  paddingHorizontal: 12,
                  borderRadius: 3,
                  justifyContent: 'center',
                  paddingVertical: 14,
                }}
              />
            </View>
          </View>

          <View style={{ alignSelf: 'flex-start', marginLeft: 40 }}>
            <TextLabel label="personal notes" />
            <TextInput
              placeholder={'personal notes'}
              placeholderTextColor={'#B0B6B3'}
              value={personalNotes}
              onChangeText={text => addPersonalNotes(text)}
              style={{
                fontFamily: 'Rubik-Medium',
                backgroundColor: "#F2F2F2",
                color: '#052B2D',
                paddingHorizontal: 12,
                borderRadius: 3,
                justifyContent: 'center',
                paddingVertical: 14,
              }}
            />
          </View>


          <View style={{ marginTop: 20, alignSelf: 'center' }}>
            <Pressable
              style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
              onPress={() => addFood(productName, productType, productQuantity, productCategory, dateBought, dateStored, dateOpened, personalNotes, containerName, userId)}
              // onPress={() => navigation.navigate("Signup")}
            >
              <Text
                style={[styles.textDefault, styles.buttonText]}> Next </Text>
            </Pressable>
          </View>






          {/* pt modal */}
          <View>
            <Modal
              isVisible={ptModalVisibility}
              animationInTiming={200}
              style={{ margin: 0 }}
              // backdropColor='rgb(7,7,7)'
              backdropOpacity={0.56}
              onBackdropPress={() => setPTModalVisibility(false)}
              onSwipeComplete={() => setPTModalVisibility(false)}
              swipeDirection={'down'}
            >
              <View style={{ backgroundColor: '#FBFEFB', marginTop: '90%', justifyContent: 'flex-start', paddingTop: '8%', paddingHorizontal: '10%', flex: 1, borderTopLeftRadius: 21, borderTopRightRadius: 21 }}>


                <View style={{ alignItems: 'flex-start' }}>
                  <Text style={[styles.textDefault, styles.subtitle]}>
                    Product Type
                  </Text>
                  <Text style={[styles.regularFont, { paddingTop: 5, fontSize: 14, color: '#96979C', textAlign: 'left' }]}>
                    To accurately predict food expiry dates, we automatically try to classify the item you're storing
                  </Text>
                </View>

                <View style={{ paddingVertical: 10, alignItems: 'flex-start' }}>
                  <Text style={[styles.textDefault, styles.label, { marginBottom: 5 }]}>
                    Successful classification
                  </Text>
                  <Text style={[styles.regularFont, { fontSize: 14, color: '#96979C' }]}>
                    If classified successfully, the product type will display the food name or that of a similar item
                  </Text>
                </View>

                <View>
                  <Text style={[styles.textDefault, styles.label, { marginBottom: 5 }]}>
                    Manual entry
                  </Text>
                  <Text style={[styles.regularFont, { fontSize: 14, color: '#96979C', textAlign: 'left' }]}>
                    If the product type field is left empty, manually enter the food name or a similar item
                  </Text>
                </View>

                <View style={{ alignItems: 'center', paddingTop: 10 }}>
                  <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
                    onPress={() => setPTModalVisibility(false)}
                  >
                    <Text
                      style={[styles.textDefault, styles.buttonText]}> Close </Text>
                  </Pressable>
                </View>

              </View>

            </Modal>
          </View>

          {/* category modal */}
          <View>
            <Modal
              isVisible={cModalVisibility}
              animationInTiming={200}
              style={{ margin: 0 }}
              // backdropColor='rgb(7,7,7)'
              backdropOpacity={0.56}
              onBackdropPress={() => setCModalVisibility(false)}
              onSwipeComplete={() => setCModalVisibility(false)}
              swipeDirection={'down'}
            >
              <View style={{ backgroundColor: '#FBFEFB', marginTop: '75%', justifyContent: 'flex-start', paddingTop: '8%', paddingHorizontal: '10%', flex: 1, borderTopLeftRadius: 21, borderTopRightRadius: 21 }}>

                <Text style={[styles.textDefault, styles.subtitle]}>
                  Item Category
                </Text>
                <Text style={[styles.regularFont, { paddingTop: 5, paddingBottom: 15, fontSize: 14, color: '#96979C', textAlign: 'left' }]}>
                  Indicate the state of foods in your container with one of the following tags
                </Text>

                <View style={{ gap: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../assets/images/raw-tag.png')}
                      style={{ width: 120, height: 55, resizeMode: 'center' }}
                    />
                    <View style={{ paddingLeft: '5%' }}>
                      <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Raw Food </Text>
                      <Text style={[styles.regularFont, { fontSize: 12, color: '#96979C', width: '50%' }]}>Includes items such as fresh produce and uncooked meat </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../assets/images/cooked-tag.png')}
                      style={{ width: 120, height: 55, resizeMode: 'center' }}
                    />
                    <View style={{ paddingLeft: '5%' }}>
                      <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Cooked Food </Text>
                      <Text style={[styles.regularFont, { fontSize: 12, color: '#96979C' }]}>Includes all cooked items </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={require('../assets/images/meal-tag.png')}
                      style={{ width: 120, height: 55, resizeMode: 'center' }}
                    />
                    <View style={{ paddingLeft: '5%' }}>
                      <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Meal </Text>
                      <Text style={[styles.regularFont, { fontSize: 12, color: '#96979C', width: '40%' }]}>Includes items composed of multiple foods, such as yesterday's pasta dinner </Text>
                    </View>
                  </View>

                </View>

                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                  <Pressable
                    style={({ pressed }) => [{ backgroundColor: pressed ? '#156B60' : '#248276' }, styles.next_button]}
                    onPress={() => setCModalVisibility(false)}
                  >
                    <Text
                      style={[styles.textDefault, styles.buttonText]}> Close </Text>
                  </Pressable>
                </View>

              </View>

            </Modal>

          </View>
        </View>


      </SafeAreaView>
    );
  };


  const Tutorial = createNativeStackNavigator();

  return (
    <Tutorial.Navigator
      initialRouteName="ContainerSetup-1"
      screenOptions={{
        headerShown: false
      }}>
      <Tutorial.Screen name="ContainerSetup-1" component={ContainerSetup1} />
      <Tutorial.Screen name="ContainerSetup-2" component={ContainerSetup2} />
      <Tutorial.Screen name="ContainerSetup-3" component={ContainerSetup3} />
      <Tutorial.Screen name="ContainerSetup-4" component={ContainerSetup4} />
      <Tutorial.Screen name="FoodSetup" component={FoodSetup} />
    </Tutorial.Navigator>
  );
}


export default TutorialScreen;