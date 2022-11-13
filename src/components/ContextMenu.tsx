import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, Animated,
  ScrollView, Image, Modal, Pressable, Alert,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput
} from "react-native"

export default function ContextMenu(props) {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        if(props.visible) {
            Animated.timing(
            fadeAnim,
            {
                useNativeDriver: true,
                toValue: 1,
                duration: 500,
            }
            ).start();
        }else {
            Animated.timing(
                fadeAnim,
                {
                    useNativeDriver: true,
                    toValue: 0,
                    duration: 500,
                }
                ).start();
        }
    }, [props.visible]);

    const RenderMenu = () => {
        return props.menu.map((item) => {
            return (
                <Pressable key={item.index} style={styles.ItemMenu}
                    onPress={() => {
                        props.setVisible(false);
                        switch(props.type) {
                            case 'changeCategory':
                                props.action();
                                break;
                            case 'sortData':
                                if(item.index !== null) {
                                    props.action(item.index);
                                }
                                break;
                            case 'editProduct':
                                props.action(item.index);
                                break;
                            case 'menuItemTrx':
                                props.action(item.index);
                            default:
                                null
                        }
                    }}>
                    <Text style={styles.Label}>{item.menu}</Text>
                </Pressable>
            )
        })
    }

    // console.log(props);
    return (
       (props.visible && props.pos !== null) ?
       <Animated.View style={[styles.container(props.pos), styles.shadow, {opacity: fadeAnim}]}>
            <RenderMenu />
        </Animated.View>
        :
        <></>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    centeredView: {
        borderWidth: 3
    },
    container: layout => ({
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        right: layout !== null ? layout.width + 20 : 0,
        top: layout !== null ? layout.top : 0,
        zIndex: 1
    }),
    ItemMenu: {
        flex: 1,
        // borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        // borderColor: 'red',
        // borderBottomWidth: 0.3,
        paddingVertical: '2%',
        // marginBottom: '2%',
        paddingHorizontal: '2%',
    },
    Label: {
        textAlign: 'center',
        fontSize: 12,
        // marginBottom: '2%',
        fontWeight: "400",
        color: "rgba(90,90,90,1)",
    }
})