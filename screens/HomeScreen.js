import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'
import { Image } from 'react-native'
<<<<<<< HEAD
import MessageReactions from '../components/MessageReactions'
=======
>>>>>>> b5f6c9215b50d86f37ef2e9d247002cc50e84281

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        ))

        return unsubscribe;
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff' },
            headerTitleStyle: { color: 'black' },
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{ uri: auth?.currentUser?.photoURL }} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    marginRight: 20,
                    justifyContent: 'space-between',
                    width: 80,
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' color='black' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigation.navigate("AddChat")}
                    >
                        <SimpleLineIcons name='pencil' color='black' size={22} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({ id, data: { chatName } }) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
