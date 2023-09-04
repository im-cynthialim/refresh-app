import React, { useState, useEffect, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import Modal from "react-native-modal";
import { getAuth } from 'firebase/auth';
import { Text, TextInput, View, Image, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/styles';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getDatabase, onValue, ref, push, update, child } from 'firebase/database';
import WheelPicker from 'react-native-wheely';
import { CheckBox, Icon } from '@rneui/themed';
import TextLabel from '../styles/props/TextLabel';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker';



function LogFoodScreen({ navigation }) {

    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user.uid;
    const db = getDatabase();
    const [containerNames, setContainerNames] = useState([]);

    function retrieveContainers(userId) {
        return new Promise((resolve, reject) => {
            if (userId) {
                const retrieveContentRef = ref(db, '/userprofiles/' + JSON.stringify(userId) + '/containers');

                onValue(retrieveContentRef, (snapshot) => {
                    const dataList = [];
                    snapshot.forEach((childSnapshot) => {
                        const childData = childSnapshot.val();
                        dataList.push(childData.containerName);
                    })

                    resolve(dataList);
                });
            }

            else {
                reject(new Error('User does not exist'));
            }

        });
    }

    useEffect(() => {
        async function getData() {
            try {
                const containerData = await (retrieveContainers(userId));
                // console.log(data.containerTemp);
                setContainerNames(containerData);
                // return data;
            }
            catch (error) {
                console.log("error")
            }
        }

        getData();
    }, [userId]);


    const [containerName, setContainerName] = useState('')
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


    function addFood(productName, productType, productQuantity, productCategory, dateBought, dateStored, dateOpened, personalNotes, containerName, userId) {
        const db = getDatabase();
        // if user has been defined (aka gone through proper signup)
        if (userId) {
            const foodData =

            {
                productName: productName,
                productType: productType,
                productQuantity: productQuantity,
                productCategory: productCategory,
                dateBought: dateBought,
                dateStored: dateStored,
                dateOpened: dateOpened,
                personalNotes: personalNotes
            };

            const foodListRef = ref(db, '/userprofiles/' + JSON.stringify(userId) + '/containers/' + JSON.stringify(containerName) + '/foodList');

            var length = 0;
            onValue(foodListRef, (snapshot) => {
                snapshot.forEach(() => {
                    length++;
                })
                return(length)
            });

            const updates = {};
            updates['userprofiles/' + JSON.stringify(userId) + '/containers/' + JSON.stringify(containerName) + '/foodList/' + length] = foodData;
            navigation.navigate("Main", { screen: "Home", params: { userId: userId }})
            return update(ref(db), updates);
        }

        else {
            navigation.navigate("Login")
        }

    }
    // const [foodModalVisibility, setFoodModalVisibility] = useState(true)
    return (
        <SafeAreaView style={{ backgroundColor: '#FBFEFB', height: '100%' }}>
            {/* <Modal> */}
            {/* <Modal
                        isVisible={foodModalVisibility}
                        animationInTiming={200}
                        style={{ margin: 0 }}
                        // backdropColor='rgb(7,7,7)'
                        backdropOpacity={0.56}
                        onBackdropPress={() => setFoodModalVisibility}
                        onSwipeComplete={() => setFoodModalVisibility(false)}
                        swipeDirection={'down'}
                    > */}
            {/* <ScrollView>   */}
            <View style={{ backgroundColor: '#FBFEFB', alignItems: 'center', paddingTop: 30 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[styles.subtitle, styles.textDefault, { color: '#021E20', textAlign: 'center', marginBottom: 10 }]}>
                        Add your food
                    </Text>
                    <Text style={[styles.smalltext, styles.textDefault, { color: '#B0B6B3', textAlign: 'center', marginBottom: 16 }]}>
                        Add foods to store in your container
                    </Text>
                    {/* <View style={[styles.horizontalRule]} /> */}
                </View>
                <ScrollView style={{ width: '100%', paddingTop: 15 }}>
                    <View style={{ gap: 15, paddingBottom: 65 }}>
                        {/* container line */}
                        <View style={{ alignSelf: 'flex-start', paddingLeft: 40 }}>
                            <View style={{ width: 200, }}>
                                <Text style={[styles.textDefault, { marginBottom: 10, fontSize: 14, color: '#052B2D' }]}>
                                    container
                                </Text>

                                <SelectList
                                    setSelected={(val) => setContainerName(val)}
                                    data={containerNames}
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
                                        textAlign: 'right',
                                        fontFamily: 'Rubik-Medium',
                                        backgroundColor: "#F2F2F2",
                                        color: '#052B2D',
                                        paddingHorizontal: 15,
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
                        <View style={{ alignSelf: 'flex-start', paddingHorizontal: 40, flexDirection: 'row', gap: 20 }}>
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

                        <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-start', marginLeft: 40, width: '82%' }}>
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
                                    textAlign: 'left',
                                    justifyContent: 'flex-start',
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
                                    style={[styles.textDefault, styles.buttonText]}> Add </Text>
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
                </ScrollView>
            </View>
            {/* </Modal> */}

        </SafeAreaView>
    );

}

export default LogFoodScreen;