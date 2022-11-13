import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Image,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput, TouchableOpacity
} from "react-native"
import { form_validation } from "../../form_validation"
import Header from "../../components/besar/Header"
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment/min/moment-with-locales';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function Pengaturan(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);
  moment.locale('id');
  
  const [loading, setLoading] = useState(false);

  const [layout, setLayout] = useState({
      width: 0,
      height: 0,
  });

  // untuk icon
  const Icons = ({name, color, size, opacity}) => {
    return (
      <Icon
        style={{
          backgroundColor: 'transparent',
          color: color ? color : 'rgba(0,0,0,1)',
          fontSize: size ? size : 16,
          opacity: opacity ? opacity : 0.8,
        }}
        name={name}
      />
    );
  };

  function OpenScreen(screen) {
    props.navigation.navigate(screen);
  }

  async function logout() {
    let params = [];
    params.push({
      id_user: dataUser.id_user,
      token: dataUser.token
    });

    const success = await formValidation.logout(params);
    
    if(success.res.status === 200) {
      await AsyncStorage.clear();
      try {
        const value = await AsyncStorage.getItem('loginStateUser')
        if(!value) {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [
                {
                  name: 'loginScreen',
                }
              ],
            })
          )
        }
      } catch(e) {
        alert(e);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKey}
      >
      <View style={[styles.container, styles.inner]}>
        <View style={styles.scrollArea}>
          <Spinner
            visible={loading}
            textContent={''}
            textStyle={styles.spinnerTextStyle}
          />
          <View
            style={styles.Beranda}
            onLayout={event => setLayout(event.nativeEvent.layout)}>
            <View style={styles.Pengaturan}>
              <View style={styles.PengaturanInner}>
                <Header />
              
                <View style={styles.Body}>
                  <TouchableOpacity style={styles.BtnProfil} onPress={() => OpenScreen('profileScreen')}>
                    <Icons name={'home-outline'} color='#5A5A5A' size={25} opacity={1} />
                    <Text style={styles.LabelMenu}>Profil Toko</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Icons name={'chevron-forward-outline'} color='#5A5A5A' size={25} opacity={1} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BtnProfil} onPress={() => OpenScreen('gantiSandi')}>
                    <Icons name={'lock-open-outline'} color='#5A5A5A' size={25} opacity={1} />
                    <Text style={styles.LabelMenu}>Ganti Kata Sandi</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Icons name={'chevron-forward-outline'} color='#5A5A5A' size={25} opacity={1} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BtnProfil}>
                    <Icons name={'help-circle-outline'} color='#5A5A5A' size={25} opacity={1} />
                    <Text style={styles.LabelMenu}>Kebijakan Privasi</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Icons name={'chevron-forward-outline'} color='#5A5A5A' size={25} opacity={1} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BtnProfil}>
                    <Icons name={'information-circle-outline'} color='#5A5A5A' size={25} opacity={1} />
                    <Text style={styles.LabelMenu}>Tentang Kami</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Icons name={'chevron-forward-outline'} color='#5A5A5A' size={25} opacity={1} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BtnProfil}>
                    <Icons name={'alert-circle-outline'} color='#5A5A5A' size={25} opacity={1} />
                    <Text style={styles.LabelMenu}>Syarat dan Ketentuan Layanan</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Icons name={'chevron-forward-outline'} color='#5A5A5A' size={25} opacity={1} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.BtnProfil} onPress={logout}>
                    <Icons name={'exit-outline'} color='#5A5A5A' size={25} opacity={1} />
                    <Text style={styles.LabelMenu}>Keluar</Text>
                    {/* <Icons name={'chevron-forward-outline'} color='#5A5A5A' size={25} opacity={1} /> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerKey: {
      flex: 1,
  },
  scrollArea_contentContainerStyle: {
    height: 'auto',
    paddingBottom: '10%'
  },
  inner: {
      padding: 0,
      flex: 1,
      justifyContent: "space-around",
  },
  spinnerTextStyle: {
      color: '#FFF'
  },
  scrollArea: {
      flex: 1,
  },
  Beranda: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
  },
  Pengaturan: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  PengaturanInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  Body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-end",
    paddingHorizontal: '6%',
    paddingVertical: '2%',
    marginHorizontal: '2%',
    marginVertical: '2%',
  },

  
  BtnProfil: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: '1%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderColor: '#5A5A5A',
  },
  LabelMenu: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(90,90,90,1)",
    marginLeft: '2%'
  },
})
