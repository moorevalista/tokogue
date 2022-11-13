import React, { useState, useRef } from "react";
import {
  StyleSheet, Text, View, ScrollView, Modal, TouchableWithoutFeedback,
  TextInput, TouchableOpacity, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ContextMenu from '../../components/ContextMenu';
import UbahKategori from './ubahKategori';

export default function TambahKategori(props) {

  const [id, setId] = useState('');
  const [visible, setVisible] = useState(false);

  const [measure, setMeasure] = useState(null);
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

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

  const menu = [
    {index: 0, menu: 'Ubah Nama'}
  ];

  function openMenu(e) {
    setId(e);
    setVisible(!visible);

    if(itemRef.current) {
      itemRef.current.measureLayout(
        containerRef.current,
        (left, top, width, height) => {
          setMeasure({ left, top, width, height });
        }
      );
    }
  }

  const RenderKategori = () => {
    const newItems = props.dataProductCategory;

    if(newItems) {
      return newItems.map((item) => {
        return (
          <View key={item.id_product_category} style={styles.ItemKategori}>
            <Text style={styles.LabelKategori}>{item.product_category}</Text>
            <Pressable onPress={() => openMenu(item.id_product_category)} ref={itemRef}>
              <Icons name={'ellipsis-horizontal'} color='#5A5A5A' size={18} opacity={1}/>
            </Pressable>
          </View>
        )
      })
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={[styles.FormKategori, styles.shadow]} onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
        <ContextMenu id={id} visible={visible} pos={measure} menu={menu} setVisible={setVisible} type="changeCategory" action={() => setModalVisible(true)} />
        
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   Alert.alert("Modal has been closed.");
          //   setModalVisible(!modalVisible);
          // }}
        >
          <View style={styles.centeredView}>
            <UbahKategori
              id={id}
              setData={props.setData}
              dataProductCategory={props.dataProductCategory}
              styleBtn={props.styleBtn}
              setModalVisible={setModalVisible}
              modalVisible={modalVisible} />
          </View>
        </Modal>

        <View style={styles.GroupKategori}>
          <Text style={styles.TopLabel}>Kategori</Text>
          <View style={styles.TopGroup}>
            <TextInput
              style={styles.TextInput}
              placeholder='Kategori (contoh: Makanan, Minuman, Sembako, dll)'
              autoCapitalize="words"
              onChangeText={props.setProductCategory}
              maxLength={30}
              value={props.productCategory} />
            <TouchableOpacity style={styles.FloppyDisk} onPress={props.AddKategori}>
              <Icons name={'save'} color='#5A5A5A' size={32} opacity={1} />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            horizontal={false}
            contentContainerStyle={styles.scrollArea_contentContainerStyle}
          >
            <RenderKategori />
          </ScrollView>
        </View>
        <Pressable
          style={props.styleBtn}
          onPress={() => props.setModalCategory(!props.setModalCategory)}
        >
          <Icons name={'close'} color='#FFFFFF' size={18} opacity={1} />
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
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
    height: 300,
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
