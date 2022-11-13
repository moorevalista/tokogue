import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Modal, Pressable, TextInput,
  KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback,
} from "react-native"
import { form_validation } from "../../form_validation";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment/min/moment-with-locales';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import ContextMenu from '../../components/ContextMenu';
import DropItems from '../../components/DropItems';
import DetailItem from './detailItem';
import BtnSimpanTransaksi from '../../components/BtnSimpanTransaksi';

export default function TambahTransaksi(props) {
  const {dataUser} = useSelector(state => state);
  const formValidation = useContext(form_validation);
  moment.locale('id');

  const [loading, setLoading] = useState(true);
  const [modalItem, setModalItem] = useState(false); //modal item barang

  const [dataProduct, setDataProduct] = useState([]); //data set product
  const [idProductCategory, setIdProductCategory] = useState(''); //untuk filter menampilkan barang
  
  const [textFilter, setTextFilter] = useState('');
  const [dataFilter, setDataFilter] = useState([]);

  const [trxDate, setTrxDate] = useState('');

  let [dataPembelian, setDataPembelian] = useState([]);

  //untuk pop up menu item barang
  const [id, setId] = useState('');
  const [type, setType] = useState('');
  const [menu, setMenu] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [measure, setMeasure] = useState(null);
  const containerRef = useRef(null);
  const itemRef = useRef(null);
  const menuRef = useRef(null);

  const [layout, setLayout] = useState({
      width: 0,
      height: 0,
  });

  //context menu
  function DefaultMenu() {
    let item = '';
    item = [
      {index: 0, menu: 'Ubah'},
      {index: 1, menu: 'Hapus'}
    ];

    setMenu(item);
  }

  function CariBarang(value) {
    let newData = [];
    if(value !== '') {
      newData = dataProduct.filter(
        item => item.product_name.toLowerCase().startsWith(value.toLowerCase())
      );

      newData = newData.sort((a, b) =>
        a.product_name > b.product_name ? 1 : -1
      );
    }else {
      newData = dataProduct.sort((a, b) =>
        a.product_name > b.product_name ? 1 : -1
      );
    }

    setTextFilter(value);
    setDataFilter(newData);
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
    if(dataFilter.length > 0 && type !== 'menuItemTrx') {
      openMenu(null, 'item');
    }else {
      setVisible(false);
    }
  },[dataFilter]);

  function openMenu(e, type) {
    if(type === 'item') {
      setType(type);
      setVisible(true);

      if(itemRef.current) {
        itemRef.current.measureLayout(
          containerRef.current,
          (left, top, width, height) => {
            setMeasure({ left, top, width, height });
          }
        );
      }
    }else if(type === 'menuItemTrx') {
      setId(e);
      setType(type);
      setVisible1(!visible1);

      newData = dataProduct.sort((a, b) => 
        a.product_name > b.product_name ? 1 : -1
      );
      setDataFilter(newData);

      if(menuRef.current) {
        menuRef.current.measureLayout(
          containerRef.current,
          (left, top, width, height) => {
            setMeasure({ left, top, width, height });
          }
        );
      }
    }
  }

  function actions(e) {
    switch(type) {
      case 'item':
        setId(e);
        setTextFilter('');
        setModalItem(true);
        break;
      case 'menuItemTrx':
        switch(e) {
          case 0:
            // console.log(dataPembelian);
            setTextFilter('');
            setModalItem(true);
            break;
          case 1:
            HapusItem();
            break;
        }
        break;
    }
  }

  function HapusItem() {
    let newArray = dataPembelian.slice();
    if(newArray.length > 0) {
      const index = newArray.findIndex((item) => item.id_product === id);
      if(index !== -1) {
        newArray.splice(index, 1);
      }
      setDataPembelian(newArray);
    }
  }

  const setData = async () => {
    DefaultMenu();
    const product = getProduct();
    Promise.all([product]).then((values) => {
      setLoading(false);

      setInterval(() => {
        setTrxDate(moment(new Date()).format('dddd, DD MMM YYYY HH:mm'));
      }, 60000)
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

  //tambahkan item ke keranjang
  function TambahItem(id, name, qty, price) {
    const obj = {'id_product':id, 'product_name': name, 'qty':qty, 'sub_total': qty * price};
    let newArray = dataPembelian.slice(); // Create a copy
    
    if(newArray.length > 0) {
      const index = newArray.findIndex((item) => item.id_product === id);
      if(index < 0) {
        newArray.push(obj);
      }else {
        newArray[index] = {id_product: id, product_name: name, qty: qty, sub_total: qty * price};
      }
    }else {
      newArray.push(obj); // Push the object
    }
    
    setDataPembelian(newArray);
    setId('');
    setType('');
  }

  //simpan transaksi
  function simpanTransaksi() {
    console.log(dataPembelian);
  }

  //menampilkan data product
  function RenderBarang() {
    let newItems = [];

    newItems = dataPembelian;

    if(newItems) {
      return newItems.map((item) => {
        return (
          <View key={item.id_product} style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '38%'}]} numberOfLines={1}>{item.product_name}</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>{formValidation.formatDecimal(item.qty.toString())}</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText, {textAlign: 'right', paddingRight: '1%', width: '20%'}]}>{formValidation.currencyFormat((item.sub_total / item.qty).toString())}</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', paddingRight: '1%', width: '22%'}]}>{formValidation.currencyFormat(item.sub_total.toString())}</Text>
            <View style={styles.Line} />
            <Pressable style={[styles.LabelText1, {textAlign: 'center', width: '4%'}]} onPress={() => openMenu(item.id_product, 'menuItemTrx')} ref={menuRef}>
              <Icons name={'ellipsis-horizontal'} color='#5A5A5A' size={18} opacity={1} />
            </Pressable>
          </View>
        )
      })
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKey}
      >
      <TouchableWithoutFeedback onPress={() => {setVisible(false); setVisible1(false);}}>
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

            <ContextMenu visible={visible1} pos={measure} menu={menu} setVisible={setVisible1} type={type} action={(e) => actions(e)} />
            <DropItems visible={visible} pos={measure} data={dataFilter} setVisible={setVisible} type={type} action={(e) => actions(e)} />

            <View style={styles.DaftarBarang}>
              <View style={styles.HeaderBarang}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalItem}
                  // onRequestClose={() => {
                  //   Alert.alert("Modal has been closed.");
                  //   setModalCategory(!modalCategory);
                  // }}
                >
                  <View style={styles.centeredView}>
                    <DetailItem //tampilkan modal form tambah kategori
                      id={id}
                      setData={setData}
                      dataProduct={dataFilter}
                      dataPembelian={dataPembelian}
                      TambahItem={TambahItem}
                      styleBtn={[styles.button, styles.buttonClose]}
                      setModalItem={setModalItem}
                      modalItem={modalItem} />
                  </View>
                </Modal>

                <View style={styles.DateLabel}>
                  <Text style={[styles.LabelKategori, {fontSize: 16, marginBottom: '1%'}]}>{trxDate}</Text>
                </View>
                <View style={styles.KategoriBarang} onPress={() => setModalProduct(true)}>
                  <View style={styles.TabKategori}>
                    <Text style={[styles.LabelKategori, {width: '40%', textAlign: 'left'}]}>Total Belanja</Text>
                    <Text style={[styles.LabelKategori, {width: '2%'}]}>:</Text>
                    <Text style={[styles.LabelKategori, {width: '58%'}]}>Rp. 1.300.000</Text>
                  </View>
                  <View style={styles.TabKategori}>
                    <Text style={[styles.LabelKategori, {width: '40%', textAlign: 'left'}]}>Total Potongan</Text>
                    <Text style={[styles.LabelKategori, {width: '2%'}]}>:</Text>
                    <Text style={[styles.LabelKategori, {width: '58%'}]}>(Rp. 300.000)</Text>
                  </View>
                  <View style={[styles.TabKategori, {borderBottomWidth: 1, borderColor: '#FFFFFF'}]}>
                    <Text style={[styles.LabelKategori, {width: '40%', textAlign: 'left'}]}>Total Tagihan</Text>
                    <Text style={[styles.LabelKategori, {width: '2%'}]}>:</Text>
                    <Text style={[styles.LabelKategori, {width: '58%'}]}>Rp. 1.000.000</Text>
                  </View>
                  
                  <View style={styles.TabKategori}>
                    <Text style={[styles.LabelKategori, {width: '40%', textAlign: 'left'}]}>Pembayaran</Text>
                    <Text style={[styles.LabelKategori, {width: '2%'}]}>:</Text>
                    <Text style={[styles.LabelKategori, {width: '58%'}]}>Rp. 1.000.000</Text>
                  </View>
                  <View style={styles.TabKategori}>
                    <Text style={[styles.LabelKategori, {width: '40%', textAlign: 'left'}]}>Kembalian</Text>
                    <Text style={[styles.LabelKategori, {width: '2%'}]}>:</Text>
                    <Text style={[styles.LabelKategori, {width: '58%'}]}>Rp. 0</Text>
                  </View>
                </View>
              </View>
              <View style={styles.SearchBar}>
                <TextInput
                  style={styles.InputPencarian}
                  placeholder='Cari Barang (contoh: beras, minyak, susu)'
                  onChangeText={(value) => CariBarang(value)}
                  value={textFilter}
                  ref={itemRef} />
              </View>
              <View style={styles.PerTransaksi}>
                <Text style={styles.TopLabel}>Daftar Pembelian Barang</Text>
                <View style={styles.TitleBox}>
                  <Text style={[styles.LabelText, {width: '38%'}]}>Nama Barang</Text>
                  <View style={styles.Line} />
                  <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Qty</Text>
                  <View style={styles.Line} />
                  <Text style={[styles.LabelText, {textAlign: 'center', width: '20%'}]}>Harga</Text>
                  <View style={styles.Line} />
                  <Text style={[styles.LabelText, {textAlign: 'center', width: '22%'}]}>Sub Total</Text>
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
              <BtnSimpanTransaksi action={simpanTransaksi}/>
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
    // flexDirection: "row",
    // paddingTop: '12%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    justifyContent: 'flex-end',
    backgroundColor: "rgba(167,56,56,1)",
  },
  DateLabel: {
    alignItems: 'flex-start',
    paddingHorizontal: '2%'
  },
  KategoriBarang: {
    // flex: 0.6,
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: 'column'
  },
  TabKategori: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-end',
    marginBottom: '1%'
  },
  Plus: {
    width: 24,
    height: 24,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  LabelKategori: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
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
    // flex: 1,
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
