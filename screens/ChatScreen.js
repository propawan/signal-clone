import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { Platform, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, TextInput } from 'react-native';
import { db, auth } from '../firebase';
import * as firebase from 'firebase';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native';

const ChatScreen = ({ navigation, route }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    // const [selectedImage, setSelectedImage] = useState(null)
    let currImage = null;

    useEffect(() => {
        requestPermission();
    }, [])

    const requestPermission = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (!granted) {
            alert('You need to give Permission.')
        }
    }

    const selectImage = async () => {
        // let fireUrl = null;
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5
            });
            if (!result.cancelled) {
                let uri = result.uri;
                let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                try {
                    await uploadImage(uploadUri)
                    let imageRef = firebase.storage().ref(`media/image${messages.length}`);
                    imageRef
                        .getDownloadURL()
                        .then((url) => {
                            console.log("Url " + url);
                            // fireUrl = url;
                            // console.log('Initial seleceted Image: ' + typeof currImage)
                            // setSelectedImage({ imgUri: url })
                            currImage = { imgUri: url }
                            // console.log('Then seleceted Image: ' + typeof currImage)
                            // console.log('Selected Image Url ' + currImage.imgUri);
                            sendMessage();
                        })
                        .catch((e) => console.log('getting downloadURL of image error => ', e));
                } catch (error) {
                    console.log('Error is this: ', error)
                }
            }
        } catch (error) {
            console.log('Error reading an Image ', error)
        }
        // setSelectedImage({ imgUri: fireUrl })
        // console.log('In end seleceted Image: ' + selectedImage)
    }

    const doesImageExist = (uri) => {
        // Not completely implemented
        let imageRef = firebase.storage().ref('/' + uri);
        imageRef
            .getDownloadURL()
            .then((url) => {
                console.log("image exist", url)
                return true;
            })
            .catch((e) => {
                console.log("Error getting image");
                console.log('getting downloadURL of image error => ', e);
                return false;
            });
    }

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        let ref = firebase.storage().ref('media/').child(`image${messages.length}`);
        return ref.put(blob).then((snapshot) => { console.log("updated") });
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: 'left',
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Avatar rounded source={{
                        uri: messages[messages.length - 1]?.data.photoURL || 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png'
                    }} />
                    <Text
                        style={{
                            color: 'white',
                            marginLeft: 10,
                            fontWeight: '700'
                        }}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign name='arrowleft' size={24} color='white' />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: 80,
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={24} color='white'></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={24} color='white'></Ionicons>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])

    const sendMessage = async () => {
        Keyboard.dismiss();
        await db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
            uri: currImage
        }).then(() => {
            setInput('')
            currImage = null;
        }).catch((error) => {
            console.log("ERRRRRRRRORRRRRRRR")
            console.error("Error writing document: ", error);
        });

    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
            setMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

        return unsubscribe;
    }, [route])

    const scrollView = useRef()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style='light' />
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={90}
            >

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView ref={scrollView} contentContainerStyle={{ paddingTop: 15 }} onContentSizeChange={() => scrollView.current.scrollToEnd()}>
                            {messages.map(({ id, data }) =>
                                data.email === auth.currentUser.email
                                    ? (
                                        <View key={id} style={styles.reciever}>
                                            <Avatar
                                                containerStyle={{
                                                    position: 'absolute',
                                                    bottom: - 15,
                                                    right: -5
                                                }}
                                                position='absolute'
                                                bottom={- 15}
                                                right={-5}
                                                rounded
                                                size={30}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.recieverText}>{data.message}</Text>
                                            {data.uri && <Image
                                                source={{ uri: data.uri.imgUri }}
                                                style={{ height: 100, width: 100, backgroundColor: 'yellow' }} />}
                                        </View>
                                    ) : (
                                        <View key={id} style={styles.sender}>
                                            <Avatar
                                                containerStyle={{
                                                    position: 'absolute',
                                                    bottom: - 15,
                                                    right: -5
                                                }}
                                                position='absolute'
                                                bottom={- 15}
                                                right={-5}
                                                rounded
                                                size={30}
                                                source={{ uri: data.photoURL }}
                                            />
                                            <Text style={styles.senderText}>{data.message}</Text>
                                            <Text style={styles.senderName}>{data.displayName}</Text>
                                        </View>
                                    )
                            )}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput
                                placeholder='signal Message'
                                style={styles.textInput}
                                value={input}
                                onChangeText={(text) => setInput(text)}
                            ></TextInput>
                            <TouchableOpacity onPress={selectImage} activeOpacity={0.5} style={{ marginRight: 7 }}>
                                <AntDesign name="picture" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name='send' size={24} color='#2B68E6' />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#2B68E6',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: 'relative'
    },
    senderText: {
        color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: 'white'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: 'grey',
        borderRadius: 10
    }
})
