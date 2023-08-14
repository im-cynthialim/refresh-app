import { useNavigation } from '@react-navigation/core'
import React from 'react'
import {Text, View, Pressable, Button} from 'react-native';
import styles from '../styles';

function ButtonStyle (props) {
    const label = props.label;
    const toCall = props.toCall;
    const navigation = useNavigation();


    return (
        <View>
        <Pressable
            style={({pressed}) => [{backgroundColor: pressed ? '#156B60' : '#248276'}, styles.button]}
            onPress={() => {toCall}}
            >
            
            {({pressed}) => (
            <Text style={[styles.textDefault, styles.buttonText]}>
            {label}</Text>
            )}
        </Pressable>
    </View>
    );
}

export default ButtonStyle