import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
import { TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from 'react-native';

const MessageReactions = ({ sendReaction, id }) => {

    return (
        <View style={styles.container}>
            {/* <TouchableWithoutFeedback onPress={() => console.log("Thumb pressed")}>
                <LottieView
                    source={require('../assets/lottie/thumbsup.json')}
                    style={styles.emoji}
                    autoPlay
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <LottieView
                    source={require('../assets/lottie/love.json')}
                    style={styles.emoji}
                    autoPlay
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <LottieView
                    source={require('../assets/lottie/wow.json')}
                    style={styles.emoji}
                    autoPlay
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <LottieView
                    source={require('../assets/lottie/hearteye.json')}
                    style={styles.emoji, { height: 40 }}
                    autoPlay
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <LottieView
                    source={require('../assets/lottie/laugh.json')}
                    style={styles.emoji}
                    autoPlay
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
                <LottieView
                    source={require('../assets/lottie/angry.json')}
                    style={styles.emoji, { height: 45 }}
                    autoPlay
                />
            </TouchableWithoutFeedback> */}

            <TouchableWithoutFeedback onPress={() => { sendReaction('😱', id) }}>
                <Text style={{ fontSize: 30 }}>
                    😱
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { sendReaction('😂', id) }}>
                <Text style={{ fontSize: 30 }}>
                    😂
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { sendReaction('😍', id) }}>
                <Text style={{ fontSize: 30 }}>
                    😍
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { sendReaction('👍🏻', id) }}>
                <Text style={{ fontSize: 30 }}>
                    👍🏻
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { sendReaction('❤️', id) }}>
                <Text style={{ fontSize: 30 }}>
                    ❤️
                </Text>
            </TouchableWithoutFeedback>

        </View>
    )
}

export default MessageReactions;

const styles = StyleSheet.create({
    container: {
        marginTop: 7,
        flexDirection: 'row',
        // borderColor:'black',
        borderRadius: 35,
        backgroundColor: '#424642',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        // marginLeft: 7,
        // marginRight: '50%',
        position: 'relative',
        alignSelf: 'flex-end',
    },
})
