import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View, Animated,
  ScrollView, Image, Modal, Pressable, Alert,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput
} from "react-native"

export default function DropItems(props) {
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
        return props.data.map((item) => {
            return (
                <Pressable key={item.id_product} style={styles.ItemMenu}
                    onPress={() => {
                        props.setVisible(false);
                        props.action(item.id_product);
                    }}>
                    <Text style={styles.Label}>{item.product_name}</Text>
                </Pressable>
            )
        })
    }

    // console.log(props);
    return (
       (props.visible && props.pos !== null) ?
        <Animated.View style={[styles.container(props.pos), styles.shadow, {opacity: fadeAnim}]}>
            <ScrollView
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    contentContainerStyle={styles.scrollArea_contentContainerStyle}
                >
                <RenderMenu />
            </ScrollView>
        </Animated.View>
        :
        <></>
    )
}

const styles = StyleSheet.create({
    scrollArea_contentContainerStyle: {
        height: 'auto',
        // paddingBottom: '10%'
      },
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
        maxHeight: 300,
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        // alignSelf: 'flex-end',
        // justifyContent: 'center',
        left: layout !== null ? layout.left : 0,
        top: layout !== null ? layout.top + 30 : 0,
        width: layout.width,
        zIndex: 1,
    }),
    ItemMenu: {
        flex: 1,
        width: '100%',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingVertical: '2%',
        paddingHorizontal: '2%'
    },
    Label: {
        textAlign: 'left',
        fontSize: 12,
        // marginBottom: '2%',
        fontWeight: "400",
        color: "rgba(90,90,90,1)",
    }
})