import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Image,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput, TouchableOpacity
} from "react-native"
import { form_validation } from "../../form_validation"
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment/min/moment-with-locales';
import {useSelector, useDispatch} from 'react-redux';

export default function GantiSandi(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);
  moment.locale('id');
  
  const [loading, setLoading] = useState(false);
  const [valid_old_pass, setValid_old_pass] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  let refOldPassword = useRef(null);
  let refNewPassword = useRef(null);
  let refCPassword = useRef(null);

  const [layout, setLayout] = useState({
      width: 0,
      height: 0,
  });

  //check old password
  const checkCurrentPassword = async (e) => {
    let params = [];
    params.push({
      id_user: dataUser.id_user,
      old_pass: e.nativeEvent.text
    });
    
    const success = await formValidation.checkCurrentPassword(params);

    if(success.status === false) {
      await setValid_old_pass(false);
      await setOldPassword('');
      await formValidation.showError(success.msg);
      await refOldPassword.current.focus();
    }else {
      await setValid_old_pass(true);
    }
  }

  const matchPassword = (e) => {
    let password = newPassword;
    let confirmPassword = cPassword;
    let errorMsg = {}

    if(password !== '') {
      //let passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      let passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
      if(password.length < 8){
        errorMsg = '*Kata sandi tidak valid';
        refNewPassword.current.focus();
        formValidation.showError(errorMsg);
        setNewPassword('');
      }else {
        if(!password.match(passPattern)) {
          errorMsg = '*Kata sandi tidak valid';
          refNewPassword.current.focus();
          formValidation.showError(errorMsg);
          setNewPassword('');
        }
      }
    }else {
      if(valid_old_pass) {
        errorMsg = '*Kata sandi tidak boleh kosong';
      }
    }

    if(password !== '' && confirmPassword !== '') {
      if(confirmPassword !== password) {
        errorMsg = '*Kata sandi tidak sama';
        refCPassword.current.focus();
        formValidation.showError(errorMsg);
        setCPassword('');
      }
    }
  }

  const handleSubmit = async () => {
    let paramsData = [];
    paramsData.push({
      oldPassword: oldPassword,
      password: newPassword,
      cpassword: cPassword
    });

    const val = formValidation.handlePreSubmitUpdatePassword(paramsData);
    if(val.status === false) {
      if(val.password !== '') {
        formValidation.showError(val.password);
      }else if(val.cpassword !== '') {
        formValidation.showError(val.cpassword);
      }else if(val.oldPassword !== '') {
        formValidation.showError(val.oldPassword);
      }
    }else if(val.status === true) {
      setLoading(true);
      const params = [];
      params.push({
        base_url: formValidation.base_url,
        id_user: dataUser.id_user,
        password: newPassword,
        token: dataUser.token
      });

      const success = await formValidation.updatePassword(params);

      if(success.status === true) {
        setLoading(false);
        formValidation.showError('Kata sandi berhasil diperbarui...');
        backToSetting();
      }else {
        setLoading(false);
        formValidation.showError('Terjadi kesalahan...');
      }
    }
  }

  const backToSetting = async() => {
    props.navigation.goBack();
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
            <View style={styles.KataSandi}>
              <View style={styles.Body}>
                <View style={styles.EditProfil}>
                  <View style={styles.Field(true)}>
                    <Text style={styles.label}>Kata Sandi Lama</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Kata Sandi Lama'
                      secureTextEntry={true}
                      numberOfLines={1}
                      value={oldPassword}
                      onChangeText={setOldPassword}
                      onEndEditing={e => checkCurrentPassword(e)}
                      ref={refOldPassword} />
                  </View>
                  
                  <View style={styles.Field(true)}>
                    <Text style={styles.label}>Kata Sandi Baru</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Kata Sandi Baru'
                      secureTextEntry={true}
                      numberOfLines={1}
                      minLength={8}
                      maxLength={15}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      onEndEditing={e => matchPassword(e)}
                      ref={refNewPassword} />
                  </View>

                  <View style={styles.Field(true)}>
                    <Text style={styles.label}>Konfirmasi Kata Sandi</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Konfirmasi Kata Sandi'
                      secureTextEntry={true}
                      numberOfLines={1}
                      minLength={8}
                      maxLength={15}
                      value={cPassword}
                      onChangeText={setCPassword}
                      onEndEditing={e => matchPassword(e)}
                      ref={refCPassword} />
                  </View>
                  <TouchableOpacity style={styles.BtnSimpan} onPress={handleSubmit}>
                    <Text style={styles.BtnLabel}>SIMPAN</Text>
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

  KataSandi: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // paddingHorizontal: '6%',
    // paddingVertical: '2%',
    // marginHorizontal: '2%',
    // marginVertical: '2%',
  },

  EditProfil: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  Field: editable => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: editable ? "rgba(255, 255, 255, 1)" : "rgba(200, 200, 200, 0.2)",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112,112,112,0.5)",
  }),
  label: {
    // flex: 1,
    color: '#5A5A5A',
    textAlign: 'left',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
  },
  TextInput: {
    flex: 1,
    textAlign: 'right',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
  },
  // TextInput: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "flex-start",
  //   alignItems: "flex-start",
  //   paddingHorizontal: '2%',
  //   paddingVertical: '4%',
  //   marginBottom: '2%',
  //   borderRadius: 10,
  //   backgroundColor: "rgba(255, 255, 255, 1)",
  //   borderWidth: 1,
  //   borderStyle: "solid",
  //   borderColor: "rgba(112,112,112,0.5)",
  // },
  BtnSimpan: {
    marginHorizontal: '4%',
    marginTop: '6%',
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    borderRadius: 10,
    backgroundColor: "rgba(87,87,87,1)",
  },
  BtnLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
  },
})
