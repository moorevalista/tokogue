import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { form_validation } from "../../form_validation";
import { useSelector, useDispatch } from 'react-redux';

export default function UbahBarang(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);

  const containerRef = useRef(null);
  const productRef = useRef(null);

  //data yang diinput
  const [productName, setProductName] = useState('');

  //barang yang aka diupdate stoknya
  const newData = props.dataProduct.filter(
    item => item.id_product === props.id
  );

  useEffect(() => {
    if(newData.length > 0) {
      setProductName(newData[0].product_name);
      productRef.current.focus();
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

  const ChangeProduct = async () => {
    let params = [];
    params.push({
      id_outlet: newData[0].id_outlet,
      token: dataUser.token,
      id_product: newData[0].id_product,
      product_name: productName,
      method: 'editName'
    });

    const success = await formValidation.setProduct(params);

    if(success.status === 200) {
      setProductName('');
      props.setData();
      formValidation.showError(success.message);
      props.setModalEditProduct(!props.setModalEditProduct);
    }else {
      formValidation.showError(success.toString());
    }
  }

  return (
    <View style={[styles.FormKategori, styles.shadow]} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
      <View style={styles.GroupKategori}>
        <Text style={styles.TopLabel}>Ubah Nama Barang</Text>
        <View style={styles.TopGroup}>
          <TextInput
            style={styles.TextInput}
            placeholder='Nama Barang'
            autoCapitalize="words"
            onChangeText={setProductName}
            value={productName}
            maxLength={50}
            ref={productRef}
          />
          <TouchableOpacity style={styles.FloppyDisk} onPress={ChangeProduct}>
            <Icons name={'save'} color='#5A5A5A' size={32} opacity={1} />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        style={props.styleBtn}
        onPress={() => props.setModalEditProduct(!props.setModalEditProduct)}
      >
        <Icons name={'close'} color='#FFFFFF' size={18} opacity={1} />
      </Pressable>
    </View>
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
  scrollArea_contentContainerStyle: {
    height: 'auto',
    paddingBottom: '10%',
  },
  FormKategori: {
    height: 100,
    width: '100%',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignSelf: 'center',
    alignItems: 'stretch',
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
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


})
