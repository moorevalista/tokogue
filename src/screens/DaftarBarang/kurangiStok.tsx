import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { form_validation } from "../../form_validation"
import { useSelector, useDispatch } from 'react-redux';

export default function KurangiStok(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);

  const containerRef = useRef(null);

  //data yang diinput
  const [stok, setStok] = useState('');
  const [keterangan, setKeterangan] = useState('');

  //barang yang aka diupdate stoknya
  const newData = props.dataProduct.filter(
    item => item.id_product === props.id
  );

  useEffect(() => {
    if(newData.length > 0) {

    }
  },[]);

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

  async function handleChange(ev) {
    let stok = ev;
    stok = stok.replace(/\./g,"");

    const newStok = await formValidation.convertDecimal(stok);
    await setStok(newStok);
  }

  const onSubmit = async () => {
    let params = [];

    params.push({
      id_outlet: dataUser.id_outlet,
      id_product: newData[0].id_product,
      stock: stok,
      info: keterangan,
      token: dataUser.token,
      method: 'editReduce'
    });

    const success = await formValidation.setProduct(params);

    if(success.status === 200) {
      setStok('');
      setKeterangan('');
      props.setData();
      formValidation.showError(success.message);
    }else {
      formValidation.showError(success.toString());
    }
  }

  return (
    <View style={[styles.FormKategori, styles.shadow]} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
      <View style={styles.GroupKategori}>
        <Text style={styles.TopLabel}>Kurangi Stok Barang</Text>
        <View style={styles.TitleBox}>
          <Text style={[styles.ItemLabel, {width: '25%'}]}>Nama Barang</Text>
          <Text style={styles.ItemLabel}>:</Text>
          <Text style={styles.ItemLabel}>{newData[0].product_name}</Text>
        </View>
        <View style={styles.TitleBox}>
          <Text style={[styles.ItemLabel, {width: '25%'}]}>Stok Tersedia</Text>
          <Text style={styles.ItemLabel}>:</Text>
          <Text style={styles.ItemLabel}>{formValidation.formatDecimal(newData[0].stock.toString()) + ' ' + newData[0].unit}</Text>
        </View>
        <View style={styles.TitleBox}>
          <Text style={[styles.ItemLabel, {width: '25%'}]}>Kurangi Stok</Text>
          <Text style={styles.ItemLabel}>:</Text>
          <TextInput
            style={[styles.TextInput, {marginRight: '2%'}]}
            placeholder='Stok'
            value={stok}
            keyboardType='decimal-pad'
            onChangeText={(e) => handleChange(e)}
          />
          <Text style={styles.ItemLabel}>{newData[0].unit}</Text>
        </View>
        <View style={styles.TitleBox}>
          <Text style={[styles.ItemLabel, {width: '25%'}]}>Keterangan</Text>
          <Text style={styles.ItemLabel}>:</Text>
          <TextInput
            style={[styles.TextInput, {flex: 1,marginRight: '2%'}]}
            placeholder='contoh: Kadaluarsa, Rusak, dll'
            onChangeText={setKeterangan}
            maxLength={100}
            autoCapitalize="words"
            value={keterangan}
          />
        </View>
          
        <TouchableOpacity style={[styles.BtnSimpan, styles.shadow]} onPress={onSubmit}>
          <Text style={styles.BtnLabel}>SIMPAN</Text>
        </TouchableOpacity>
          
      </View>
      <Pressable
        style={props.styleBtn}
        onPress={() => props.setModalReduceProduct(!props.setModalReduceProduct)}
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
    height: '35%',
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
  TitleBox: {
    alignSelf: 'stretch',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingVertical: '1%',
    borderBottomWidth: 1,
    borderColor: "rgba(218,218,218,1)",
  },
  ItemLabel: {
    textAlign: 'left',
    alignSelf: 'center',
    fontSize: 12,
    paddingVertical: '2%',
    marginRight: '2%',
    fontWeight: "700",
    color: "rgba(90,90,90,1)",
  },
  TextInput: {
    flex: 0.3,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(112,112,112,0.5)",
    borderRadius: 5,
    // marginBottom: '2%'
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
    marginTop: '4%',
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