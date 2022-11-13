import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Modal, Pressable,
  KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback,
} from "react-native"
import { form_validation } from "../../form_validation";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment/min/moment-with-locales';
import { useSelector, useDispatch } from 'react-redux';
import TambahKategori from './tambahKategori';
import TambahBarang from './tambahBarang';
import TambahStok from './tambahStok';
import KurangiStok from './kurangiStok';
import UbahBarang from './ubahBarang';
import Icon from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import ContextMenu from '../../components/ContextMenu';

export default function DaftarBarang(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);
  moment.locale('id');

  const [loading, setLoading] = useState(true);
  const [modalCategory, setModalCategory] = useState(false); //modal tambah kategori
  const [modalProduct, setModalProduct] = useState(false); //modal tambah barang
  const [modalAddProduct, setModalAddProduct] = useState(false); //modal tambah stok barang
  const [modalReduceProduct, setModalReduceProduct] = useState(false); //modal kurangi stok barang
  const [modalEditProduct, setModalEditProduct] = useState(false); //modal ubah nama barang
  const [dataProduct, setDataProduct] = useState([]); //data set product
  const [dataProductCategory, setDataProductCategory] = useState([]); //data set kategori product
  const [itemProductCategory, setItemProductCategory] = useState([]); //list item kategori product
  const [idProductCategory, setIdProductCategory] = useState(''); //untuk filter menampilkan barang
  const [productCategory, setProductCategory] = useState(''); //input name kategori product baru

  //untuk pop up menu item barang
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [menu, setMenu] = useState('');
  const [visible, setVisible] = useState(false);
  // const [visible1, setVisible1] = useState(false);
  const [measure, setMeasure] = useState(null);
  const containerRef = useRef(null);
  const itemRef = useRef(null);

  const [sort, setSort] = useState('strAsc');

  const [layout, setLayout] = useState({
      width: 0,
      height: 0,
  });

  //define default Context Menu for each segment
  function DefaultMenu() {
    let item = '';
    switch(type) {
      case 'sortData':
        item = [
          {index: null, menu: 'Urut berdasrakan :'},
          {index: 0, menu: 'Nama A - Z'},
          {index: 1, menu: 'Nama Z - A'},
          {index: 2, menu: 'Harga Terendah'},
          {index: 3, menu: 'Harga Tertinggi'}
        ];
        setMenu(item);
        break;
      case 'editProduct':
        item = [
          {index: 0, menu: 'Tambah Stok'},
          {index: 1, menu: 'Kurangi Stok'},
          {index: 2, menu: 'Ubah Nama'}
        ];
        setMenu(item);
      break;
    }
  }

  useEffect(() => {
    DefaultMenu();
  },[type]);

  function openMenu(e, type) {
    setId(e);
    setType(type);
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

  useEffect(() => {
    setData();
  },[]);

  useEffect(() => {
    listProductCategory();
  },[dataProductCategory]);

  const setData = async () => {
    const product = getProduct();
    const category = getProductCategory();
    Promise.all([product, category]).then((values) => {
      setLoading(false);
    });
  }

  //mengambil data product dari database
  const getProduct = async () => {
    let params = [];
    params.push({
      id_outlet: dataUser.id_outlet,
      token: dataUser.token
    });

    const success = await formValidation.getProduct(params);

    if(success.status === 200) {
      if(success.responseCode === '000') {
        try{
          setDataProduct(success.data);
        } catch(error) {
          alert(error);
        } finally {
          return(true);
        }
      }
    }
  }

  //mengambil data product kategori dari database
  const getProductCategory = async () => {
    let params = [];
    params.push({
      id_outlet: dataUser.id_outlet,
      token: dataUser.token
    });

    const success = await formValidation.getProductCategory(params);

    if(success.status === 200) {
      if(success.responseCode === '000') {
        try{
          setDataProductCategory(success.data);
        } catch(error) {
          alert(error);
        } finally {
          return(true);
        }
      }
    }
  }

  //listing product kategori
  function listProductCategory() {
    const newItems = dataProductCategory;
    let options = [];

    if(newItems.length > 0) {
      options = newItems.map((item) => {
        return (
          {value: item.id_product_category, label: item.product_category}
        )
      });
    }
    setItemProductCategory(options);
  }

  //menampilkan product kategori pada drop down
  function RenderProductCategory() {
    const items = itemProductCategory;
    const placeholder = {
      label: 'Semua Barang',
      value: ''
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

  //menambahkan product kategori ke database
  const AddKategori = async () => {
    setLoading(true);
    let params = [];
    params.push({
      id_outlet: dataUser.id_outlet,
      token: dataUser.token,
      productCategory: productCategory,
      method: 'add'
    });

    const success = await formValidation.setProductCategory(params);

    if(success.status === 200) {
      setLoading(false);
      setProductCategory('');
      setData();
      formValidation.showError(success.message);
    }else {
      setLoading(false);
      // alert(success);
      formValidation.showError(success.toString());
    }
  }

  //menampilkan data product
  function RenderBarang() {
    let newItems = [];

    if(idProductCategory === '') {
      newItems = dataProduct;
    }else {
      newItems = dataProduct.filter(
        item => item.id_product_category === idProductCategory
      );
    }

    //sortir data product yang ditampilkan berdasarkan sort yang dipilih user
    switch(sort) {
      case 'strAsc':
        newItems = [...newItems].sort((a, b) =>
          a.product_name > b.product_name ? 1 : -1,
        );
        break;
      case 'strDesc':
        newItems = [...newItems].sort((a, b) =>
          a.product_name > b.product_name ? -1 : 1,
        );
        break;
      case 'priceAsc':
        newItems = [...newItems].sort((a, b) =>
          a.price - b.price
        );
        break;
      case 'priceDesc':
        newItems = [...newItems].sort((a, b) =>
          b.price - a.price
        );
        break;
      default: 
        newItems = [...newItems].sort((a, b) =>
          a.product_name > b.product_name ? 1 : -1,
        );
    }

    if(newItems) {
      return newItems.map((item) => {
        return (
          <View key={item.id_product} style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>{item.product_name}</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '12%'}]}>{formValidation.formatDecimal(item.stock.toString())}</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText, {paddingLeft: '1%', width: '16%'}]}>{item.unit}</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', paddingRight: '1%', width: '22%'}]}>{formValidation.currencyFormat(item.price.toString())}</Text>
            <View style={styles.Line} />
            <Pressable style={[styles.LabelText1, {textAlign: 'center', width: '4%'}]} onPress={() => openMenu(item.id_product, 'editProduct')} ref={itemRef}>
              <Icons name={'ellipsis-horizontal'} color='#5A5A5A' size={18} opacity={1} />
            </Pressable>
          </View>
        )
      })
    }
  }

  //action untuk Context Menu
  function actions(e) {
    switch(type) {
      case 'sortData': //jika yang aktif adalah Context Menu sort data
        switch(e) {
          case 0:
            setSort('strAsc');
            break;
          case 1:
            setSort('strDesc');
            break;
          case 2:
            setSort('priceAsc');
            break;
          case 3:
            setSort('priceDesc');
            break;
          default:
            setSort('strAsc');
        }
        break;
      case 'editProduct': //jika yang aktif adalah Context Menu pada item barang
        switch(e) {
          case 0:
            setModalAddProduct(true);
            break;
          case 1:
            setModalReduceProduct(true);
            break;
          case 2:
            setModalEditProduct(true);
            break;
        }
        break;
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKey}
      >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
      <View style={[styles.container, styles.inner]}>
        <View style={styles.scrollArea}>
          <Spinner
            visible={loading}
            textContent={''}
            textStyle={styles.spinnerTextStyle}
          />
          <View
            style={styles.Beranda}
            onLayout={event => setLayout(event.nativeEvent.layout)} ref={containerRef}>
            
            {/*Context Menu (Menu Klik Kanan pada icon ...)*/}
            <ContextMenu visible={visible} pos={measure} menu={menu} setVisible={setVisible} type={type} action={(e) => actions(e)} />

            <View style={styles.DaftarBarang}>
              <View style={styles.HeaderBarang}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalCategory}
                  // onRequestClose={() => {
                  //   Alert.alert("Modal has been closed.");
                  //   setModalCategory(!modalCategory);
                  // }}
                >
                  <View style={styles.centeredView}>
                    <TambahKategori //tampilkan modal form tambah kategori
                      setData={setData}
                      dataProductCategory={dataProductCategory}
                      productCategory={productCategory}
                      setProductCategory={setProductCategory}
                      AddKategori={AddKategori}
                      styleBtn={[styles.button, styles.buttonClose]}
                      setModalCategory={setModalCategory}
                      modalCategory={modalCategory} />
                  </View>
                </Modal>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalProduct}
                >
                  <View style={styles.centeredView}>
                    <TambahBarang //tampilkan modal tambah barang
                      setData={setData}
                      itemProductCategory={itemProductCategory}
                      styleBtn={[styles.button, styles.buttonClose]}
                      setModalProduct={setModalProduct}
                      modalProduct={modalProduct} />
                  </View>
                </Modal>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalAddProduct}
                >
                  <View style={styles.centeredView}>
                    <TambahStok //tampilkan modal tambah stok barang
                      setData={setData}
                      id={id}
                      dataProduct={dataProduct}
                      styleBtn={[styles.button, styles.buttonClose]}
                      setModalAddProduct={setModalAddProduct}
                      modalProduct={modalProduct} />
                  </View>
                </Modal>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalReduceProduct}
                >
                  <View style={styles.centeredView}>
                    <KurangiStok //tampilkan modal kurangi stok barang
                      setData={setData}
                      id={id}
                      dataProduct={dataProduct}
                      styleBtn={[styles.button, styles.buttonClose]}
                      setModalReduceProduct={setModalReduceProduct}
                      modalProduct={modalProduct} />
                  </View>
                </Modal>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalEditProduct}
                >
                  <View style={styles.centeredView}>
                    <UbahBarang //tampilkan modal kurangi stok barang
                      setData={setData}
                      id={id}
                      dataProduct={dataProduct}
                      styleBtn={[styles.button, styles.buttonClose]}
                      setModalEditProduct={setModalEditProduct}
                      modalEditProduct={modalEditProduct} />
                  </View>
                </Modal>

                <Pressable style={styles.KategoriBarang} onPress={() => setModalCategory(true)}>
                  <View style={styles.TabKategori}>
                    <Text style={styles.LabelKategori}>Kategori</Text>
                    <Icons name={'grid-outline'} color='#FFFFFF' size={40} opacity={1} />
                    
                  </View>
                  <View style={styles.Plus}>
                    <Icons name={'add-circle-outline'} color='#FFFFFF' size={24} opacity={1} />
                  </View>
                </Pressable>
                <Pressable style={styles.KategoriBarang} onPress={() => setModalProduct(true)}>
                  <View style={styles.TabKategori}>
                    <Text style={styles.LabelKategori}>Barang</Text>
                    <Icons name={'cube-outline'} color='#FFFFFF' size={40} opacity={1} />
                  </View>
                  <View style={styles.Plus}>
                    <Icons name={'add-circle-outline'} color='#FFFFFF' size={24} opacity={1} />
                  </View>
                </Pressable>
              </View>
              <View style={styles.SearchBar}>
                {/* <TextInput
                  style={styles.InputPencarian}
                  placeholder='Kategori' /> */}
                <View style={{flex: 1}}>
                  <RenderProductCategory />
                </View>
                <Pressable onPress={() => openMenu(null, 'sortData')} ref={itemRef}>
                  <Icons name={'ellipsis-vertical'} color='#5A5A5A' size={24} opacity={1} />
                </Pressable>
              </View>
              <View style={styles.PerTransaksi}>
                <Text style={styles.TopLabel}>Daftar Barang</Text>
                <View style={styles.TitleBox}>
                  <Text style={[styles.LabelText, {width: '40%'}]}>Nama Barang</Text>
                  <View style={styles.Line} />
                  <Text style={[styles.LabelText, {textAlign: 'center', width: '12%'}]}>Stok</Text>
                  <View style={styles.Line} />
                  <Text style={[styles.LabelText, {textAlign: 'center', width: '16%'}]}>Satuan</Text>
                  <View style={styles.Line} />
                  <Text style={[styles.LabelText, {textAlign: 'center', width: '22%'}]}>Harga</Text>
                  <View style={styles.Line} />
                  <View style={[styles.LabelText, {textAlign: 'center', width: '4%'}]}>
                    <Icons name={'ellipsis-horizontal'} color='#5A5A5A' size={18} opacity={1} />
                  </View>
                </View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  horizontal={false}
                  contentContainerStyle={styles.scrollArea_contentContainerStyle}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={refreshing}
                  //     onRefresh={onRefresh}
                  //   />
                  // }
                >
                  <RenderBarang />
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: '2%',
  },
  button: {
    borderRadius: 50,
    padding: 5,
    elevation: 2,
    position: 'absolute',
    right: 0,
    top: 0
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#5A5A5A",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  containerKey: {
    flex: 1,
  },
  scrollArea_contentContainerStyle: {
    height: 'auto',
    paddingBottom: '10%',
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
  FormKategori: {
    flex: 1,
    borderColor: 'red',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'stretch',
    top: '25%',
    zIndex: 1
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
  Beranda: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  DaftarBarang: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  HeaderBarang: {
    display: "flex",
    flexDirection: "row",
    paddingTop: '12%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
    backgroundColor: "rgba(167,56,56,1)",
  },
  KategoriBarang: {
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: '24%',
    justifyContent: 'space-between'
  },
  TabKategori: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Plus: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  LabelKategori: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: '5%'
  },
  LayoutGrid: {
    width: 48,
    height: 48,
    marginTop: '6%',
    marginBottom: '12%'
  },
  SearchBar: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    backgroundColor: "rgba(217,217,217,1)",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  InputPencarian: {
    flex: 1,
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    borderRadius: 5,
    backgroundColor: "rgba(255,251,251,1)",
    borderWidth: 1,
    justifyContent: 'center',
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
  },
  MenuIcon3DotsVertical: {
    width: 24,
    height: 24,
  },
  PerTransaksi: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginHorizontal: '2%',
    marginVertical: '2%',
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
  },
  TopLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(90,90,90,1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: '4%',
  },
  TitleBox: {
    alignSelf: 'stretch',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: '1%',
    borderBottomWidth: 1,
    borderColor: "rgba(218,218,218,1)",
  },
  TitleName: {
    alignSelf: 'stretch',
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingVertical: '1%',
    borderBottomWidth: 1,
    borderColor: "rgba(218,218,218,1)",
    backgroundColor: "rgba(217,217,217,0.1)",
  },
  Line: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(218,218,218,1)",
    width: 1,
    height: 15,
  },
  LabelText: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(90,90,90,1)",
    marginHorizontal: 1,
  },
  LabelText1: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(90,90,90,1)",
    marginHorizontal: 1,
  },
  SettingsSlider: {
    width: 14,
    height: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
  },
  inputAndroid: {
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
  },
});
