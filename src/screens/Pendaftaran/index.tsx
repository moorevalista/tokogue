import React, { Component, useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Image, Text, View, ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput
} from "react-native"
import { form_validation } from "../../form_validation"
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import { CommonActions } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Registrasi(props) {
    const formValidation = useContext(form_validation);
    const base_url = formValidation.base_url;

    const [loading, setLoading] = useState(false);
    const [hpNotExist, setHpNotExist] = useState(false);
    const [statusReg, setStatusReg] = useState(false);
    const [notifReg, setNotifReg] = useState('');
    const [dataKategori, setDataKategori] = useState([]);
    const [itemKategori, setItemKategori] = useState([]);

    //variable untuk menampung data yang diinput
    const [namaToko, setNamaToko] = useState('');
    const [idKategori, setIdKategori] = useState('');
    const [namaPemilik, setNamaPemilik] = useState('');
    const [nohp, setNohp] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const refNamaToko = useRef(null);
    const refNamaPemilik = useRef(null);
    const refNohp = useRef(null);
    const refEmail = useRef(null);
    const refPassword = useRef(null);
    const refCpassword = useRef(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [buttonDaftar, setButtonDaftar] = useState(true);

    //style box textInput
    const [styleBoxNamaToko, setstyleBoxNamaToko] = useState(styles.TextInput);
    const [styleBoxKategori, setstyleBoxKategori] = useState(styles.TextInput);
    const [styleBoxNamaPemilik, setstyleBoxNamaPemilik] = useState(styles.TextInput);
    const [styleBoxHp, setstyleBoxHp] = useState(styles.TextInput);
    const [styleBoxMail, setstyleBoxMail] = useState(styles.TextInput);
    const [styleBoxPassword, setstyleBoxPassword] = useState(styles.TextInput);
    const [styleBoxCpassword, setstyleBoxCpassword] = useState(styles.TextInput);
    const [styleBoxOTP, setstyleBoxOTP] = useState(styles.TextInput);
    
    const [layout, setLayout] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        setDataSource();
    },[]);

    useEffect(() => {
        if(dataKategori) {
            listKategori();
        }
    },[dataKategori]);

    const setDataSource = async () => {
        await getKategori();
        // setLoading(false);
    }

    async function getKategori() {
        const success = await formValidation.getKategori();
        
        if(success.status === true) {
            try {
                await setDataKategori(success.res);
            } catch (error) {
                alert(error);
            } finally {
        
            }
        }
    }

    async function listKategori() {
        const newItems = dataKategori.data;
        let options = [];
        if(newItems) {
            options = newItems.map((item) => {
                return (
                    {value: item.id_category, label: item.category}
                )
            });
        }

        setItemKategori(options);
    }

    function RenderKategori() {
        const items = itemKategori;
        const placeholder = {
            label: 'Pilih Kategori Usaha',
            value: null
        };

        return (
            <RNPickerSelect
                placeholder={placeholder}
                items={items}
                onValueChange={(value) => {
                    if(value !== idKategori) {
                        setIdKategori(value);
                    }
                }}
                style={pickerSelectStyles}
                value={idKategori}
                useNativeAndroidPickerStyle={false}
            />
        )
    }

    //validasi no hp
    const onChangeHp = (e: string) => {
        const val = formValidation.onChangeHp(nohp, e);
        setNohp(val);
    }

    //set textInput style ketika inputan tidak sesuai
    const setStyleError = (e: string) => {
        //alert(JSON.stringify(e));
        if(e.namaToko !== '') {
            setstyleBoxNamaToko(styles.TextInputError);
        }else {
            setstyleBoxNamaToko(styles.TextInput);
        }
        if(e.namaToko !== '') {
            setstyleBoxKategori(styles.TextInputError);
        }else {
            setstyleBoxKategori(styles.TextInput);
        }
        if(e.namaToko !== '') {
            setstyleBoxNamaPemilik(styles.TextInputError);
        }else {
            setstyleBoxNamaPemilik(styles.TextInput);
        }
        if(e.nohp !== '') {
            setstyleBoxHp(styles.TextInputError);
        }else {
            setstyleBoxHp(styles.TextInput);
        }
        if(e.email !== '') {
            setstyleBoxMail(styles.TextInputError);
        }else {
            setstyleBoxMail(styles.TextInput);
        }
        if(e.password !== '') {
            setstyleBoxPassword(styles.TextInputError);
        }else {
            setstyleBoxPassword(styles.TextInput);
        }
        if(e.cpassword !== '') {
            setstyleBoxCpassword(styles.TextInputError);
        }else {
            setstyleBoxCpassword(styles.TextInput);
        }
    }

    //cek HP apakah sudah terdaftar/belum
    const checkHP = async () => {
        if(nohp !== '' && nohp.length >= 10) {
        setLoading(true);
        let params = [];
        params.push({ nohp: nohp });
        const success = await formValidation.checkHP(params);
        if(success.status === false) {
            setLoading(false);
            setHpNotExist(false);
            setstyleBoxHp(styles.TextInputError);
            refNohp.current.focus();
            formValidation.showError(success.msg);
        }else {
            setLoading(false);
            setHpNotExist(true);
            setstyleBoxHp(styles.TextInput);
        }
        }
    }

    //cek email apakah sudah terdaftar/belum
    const checkEmail = async () => {
        if(email !== '') {
        setLoading(true);
        let params = [];
        params.push({ email: email });
        const success = await formValidation.checkEmail(params);
        if(success.status === false) {
            setLoading(false);
            setstyleBoxMail(styles.TextInputError);
            refEmail.current.focus();
            formValidation.showError(success.msg);
        }else {
            setLoading(false);
            setstyleBoxMail(styles.TextInput);
        }
        }
    }

    //ketika user klik tombol DAFTAR
    const handleSubmit = async () => {
        let paramsData = [];
        paramsData.push({
        namaToko: namaToko,
        idKategori: idKategori,
        namaPemilik: namaPemilik,
        nohp: nohp,
        email: email,
        password: password,
        cpassword: cpassword
        });

        const val = await formValidation.handlePreSubmit(paramsData);
        if(val.status === false) {
            setStyleError(val);
            // if(val.password !== '') {
            //     formValidation.showError(val.password);
            // }else if(val.cpassword !== '') {
            //     formValidation.showError(val.cpassword);
            // }
            formValidation.showError(val.msg);
        }else if(val.status === true) {
        setLoading(true);
        let params = [];
        params.push({
            outlet_name: namaToko,
            id_category: idKategori,
            full_name: namaPemilik,
            mobile_phone_number: nohp,
            email: email,
            password: password
        });

        const success = await formValidation.registrasi(params);

        if(success.status === true) {
            setLoading(false);
            setNotifReg('Registrasi berhasil. Silahkan cek email untuk aktivasi akun anda.');
            setStatusReg(true);
        }else {
            setLoading(false);
            setStatusReg(false);
            formValidation.showError(success.msg);
        }
        }
    }

    //handle input validation sebelum disubmit
    const handleValidSubmit = async(e, name) => {
        let fieldName = name;
        let errorMsg = {};

        switch(fieldName) {
        case 'namaToko':
            if(namaToko !== '') {
                if(namaToko.length < 3) {
                    errorMsg = '*Nama Toko/Outlet tidak valid';
                    setErrorMsg(errorMsg);
                    refNamaToko.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxNamaToko(styles.TextInputError);
                }else if(!namaToko.match(/^[^\s]+[a-zA-Z .]+$/)) {
                    errorMsg = '*Nama tidak valid';
                    setErrorMsg(errorMsg);
                    refNamaToko.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxNamaToko(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxNamaToko(styles.TextInput);
                }
            }else {
                errorMsg = '';
                setErrorMsg(errorMsg);
                setstyleBoxNamaToko(styles.TextInput);
            }
            break;
        case 'namaPemilik':
            if(namaPemilik !== '') {
                if(namaPemilik.length < 3) {
                    errorMsg = '*Nama Pemilik tidak valid';
                    setErrorMsg(errorMsg);
                    refNamaPemilik.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxNamaPemilik(styles.TextInputError);
                }else if(!namaPemilik.match(/^[^\s]+[a-zA-Z .]+$/)) {
                    errorMsg = '*Nama tidak valid';
                    setErrorMsg(errorMsg);
                    refNamaPemilik.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxNamaPemilik(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxNamaPemilik(styles.TextInput);
                }
            }else {
                errorMsg = '';
                setErrorMsg(errorMsg);
                setstyleBoxNamaPemilik(styles.TextInput);
            }
            break;
        case 'idKategori':
            if(idKategori !== '') {
                if(idKategori.length < 3) {
                    errorMsg = '*Nama tidak valid';
                    setErrorMsg(errorMsg);
                    formValidation.showError(errorMsg);
                    setstyleBoxKategori(styles.TextInputError);
                }else if(!idKategori.match(/^[^\s]+[a-zA-Z .]+$/)) {
                    errorMsg = '*Nama tidak valid';
                    setErrorMsg(errorMsg);
                    formValidation.showError(errorMsg);
                    setstyleBoxKategori(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxKategori(styles.TextInput);
                }
            }else {
                errorMsg = '';
                setErrorMsg(errorMsg);
                setstyleBoxKategori(styles.TextInput);
            }
            break;
        case 'nohp':
            if(nohp !== '') {
                if(nohp.length < 10) {
                    errorMsg = '*Nomor handphone tidak valid';
                    setErrorMsg(errorMsg);
                    refNohp.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxHp(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxHp(styles.TextInputError);
                    checkHP();
                }
            }else {
                errorMsg = '';
                setErrorMsg(errorMsg);
                setstyleBoxHp(styles.TextInput);
            }
            break;
        case 'email':
            if(email !== '') {
                let pattern = new RegExp(/^[^\s]+(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if(!email.match(pattern)) {
                    errorMsg = '*Email tidak valid';
                    setErrorMsg(errorMsg);
                    refEmail.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxMail(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxMail(styles.TextInput);
                    checkEmail();
                }
            }else {
                errorMsg = '';
                setErrorMsg(errorMsg);
                setstyleBoxMail(styles.TextInput);
            }
            break;
        case 'password':
            if(password !== '') {
                let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
                if(password.length < 8) {
                    errorMsg = '*Password minimal 8 digit';
                    setErrorMsg(errorMsg);
                    refPassword.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxPassword(styles.TextInputError);
                }else if(!password.match(pattern)) {
                    errorMsg = '*Password harus mengandung kombinasi huruf besar, kecil dan angka';
                    setErrorMsg(errorMsg); 
                    refPassword.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxPassword(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxPassword(styles.TextInput);
                }
            }else {
                errorMsg = '';
                setErrorMsg(errorMsg);
                setstyleBoxPassword(styles.TextInput);
            }
            break;
        case 'cpassword':
            if(cpassword !== '' && password !== '') {
                if(cpassword !== password) {
                    errorMsg = '*Password tidak sama';
                    setErrorMsg(errorMsg);
                    refCpassword.current.focus();
                    formValidation.showError(errorMsg);
                    setstyleBoxCpassword(styles.TextInputError);
                }else {
                    errorMsg = '';
                    setErrorMsg(errorMsg);
                    setstyleBoxCpassword(styles.TextInput);
                }
            }
            break;
        }
    }

    useEffect(() => {
        showAlertBox()
    }, [statusReg])

    const showAlertBox = () => {
        return (
        <AwesomeAlert
            show={statusReg}
            showProgress={false}
            title="Info"
            message={notifReg}
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
                props.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                    {
                        name: 'loginScreen'
                    }
                    ],
                })
                )
            }}
            />
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.containerKey}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={[styles.container, styles.inner]}>
                    <View style={styles.scrollArea}>
                        <Spinner
                            visible={loading}
                            textContent={''}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <View
                            style={styles.TopForm}
                            onLayout={event => setLayout(event.nativeEvent.layout)}>
                            <View style={styles.Registrasi}>
                                <View style={styles.FormRegistrasi}>
                                    <View style={styles.RegisGroup}>
                                        <Text style={styles.TxtRegis}>REGISTRASI</Text>
                                        <TextInput
                                            style={styleBoxNamaToko}
                                            placeholder='Nama Toko/Outlet'
                                            defaultValue=""
                                            numberOfLines={1}
                                            maxLength={30}
                                            value={namaToko}
                                            onChangeText={setNamaToko}
                                            onEndEditing={e => handleValidSubmit(e, 'namaToko')}
                                            autoCapitalize="words"
                                            ref={refNamaToko}
                                            autoFocus={true} />
                                        
                                        {/* <TextInput
                                            style={styleBoxKategori}
                                            placeholder='Kategori Usaha' /> */}

                                        <RenderKategori />
                                        
                                        <TextInput
                                            style={styleBoxNamaPemilik}
                                            placeholder='Nama Pemilik'
                                            defaultValue=""
                                            numberOfLines={1}
                                            maxLength={30}
                                            value={namaPemilik}
                                            onChangeText={setNamaPemilik}
                                            onEndEditing={e => handleValidSubmit(e, 'namaPemilik')}
                                            autoCapitalize="words"
                                            ref={refNamaPemilik} />
                                        
                                        <TextInput
                                            style={styleBoxHp}
                                            placeholder='Nomor Handphone'
                                            keyboardType="phone-pad"
                                            numberOfLines={1}
                                            value={nohp}
                                            onChangeText={onChangeHp}
                                            onEndEditing={e => handleValidSubmit(e, 'nohp')}
                                            //onBlur={e => checkHP(e, 'nohp')}
                                            dataDetector="phoneNumber"
                                            maxLength={15}
                                            ref={refNohp} />
                                        
                                        <TextInput
                                            style={styleBoxMail}
                                            placeholder='Email'
                                            keyboardType="email-address"
                                            numberOfLines={1}
                                            maxLength={50}
                                            value={email}
                                            onChangeText={setEmail}
                                            onEndEditing={e => handleValidSubmit(e, 'email')}
                                            //onBlur={e => checkEmail(e, 'email')}
                                            textContentType="emailAddress"
                                            autoCapitalize="none"
                                            ref={refEmail} />
                                        
                                        <TextInput
                                            style={styleBoxPassword}
                                            placeholder='Kata Sandi'
                                            numberOfLines={1}
                                            minLength={8}
                                            maxLength={15}
                                            value={password}
                                            onChangeText={setPassword}
                                            onEndEditing={e => handleValidSubmit(e, 'password')}
                                            secureTextEntry={secureTextEntry}
                                            ref={refPassword} />
                                        
                                        <TextInput
                                            style={styleBoxCpassword}
                                            placeholder='Konfirmasi Kata Sandi'
                                            numberOfLines={1}
                                            minLength={8}
                                            maxLength={15}
                                            value={cpassword}
                                            onChangeText={setCpassword}
                                            onEndEditing={e => handleValidSubmit(e, 'cpassword')}
                                            secureTextEntry={secureTextEntry1}
                                            ref={refCpassword} />
                                        
                                        <TouchableOpacity style={styles.Button} onPress={handleSubmit}>
                                            <Text style={styles.TxtButton}>DAFTAR</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.label}>
                                        Dengan masuk atau daftar, maka kamu sudah setuju dengan segala
                                        Ketentuan Layanan dan Kebijakan Privasi pada platform ini.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {showAlertBox()}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerKey: {
        flex: 1,
        // paddingTop: '10%',
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
    TopForm: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    RegisGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    },

    Registrasi: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(167,56,56,1)",
    },
    FormRegistrasi: {
        flex: 0.8,
        alignSelf: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        borderRadius: 20,
        backgroundColor: "rgba(255,251,251,1)"
    },
    TxtRegis: {
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 3.6,
        color: "rgba(87,87,87,1)",
        textAlign: "center",
        justifyContent: "center",
        marginBottom: '5%',
    },
    TextInput: {
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: '4%',
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(112,112,112,0.5)",
    },
    TextInputError: {
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: '4%',
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgba(167,56,56,1)",
    },
    Button: {
        marginTop: '5%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: '4%',
        paddingHorizontal: '4%',
        marginBottom: '5%',
        borderRadius: 10,
        backgroundColor: "rgba(87,87,87,1)",
    },
    TxtButton: {
        fontSize: 12,
        fontWeight: "700",
        color: "rgba(255, 255, 255, 1)",
        textAlign: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 12,
        color: "#5A5A5A",
        textAlign: "center",
    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
    //   fontSize: 12,
      paddingVertical: '4%',
      paddingHorizontal: '4%',
      borderWidth: 1,
      borderColor: "rgba(112,112,112,0.5)",
      borderRadius: 10,
      marginBottom: '4%',
    //   color: 'black',
    //   paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 12,
      paddingHorizontal: '4%',
      //paddingVertical: 8,
      // borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  