import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const register = () => {

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Text h3 style={{ marginBottom: 100 }}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input
                    placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    type='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input
                    placeholder='Profile Picture Url (Optional)'
                    type='text'
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(imageUrl)}
                    onSubmitEditing={register}
                />

            </View>
            <Button
                containerStyle={styles.button}
                raised
                onPress={register}
                title='Register' />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300
    }
})
