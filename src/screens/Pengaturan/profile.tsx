import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Image,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput, TouchableOpacity, Alert
} from "react-native"
import { form_validation } from "../../form_validation"
import Header from "../../components/besar/Header"
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment/min/moment-with-locales';
import {useSelector, useDispatch} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import Geolocation from '@react-native-community/geolocation';
import Mapslokasi from "../../components/Mapslokasi";
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile(props) {
  const {dataUser} = useSelector(state => state);
  const dispatch = useDispatch();
  const formValidation = useContext(form_validation);
  moment.locale('id');
  
  const [loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState([]);
  const [itemsKategori, setItemsKategori] = useState([]);

  //new Data
  const [idKategori, setIdKategori] = useState('');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const [layout, setLayout] = useState({
      width: 0,
      height: 0,
  });

  useEffect(() => {
    setData();
  },[]);

  useEffect(() => {
    if(kategori.length > 0) {
      listKategori();
    }
  },[kategori]);

  useEffect(() => {
    if((lat !== '' && lat !== null && lon !== '' && lon !== null) && address === null) {
      getLocation(lat, lon);
    }
  },[lat, lon]);

  const setData = async () => {
    setIdKategori(parseInt(dataUser.id_kategori));
    setAddress(dataUser.address);
    if(dataUser.address === null) {
      // alert('1');
      await getCurrentPosition();
    }else {
      // alert(dataUser.address);
      await getLocationByAddress(dataUser.address);
    }
    getKategori();
  }

  async function getCurrentPosition() {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  async function getLocation(lat, lon) {
    success = await formValidation.getLocation(lat, lon);

    setAddress(success);
    return(success);
  }

  async function getLocationByAddress(ev) {
    success = await formValidation.getLocationByAddress(ev);

    if(success !== undefined) {
      setLat(success.lat);
      setLon(success.lng);
    }
    return(success);
  }

  function onMarkerDragEnd(coord) {
    setLat(coord.latitude);
    setLon(coord.longitude);

    getLocation(coord.latitude, coord.longitude);
  }

  const getKategori = async () => {
    setLoading(true);
    const success = await formValidation.getKategori();
    
    if(success.res.status === 200) {
      try {
        setKategori(success.res.data);
      } catch(error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    }
  }

  function listKategori() {
    const newItems = kategori;
    let options = [];

    if(newItems.length > 0) {
      options = newItems.map((item) => {
        return (
          {value: item.id_category, label: item.category}
        )
      });
    }
    setItemsKategori(options);    
  }

  function RenderKategori() {
    const items = itemsKategori;
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

  const onSubmit = async () => {
    if(address !== '') {
      setLoading(true);
      const geoLocation = await getLocationByAddress(address);

      if((geoLocation.lat !== '' && geoLocation.lat !== null) && (geoLocation.lng !== '' && geoLocation.lng !== null)) {
        let params = [];
        params.push({
          id_user: dataUser.id_user,
          id_category: idKategori,
          address: address,
          lat: geoLocation.lat,
          lon: geoLocation.lng,
          token: dataUser.token
        });

        const success = await formValidation.updateDataOutlet(params);

        if(success.status === 200) {
          if(success.responseCode !== '000') {
            setLoading(false);
            formValidation.showError(success.message);
          }else {
            try{
              await AsyncStorage.setItem('id_kategori', idKategori.toString());
              await AsyncStorage.setItem('address', address);
            } catch(error) {
              alert(error);
            } finally {
              let payload = [];
              payload.push({
                id_kategori: idKategori,
                address: address
              });

              dispatch({type: 'updateDataOutlet', payload: payload});
              formValidation.showError(success.message);
              setLoading(false);
              props.navigation.goBack();
            }
          }
        }else {
          setLoading(false);
          // alert(success);
          formValidation.showError(success.toString());
        }


      }else {
        setLoading(false);
        formValidation.showError('Gagal mendapatkan lokasi, pastikan GPS anda aktif.');
      }
    }else {
      formValidation.showError('Alamat harus diisi !');
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
            <View style={styles.ProfilToko}>
              <View style={styles.Body}>
                <View style={styles.EditProfil}>
                  <View style={styles.Field(false)}>
                    <Text style={styles.label}>Nama Toko/Outlet</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Nama Toko'
                      value={dataUser.nama_outlet}
                      editable={false} />
                  </View>

                  <View style={styles.Field(true)}>
                    <Text style={styles.label}>Kategori Usaha</Text>
                    <View style={styles.TextInput}>
                      <RenderKategori />
                    </View>
                  </View>

                  <View style={styles.Field(false)}>
                    <Text style={styles.label}>Nama Pemilik</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Nama Pemilik'
                      value={dataUser.nama_user}
                      editable={false} />
                  </View>
                  
                  <View style={styles.Field(false)}>
                    <Text style={styles.label}>No. Handphone</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Nomor Handphone'
                      value={dataUser.hp}
                      editable={false} />
                  </View>

                  <View style={styles.Field(false)}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Email'
                      value={dataUser.email}
                      editable={false} />
                  </View>

                  <View style={styles.Field(true)}>
                    <Text style={styles.label}>Alamat</Text>
                    <TextInput
                      style={styles.TextInput}
                      placeholder='Alamat Toko/Outlet'
                      value={address}
                      // multiline={true}
                      maxLength={255}
                      editable={true}
                      onChangeText={setAddress}
                      onEndEditing={(value) => getLocationByAddress(value.nativeEvent.text)}
                      autoCapitalize='words' />
                  </View>

                  {(lat !== '' && lon !== '') ?
                    <View style={[styles.Maps, styles.shadow]}>
                      <Mapslokasi
                        style={styles.mapstag}
                        onMarkerDragEnd={onMarkerDragEnd}
                        lat={lat}
                        lon={lon}
                      />
                    </View>
                    :
                    <></>
                  }
                  <TouchableOpacity style={[styles.BtnSimpan, styles.shadow]} onPress={onSubmit}>
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
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
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
  Maps: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '2%',
    paddingHorizontal: '4%',
  },
  mapstag: {
    height: 240,
    marginBottom: '4%'
  },
  Beranda: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
  },
  ProfilToko: {
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
  BtnSimpan: {
    marginHorizontal: '4%',
    marginTop: '2%',
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
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    alignSelf: 'flex-end'
    // flex: 1,
    // flexDirection: 'row',
    // paddingVertical: '4%',
    // paddingHorizontal: '2%',
    // borderWidth: 1,
    // borderColor: "rgba(112,112,112,0.5)",
  },
  inputAndroid: {
    alignSelf: 'flex-end'
    // flex: 1,
    // flexDirection: 'row',
    // paddingVertical: '4%',
    // paddingHorizontal: '2%',
    // borderWidth: 1,
    // borderColor: "rgba(112,112,112,0.5)",
  },
});
