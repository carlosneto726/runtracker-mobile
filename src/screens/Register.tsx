import React, { useState } from 'react';
import { TextInput, Button, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

import styles from '../style';
import axios from 'axios';

export function Register({navigation}: NativeStackScreenProps<ParamListBase>) {

    const baseUrl = "localhost:8080/api";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sendForm () {
        var response = await axios({
            method: "post",
            url: `${baseUrl}/snj/apiCadastroFaleConosco`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                email: email,
                password: password
            },
        });

        console.log(response);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Faça o login ou o registro</Text>
                <View style={styles.exampleContainer}>
                    <Text>BANANA</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}