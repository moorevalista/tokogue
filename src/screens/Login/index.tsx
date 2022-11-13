import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking
} from 'react-native';

import { form_validation } from "../../form_validation";
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

import PushNotification, {Importance} from 'react-native-push-notification';

export default function Login(props) {
  const formValidation = useContext(form_validation);
  const base_url = formValidation.base_url;

  const [loginState, setLoginState] = useState(false);
  const [nohp, setNohp] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState('');
  const [token, setToken] = useState('');
  // const [deviceToken, setDeviceToken] = useState(null);
  const [deviceToken, setDeviceToken] = useState('ae7124026966ab6d14b3f4809afe1459bb17e910ede78d4a0f67753b165ef113');
  const [otpVerified, setOtpVerified] = useState(false);

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

  const setData = (key, value) => {
    switch(key) {
      case 'setNohp':
        setNohp(value);
        break;
      case 'setPassword':
        setPassword(value);
        break;
    }
  }

  useEffect(() => {
    showAlertBox();

    return () => {
      setLoading(false);
    }
  }, [showAlert]);

  useEffect(() => {
    loginCheck();

    return () => {
      setLoginState(false);
    }
  }, []);

  useEffect(() => {
    if(otpVerified) {
      onLoginSuccess();
    }

    return () => {
      setDeviceToken(deviceToken);
    }
  }, [otpVerified]);

  const registerToken = () => {
    PushNotification.configure({
      onRegister: async function(fcmToken) {
        console.log('TOKEN:', fcmToken);

        if(Platform.OS === 'ios') {
          let params = [];
          params.push({
            base_url: base_url,
            fcmToken: fcmToken['token']
          })
          success = await formValidation.convertToken(params);

          if(success.status === true) {
            await setDeviceToken(success.res.registration_token);
          }else {
            await setDeviceToken(null);
          }
        }else {
          await setDeviceToken(fcmToken['token']);
        }
      },
    })
    return () => {
      setDeviceToken(deviceToken);
    }
  }

  const loginCheck = async() => {
    try {
      const value = await AsyncStorage.getItem('loginStateUser')
      if(value) {
        const token = await AsyncStorage.getItem('token');
        if(token !== null) {
          let params = [];
          params.push({
            base_url: base_url,
            token: token
          });

          success = await formValidation.checkToken(params);

          if(success.status === true) {
            if(success.res.responseCode === '000') {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    {
                      name: 'MainApp',
                      params: { base_url: base_url },
                    }
                  ],
                })
              )
            }else {
              await AsyncStorage.clear();
              try {
                const value = await AsyncStorage.getItem('loginStateUser')
                if(!value) {
                  registerToken();
                }
              } catch(e) {
                alert(e);
              }
            }
          }
        }else {
          registerToken();
        }
      }else {
        registerToken();
      }
    } catch(e) {
      // error reading value
      alert(e);
    }
  }

  const handleSubmit = async() => {
    if(nohp !== '' && password !== '') {
      setLoading(true);

      if(deviceToken !== null) {
        let params = [];
        params.push({
          base_url: base_url,
          nohp: nohp,
          password: password,
          fcmToken: deviceToken
        });

        success = await formValidation.login(params);

        if(success.status === true) {
          if(success.res.responseCode !== '000') {
            await setErrMsg(success.res.message);
            await setShowAlert(true);
          }else {
            let user = [];
            user.push({
              id_user: success.res.data.id_user,
              en_id_user: success.res.data.en_id_user,
              nama_user: success.res.data.nama_user,
              hp: success.res.data.hp,
              email: success.res.data.email,
              id_outlet: success.res.data.id_outlet,
              nama_outlet: success.res.data.nama_outlet,
              id_kategori: success.res.data.id_kategori,
              kategori: success.res.data.kategori,
              address: success.res.data.address,
              verified: success.res.data.verified,
            });
            await setDataUser(user);
            await setToken(success.res.token);
            await setOtpVerified(true);
          }
          await setLoading(false);
        }
      }else {
        setLoading(false);
        formValidation.showError('Terjadi kesalahan...');
      }
    }
  }

  const onLoginSuccess = async () => {
    try {
      await AsyncStorage.setItem('loginStateUser', JSON.stringify(true));
      await AsyncStorage.setItem('hp', dataUser[0].hp);
      await AsyncStorage.setItem('id_user', dataUser[0].id_user);
      await AsyncStorage.setItem('en_id_user', dataUser[0].en_id_user);
      await AsyncStorage.setItem('nama_user', dataUser[0].nama_user);
      await AsyncStorage.setItem('email', dataUser[0].email);
      await AsyncStorage.setItem('id_outlet', dataUser[0].id_outlet);
      await AsyncStorage.setItem('nama_outlet', dataUser[0].nama_outlet);
      await AsyncStorage.setItem('id_kategori', dataUser[0].id_kategori);
      await AsyncStorage.setItem('kategori', dataUser[0].kategori);
      await AsyncStorage.setItem('address', dataUser[0].address);
      await AsyncStorage.setItem('verified', JSON.stringify(dataUser[0].verified))
      await AsyncStorage.setItem('token', token);

    } catch (error) {
      // Error saving data
      alert(error);
    }
    
    //props.navigation.navigate('mainMenuScreen', { base_url: base_url} );
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'MainApp',
            params: { base_url: base_url },
          }
        ],
      })
    )
  }

  const onRegistrasi = async () => {
    props.navigation.navigate('registrasiScreen', { base_url: base_url });
  }

  const resetPass = () => {
    props.navigation.navigate('lupaPass', { base_url: base_url });
  }

  const openInfo = async(url) => {
    props.navigation.navigate('webview', { url: url});
  }

  const showAlertBox = () => {
    return (
      <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Info"
          message={errMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          //showCancelButton={true}
          showConfirmButton={true}
          //cancelText="No, cancel"
          confirmText="Ok"
          confirmButtonColor="#DD6B55"
          //onCancelPressed={() => {
          //  setShowAlert(false);
          //}}
          onConfirmPressed={() => {
            setErrMsg('');
            setShowAlert(false);
          }}
        />
    )
  }

  const onChangeHp = (e) => {
    val = formValidation.onChangeHp(nohp, e);
    setNohp(val);
  }

  const onChangeInput = (e) => {
    val = formValidation.onChangeInput(e);
    setPassword(val);
  }

  function openUrl(e) {
    Linking.openURL(e);
  };

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
            <View style={styles.FormLogin}>
              <View style={styles.GroupLogin}>
                <Text style={styles.LabelTop}>LOGIN</Text>
                <TextInput
                  style={styles.TextInput}
                  placeholder='Nomor Handphone'
                  keyboardType="numeric"
                  value={nohp}
                  onChangeText={onChangeHp} />
                <TextInput
                  style={styles.TextInput}
                  placeholder='Kata Sandi'
                  secureTextEntry={true}
                  value={password}
                  onChangeText={onChangeInput} />
                <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                  <Text style={styles.LabelBtn}>MASUK</Text>
                </TouchableOpacity>
                <Text style={styles.LabelBottom}>Lupa Kata Sandi</Text>
                <Text style={styles.LabelBottom2}>Belum memiliki akun?</Text>
                <TouchableOpacity onPress={onRegistrasi}>
                  <Text style={styles.LabelBottom1}>DAFTAR DISINI</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {showAlertBox()}
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

  FormLogin: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(167,56,56,1)",
  },
  GroupLogin: {
    alignSelf: 'stretch',
    marginHorizontal: '8%',
    borderRadius: 20,
    backgroundColor: "rgba(255,251,251,1)",
    paddingVertical: '4%',
    paddingHorizontal: '4%',
  },
  LabelTop: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 3.6,
    color: "rgba(87,87,87,1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: '4%'
  },
  TextInput: {
    display: "flex",
    flexDirection: "column",
    alignSelf: 'stretch',
    paddingVertical: '4%',
    paddingHorizontal: '2%',
    marginBottom: '4%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112,112,112,0.5)",
  },
  Button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: 'stretch',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    marginBottom: '4%',
    borderRadius: 10,
    backgroundColor: "rgba(87,87,87,1)",
  },
  LabelBtn: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
  },
  LabelBottom: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 22,
    color: "rgba(255,0,0,1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: '5%',
  },
  LabelBottom1: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 22,
    color: "rgba(28,117,188,1)",
    textAlign: "center",
    justifyContent: "center",
  },
  LabelBottom2: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 22,
    color: "rgba(90,90,90,1)",
    textAlign: "center",
    justifyContent: "center",
  },
})
