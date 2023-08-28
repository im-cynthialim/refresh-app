import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, TextInput, View, Image, Pressable, Button, PressableProps} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles';

function TextLabel (props) {
    const label = props.label;

    return (

        <Text style={[styles.textDefault, styles.label]}>
         {label}
        </Text>

    );
}

export default TextLabel