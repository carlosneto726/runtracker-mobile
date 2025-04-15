import React, { useState } from 'react';
import { TextInput, Button, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import styles from '../style';
import { login, getUser } from '../services/ApiService';

export function Login({navigation}: NativeStackScreenProps<ParamListBase>) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function sendForm () {
        const response = await login(email, password);
        if (response) {
            Alert.alert('Logado com sucesso.', 'Parabéns você sabe o seu usuário e senha, pode vazar daqui.');
            setEmail("");
            setPassword("");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <Text style={styles.sectionTitle}>Faça o login ou o registro</Text>
                <View style={styles.exampleContainer}>
                    <View style={styles.fieldSet}>
                        <Text style={styles.exampleTitle}>Email: </Text>
                            <TextInput
                                style={[styles.textInput]}
                                onChangeText={text => {setEmail(text)}}
                                value={email}
                            />
                    </View>
                    <View style={styles.fieldSet}>
                        <Text style={styles.exampleTitle}>Senha: </Text>
                        <TextInput
                            style={[styles.textInput]}
                            onChangeText={text => {setPassword(text)}}
                            secureTextEntry={true}
                            value={password}
                        />
                    </View>
                    <Button title='Entrar' onPress={sendForm}/>
                    <Text style={{ marginHorizontal: 'auto', marginVertical: 10 }}>Ou</Text>
                    <Button title='Registrar' onPress={() => navigation.navigate('Registrar')}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
