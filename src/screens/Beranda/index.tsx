import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,
  ScrollView,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput, TouchableOpacity
} from "react-native"
import { form_validation } from "../../form_validation"
import Header from "../../components/besar/Header"
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment/min/moment-with-locales';
import {useSelector, useDispatch} from 'react-redux';
import ButtonTransaksi from '../../components/ButtonTransaksi';

export default function Beranda(props) {
  // const {dataUser} = useSelector(state => state);
  const dispatch = useDispatch();
  // console.log(dataUser);

  const formValidation = useContext(form_validation);
  moment.locale('id');
  
  const [dataLogin, setDataLogin] = useState('');
  const [loading, setLoading] = useState(true);

  const [layout, setLayout] = useState({
      width: 0,
      height: 0,
  });

  const getLoginData = async () => {
    const success = await formValidation.getLoginData();

    //alert(JSON.stringify(success));
    if(success[0].loginState === 'true') {
      try {
        // await setDataLogin(success[0]);  
        dispatch({type: 'setData', payload: success[0]});
      } catch (error) {
        alert(error);
      } finally {
        //await alert(dataLogin);
        await setLoading(false);
      }
    }
  }

  useEffect(() => {
    getLoginData();
  },[]);

  function tambahTransaksi() {
    props.navigation.navigate('tambahTransaksi');
  }

  // useEffect(() => {
  //   console.log('DATA : ', dataUser)
  // },[dataUser]);

  // function changeNamaUser(id, name) {
  //   dispatch({type: 'updatePayload', value: [id, name]});
  // }

  return (
    !loading ?
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
            <View style={styles.Home}>
              <View style={styles.HomeInner}>
                <Header />
                <View style={styles.TopWidget}>
                  <View style={styles.TopTitle}>
                    <Text style={styles.TitlePenjualan}>Penjualan Hari Ini</Text>
                    <View style={styles.Nominal}>
                      <Text style={styles.TxtNominal}>Rp. 25.000.000</Text>
                    </View>
                  </View>
                  <View style={styles.BoxItem}>
                    <View style={styles.BarItem(300)}>
                      <Text style={styles.LabelItem} numberOfLines={1}>Richeese Nabati</Text>
                    </View>
                    <Text style={styles.NominalItem}>75 Karung</Text>
                  </View>
                  <View style={styles.BoxItem}>
                    <View style={styles.BarItem(250)}>
                      <Text style={styles.LabelItem} numberOfLines={1}>Yakult</Text>
                    </View>
                    <Text style={styles.NominalItem}>52 Pack</Text>
                  </View>
                  <View style={styles.BoxItem}>
                    <View style={styles.BarItem(200)}>
                      <Text style={styles.LabelItem} numberOfLines={1}>Teh Sariwangi</Text>
                    </View>
                    <Text style={styles.NominalItem}>37 Kotak</Text>
                  </View>
                  <View style={styles.BoxItem}>
                    <View style={styles.BarItem(160)}>
                      <Text style={styles.LabelItem} numberOfLines={1}>Minyak Goreng Filma</Text>
                    </View>
                    <Text style={styles.NominalItem}>23 Pack</Text>
                  </View>
                  <View style={styles.BoxItem}>
                    <View style={styles.BarItem(140)}>
                      <Text style={styles.LabelItem} numberOfLines={1}>Beras Premium Ikan Mas</Text>
                    </View>
                    <Text style={styles.NominalItem}>15 Kotak</Text>
                  </View>
                </View>
                <View style={styles.Body}>
                  <View style={styles.BodyTitle}>
                    <Text style={styles.TitleTrx}>Transaksi Terakhir</Text>
                    <Text style={styles.LabelDate}>Selasa, 25 Okt 2022</Text>
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
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                    <View style={styles.ItemTransaksi}>
                      <Text style={styles.LabelItemTrx}>25/10/2022 - 13.00</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Rp. 800.000</Text>
                      <View style={styles.Line} />
                      <Text style={styles.LabelItemTrx}>Lihat Transaksi</Text>
                    </View>
                  </ScrollView>
                </View>
                {/* <TouchableOpacity style={styles.ButtonTransaksi} onPress={() => changeNamaUser('USR00000000', 'JOKO')}> */}
                <ButtonTransaksi action={tambahTransaksi}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
    :
    <>
      <Spinner
        visible={loading}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
      />
    </>
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
  Home: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  HomeInner: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: 'stretch',
    alignSelf: 'stretch',
  },
  TopWidget: {
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: "rgba(36,98,155,1)",
    marginHorizontal: '2%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
  },
  TopTitle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  TitlePenjualan: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    alignSelf: 'flex-start',
  },
  Nominal: {
    flex: 0.8,
    backgroundColor: "rgba(255, 255, 255, 0.26)",
    borderRadius: 5,
    paddingHorizontal: '2%'
  },
  TxtNominal: {
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
  },
  BoxItem: {
    display: "flex",
    flexDirection: "row",
    marginBottom: '1%',
  },
  BarItem: (width) => ({
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: width,
    paddingVertical: '1%',
    borderRadius: 2,
    marginRight: 5,
  }),
  LabelItem: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
    paddingHorizontal: '2%',
  },
  NominalItem: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 1)",
    alignSelf: 'center',
    textAlign: 'center',
  },
  Body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(100,100,100,0.5)",
    marginHorizontal: '2%',
  },
  BodyTitle: {
    display: "flex",
    flexDirection: "row",
    marginBottom:'5%',
    justifyContent: 'space-between',
  },
  TitleTrx: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(100,100,100,1)",
  },
  LabelDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(100,100,100,1)",
    alignSelf: 'center'
  },
  ItemTransaksi: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginBottom: '2%',
    borderRadius: 5,
    backgroundColor: "rgba(206,206,206,1)",
    justifyContent: 'space-between'
  },
  LabelItemTrx: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(90,90,90,1)",
    marginHorizontal: '2%',
  },
  Line: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(90,90,90,1)",
    width: 1,
    height: 15,
  },
})
