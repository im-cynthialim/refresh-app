import React, { useState, useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import Modal from "react-native-modal";
import { Animated, Text, TextInput, View, Image, Pressable, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';
import TextLabel from '../styles/props/TextLabel';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDatabase, ref, set } from 'firebase/database';
import WheelPicker from 'react-native-wheely';
import { CheckBox, Icon } from '@rneui/themed';
import { BackgroundImage } from '@rneui/base';


function TutorialScreen({ route, navigation }) {

  function addContainer(containerName, containerTemp, factorsList, userId) {
    const db = getDatabase();
    // if user has been defined (aka gone through proper signup)
    if (userId) {
      set(ref(db, 'userprofiles/' + JSON.stringify(userId) + '/containers/'), {
        containerName: containerName
      });
    }

    else {
      navigation.navigate("Login")
    }

  }


  function ContainerSetup1({ route, navigation }) {
    const userId = route.params;
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
            <Text style={[styles.smalltext, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 16 }]}>
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

  function ContainerSetup2({ navigation }) {

    const [containerTemp, setContainerTemp] = useState('Fridge Temperature (df - asd deg F/ dfa - dfas deg C');

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
            {/* <Text style={[styles.smalltext, styles.textDefault]}>
            This is the location you'll use to
          </Text>
          <Text style={[styles.smalltext, styles.textDefault, {marginBottom: 16}]}>
            store your foods
          </Text> */}

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
              options={['Room Temperature \n(70 °F / 21 °C)', 'Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)', 'Freezer Temperature \n(0 °F / -18 °C)']}
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

  function ContainerSetup3({ navigation }) {

    const [expiryDate, setExpiryDate] = useState(true);
    const [dateBought, setDateBought] = useState(false);
    const [dateStored, setDateStored] = useState(true);
    const [dateOpened, setDateOpened] = useState(false);
    const [itemCategory, setItemCategory] = useState(false);
    const [itemQuantity, setItemQuantity] = useState(true);
    // const [productType, setProductType] = useState(false);

    const [yesterdayDate, setYesterdayDate] = useState('');
    const [twoDaysAgo, setTwoDaysAgo] = useState('');
    // const [fewDaysAgo, setFewDaysAgo] = useState('');
    // type FadeInViewProps = PropsWithChildren<{style: ViewStyle}>;

    // const FadeInView: React.FC<FadeInViewProps> = props => {
    //   const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    //   useEffect(() => {
    //     Animated.timing(fadeAnim, {
    //       toValue: 1,
    //       duration: 10000,
    //       useNativeDriver: true,
    //     }).start();
    //   }, [fadeAnim]);

    //   return (
    //     <Animated.View // Special animatable View
    //       style={{
    //         opacity: fadeAnim, // Bind opacity to animated value
    //       }}>
    //       {props.children}
    //     </Animated.View>
    //   );
    // };


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
    // type titleTest = {
    //   label: string;
    // };

    // const titleAddition = ({titleTest}) => {
    //   return (
    //     <View>
    //       <Text>
    //         {titleTest}
    //       </Text>
    //     <Image
    //            source={require('../assets/images/cooked-tag.png')}
    //            style={{ borderRadius: 7, width: 150, height: 100, resizeMode: 'stretch'}}

    //          />
    //  </View>
    //   )
    // }

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
                checked={dateBought}
                onPress={() => setDateBought(!dateBought)}
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

              {/* <CheckBox
                title="Product Type"
                checked={productType}
                containerStyle={{ width: '40%' }}
                onPress={() => setProductType(!productType)}
                fontFamily='Rubik-Medium'
                textStyle={{ color: '#021E20' }}
                uncheckedColor='#021E20'
                checkedColor='#55AA90'
                checkedIcon={'check-square'}
                uncheckedIcon={'square'}
                iconType='feather'
              /> */}

              <CheckBox
                title="Date Stored"
                checked={dateStored}
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                onPress={() => setDateStored(!dateStored)}
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








              {/* <View style={{ flexDirection: 'row', zIndex: 1 }}>
                  <View>
                    <Image
                      source={require('../assets/images/cooked-tag.png')}
                      style={{ width: 40, height: 20, resizeMode: 'contain' }}
                    />
                  </View>

                  <View>
                    <Image
                      source={require('../assets/images/raw-tag.png')}
                      style={{ width: 40, height: 20, resizeMode: 'contain' }}
                    />
                  </View>
                  <View style={{ backgroundColor: '#97D4EE', paddingVertical: 10, paddingHorizontal: 20, width: 'auto', borderRadius: 20, flexDirection: 'row' }}>

                    <Image
                      source={require('../assets/images/meal-icon.png')}
                      style={{ width: 40, height: 10, resizeMode: 'contain', }}
                    />
                    <Text style={[styles.textDefault]}>
                      Meal
                    </Text>
                  </View>
                </View> */}




              <CheckBox
                title="Date Opened"
                checked={dateOpened}
                containerStyle={{ width: '40%', backgroundColor: '#FBFEFB' }}
                onPress={() => setDateOpened(!dateOpened)}
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

                <Text style={[styles.regularFont, { color: "#021E20", opacity: dateStored ? 100 : 0, position: dateStored ? 'relative' : 'absolute', fontSize: 10 }]}>
                  {yesterdayDate}
                </Text>

                <Text style={[styles.regularFont, { color: "#9AB725", opacity: expiryDate ? 100 : 0, position: expiryDate ? 'relative' : 'absolute', fontSize: 10 }]}>
                  2 days
                </Text>

                <Text style={[styles.regularFont, { color: "#B0B6B3", opacity: dateOpened ? 100 : 0, position: dateOpened ? 'relative' : 'absolute', fontSize: 10 }]}>
                  Date Opened : {yesterdayDate}
                </Text>

                <Text style={[styles.regularFont, { color: "#B0B6B3", opacity: dateBought ? 100 : 0, position: dateBought ? 'relative' : 'absolute', fontSize: 10 }]}>
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
              onPress={() => navigation.navigate("FoodSetup-1")}
            >
              <Text
                style={[styles.textDefault, styles.buttonText]}> Next </Text>
            </Pressable>
          </View>




        </View>

        {/* <TouchableOpacity
            >
              <View
              style={{backgroundColor: modalVisibility ? 'rgba(7, 7, 7, 0.56)' : '#00000', height: '100%'}}
              />
            </TouchableOpacity> */}

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
            <View style={{ backgroundColor: '#FBFEFB', marginTop: '110%', justifyContent: 'center', paddingHorizontal: '10%', flex: 1, borderTopLeftRadius: 21, borderTopRightRadius: 21 }}>
              {/* <View style={{justifyContent: 'center'}}> */}
              <Text style={[styles.textDefault, styles.label, { color: '#96979C', textAlign: 'center' }]}>
                Indicate the state of foods in your container
              </Text>
              {/* </View> */}
              <View style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/raw-tag.png')}
                    style={{ width: 120, height: 55, resizeMode: 'center' }}
                  />
                  <View style={{ paddingLeft: '5%' }}>
                    <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Raw Food </Text>
                    <Text style={[styles.regularFont, styles.smalltext, { color: '#96979C', width: '65%' }]}>Includes items such as fresh produce and uncooked meat </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/cooked-tag.png')}
                    style={{ width: 120, height: 55, resizeMode: 'center' }}
                  />
                  <View style={{ paddingLeft: '5%' }}>
                    <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Cooked Food </Text>
                    <Text style={[styles.regularFont, styles.smalltext, { color: '#96979C' }]}>Includes all cooked items </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../assets/images/meal-tag.png')}
                    style={{ width: 120, height: 55, resizeMode: 'center' }}
                  />
                  <View style={{ paddingLeft: '5%' }}>
                    <Text style={[styles.textDefault, styles.label, { marginBottom: 2 }]}>Meal </Text>
                    <Text style={[styles.regularFont, styles.smalltext, { color: '#96979C', width: '50%' }]}>Includes items composed of multiple foods, such as yesterday's pasta dinner </Text>
                  </View>
                </View>

              </View>

            </View>
          </Modal>
        </View>





      </SafeAreaView >
    );
  };


  function FoodSetup1({ navigation }) {

    const [containerTemp, setContainerTemp] = useState('Fridge Temperature (df - asd deg F/ dfa - dfas deg C');

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
            {/* <Text style={[styles.smalltext, styles.textDefault]}>
            This is the location you'll use to
          </Text>
          <Text style={[styles.smalltext, styles.textDefault, {marginBottom: 16}]}>
            store your foods
          </Text> */}

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
              options={['Room Temperature \n(70 °F / 21 °C)', 'Fridge Temperature \n(35-38 °F / 1.6-3.3 °C)', 'Freezer Temperature \n(0 °F / -18 °C)']}
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
      initialRouteName="ContainerSetup-3"
      screenOptions={{
        headerShown: false
      }}>
      <Tutorial.Screen name="ContainerSetup-1" component={ContainerSetup1} />
      <Tutorial.Screen name="ContainerSetup-2" component={ContainerSetup2} />
      <Tutorial.Screen name="ContainerSetup-3" component={ContainerSetup3} />
      <Tutorial.Screen name="FoodSetup-1" component={FoodSetup1} />
    </Tutorial.Navigator>
  );
}


export default TutorialScreen;