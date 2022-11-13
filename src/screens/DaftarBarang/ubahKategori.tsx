import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet, Text, View,
  TextInput, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { form_validation } from "../../form_validation";
import { useSelector, useDispatch } from 'react-redux';

export default function UbahKategori(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);

  // console.log(props);
  const containerRef = useRef(null);
  const categoryRef = useRef();

  const [newProductCategory, setNewProductCategory] = useState(''); //nama kategori yang baru

  //kategori yang akan diubah
  const newData = props.dataProductCategory.filter(
    item => item.id_product_category === props.id
  );

  useEffect(() => {
    if(newData.length > 0) {
      setNewProductCategory(newData[0].product_category);
      categoryRef.current.focus();
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

  const ChangeKategori = async () => {
    let params = [];
    params.push({
      id_outlet: newData[0].id_outlet,
      token: dataUser.token,
      idProductCategory: newData[0].id_product_category,
      productCategory: newProductCategory,
      method: 'edit'
    });

    const success = await formValidation.setProductCategory(params);

    if(success.status === 200) {
      setNewProductCategory('');
      props.setData();
      formValidation.showError(success.message);
      props.setModalVisible(!props.modalVisible);
    }else {
      formValidation.showError(success.toString());
    }
  }

  return (
    <View style={[styles.FormKategori, styles.shadow]} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
      <View style={styles.GroupKategori}>
        <Text style={styles.TopLabel}>Ubah Kategori</Text>
        <View style={styles.TopGroup}>
          <TextInput
            style={styles.TextInput}
            placeholder='Kategori (contoh: Makanan, Minuman, Sembako, dll)'
            autoCapitalize="words"
            onChangeText={setNewProductCategory}
            value={newProductCategory}
            maxLength={30}
            ref={categoryRef} />
          <TouchableOpacity style={styles.FloppyDisk} onPress={ChangeKategori}>
            <Icons name={'save'} color='#5A5A5A' size={32} opacity={1} />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        style={props.styleBtn}
        onPress={() => props.setModalVisible(!props.modalVisible)}
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
