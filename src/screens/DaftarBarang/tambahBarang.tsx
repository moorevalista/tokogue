import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { form_validation } from "../../form_validation"
import { useSelector, useDispatch } from 'react-redux';

export default function TambahBarang(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);

  const containerRef = useRef(null);
  const refHarga = useRef(null);

  //data yang diinput
  const [idProductCategory, setIdProductCategory] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [harga, setHarga] = useState('');
  const [satuan, setSatuan] = useState('');
  const [stok, setStok] = useState('');

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

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  async function handleChange(ev, field) {
    let value = ev;
    value = value.replace(/\./g,"");

    const newValue = await formValidation.convertDecimal(value);

    switch(field) {
      case 'harga':
        setHarga(newValue);
        break;
      case 'stok':
        setStok(newValue);
        break;
    }
    // await setHarga(hargaJual);
  }

  async function handleEndEditing(ev, field) {
    let value = ev.nativeEvent.text;
    value = value.replace(/\./g,"");

    if(value !== '' && value < 100) {
      formValidation.showError('Harga tidak valid!');
      refHarga.current.focus();
    }else {
      const newValue = await formValidation.convertDecimal(value);

      switch(field) {
        case 'harga':
          setHarga(newValue);
          break;
        case 'stok':
          setStok(newValue);
          break;
      }
      // await setHarga(hargaJual);
    }
  }

  function RenderProductCategory() {
    const items = props.itemProductCategory;
    const placeholder = {
      label: 'Kategori Barang',
      value: null
    };

    return (
      <RNPickerSelect
        placeholder={placeholder}
        items={items}
        onValueChange={(value) => {
          if(value !== idProductCategory) {
            setIdProductCategory(value);
          }
        }}
        style={pickerSelectStyles}
        value={idProductCategory}
        useNativeAndroidPickerStyle={false}
      />
    )
  }

  const onSubmit = async () => {
    let params = [];

    let price = await formValidation.revertDecimal(harga);
    let stock = await formValidation.revertDecimal(stok);
    params.push({
      id_outlet: dataUser.id_outlet,
      product_name : namaBarang,
      id_product_category: idProductCategory,
      price: price,
      unit: satuan,
      stock: stock,
      token: dataUser.token,
      method: 'add'
    });

    const success = await formValidation.setProduct(params);
    // console.log(success);

    if(success.status === 200) {
      setIdProductCategory('');
      setNamaBarang('');
      setHarga('');
      setSatuan('');
      setStok('');
      props.setData();
      formValidation.showError(success.message);
    }else {
      formValidation.showError(success.toString());
    }
  }

  return (
    <View style={[styles.FormKategori, styles.shadow]} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
      <View style={styles.GroupKategori}>
        <Text style={styles.TopLabel}>Tambah Barang</Text>
        <TextInput
          style={styles.TextInput}
          placeholder='Nama Barang'
          autoCapitalize="words"
          onChangeText={setNamaBarang}
          maxLength={50}
          value={namaBarang}
        />
          
        <RenderProductCategory />
          
        <TextInput
          style={styles.TextInput}
          placeholder='Harga Satuan'
          onChangeText={setHarga}
          defaultValue={harga}
          keyboardType='decimal-pad'
          onChangeText={(e) => handleChange(e, 'harga')}
          onEndEditing={(e) => handleEndEditing(e, 'harga')}
          ref={refHarga}
        />
          
        <TextInput
          style={styles.TextInput}
          placeholder='Satuan Barang (contoh: Kotak, Sachet, Dus, Pack, dll)'
          autoCapitalize="words"
          onChangeText={setSatuan}
          value={satuan}
        />
          
        <TextInput
          style={styles.TextInput}
          placeholder='Jumlah Stok'
          onChangeText={setStok}
          value={stok}
          keyboardType='decimal-pad'
          onChangeText={(e) => handleChange(e, 'stok')}
        />
          
        <TouchableOpacity style={[styles.BtnSimpan, styles.shadow]} onPress={onSubmit}>
          <Text style={styles.BtnLabel}>SIMPAN BARANG</Text>
        </TouchableOpacity>
          
      </View>
      <Pressable
        style={props.styleBtn}
        onPress={() => props.setModalProduct(!props.setModalProduct)}
      >
        <Icons name={'close'} color='#FFFFFF' size={18} opacity={1} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: '2%',
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
  scrollArea_contentContainerStyle: {
    height: 'auto',
    paddingBottom: '10%',
  },
  FormKategori: {
    height: '40%',
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: 'center',
    alignItems: 'stretch',
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    // borderWidth: 0.5,
    // borderColor: '#5A5A5A'
  },
  GroupKategori: {
    flex: 1,
    display: "flex",
  },
  TopGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  TopLabel: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: '2%',
    fontWeight: "700",
    color: "rgba(90,90,90,1)",
  },
  TextInput: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112,112,112,0.5)",
    borderRadius: 5,
    marginBottom: '2%'
  },
  FloppyDisk: {
    paddingHorizontal: '1%',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  ItemKategori: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginBottom: '1%',
    backgroundColor: "rgba(90,90,90,0.1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(90,90,90,0.5)",
  },
  LabelKategori: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(90,90,90,1)",
    // marginRight: 276,
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
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 5,
    // backgroundColor: "rgba(255,251,251,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
    marginBottom: '2%'
  },
  inputAndroid: {
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 5,
    // backgroundColor: "rgba(255,251,251,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
    marginBottom: '2%'
  },
});