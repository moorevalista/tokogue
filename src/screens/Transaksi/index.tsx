import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Image,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput
} from "react-native"
import { form_validation } from "../../form_validation"
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment/min/moment-with-locales';
import ButtonTransaksi from '../../components/ButtonTransaksi';

export default function Transaksi(props) {
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
        await setDataLogin(success[0]);  
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
              <View style={styles.Transaksi}>
                <View style={styles.HeaderTransaksi}>
                  <View style={styles.KategoriTransaksi}>
                    <View style={styles.GroupKategori}>
                      <Text style={styles.TopLabel}>31.850</Text>
                      <Text style={[styles.LabelNominal, {marginBottom: '20%'}]}>Transaksi</Text>
                      <Text style={styles.LabelNominal} numberOfLines={1}>Rp. 1.250.000.000</Text>
                    </View>
                    <Text style={styles.LabelKategori}>Semua</Text>
                  </View>
                  <View style={styles.KategoriTransaksi}>
                    <View style={styles.GroupKategori}>
                      <Text style={styles.TopLabel}>50</Text>
                      <Text style={[styles.LabelNominal, {marginBottom: '20%'}]}>Transaksi</Text>
                      <Text style={styles.LabelNominal} numberOfLines={1}>Rp. 2.000.000</Text>
                    </View>
                    <Text style={styles.LabelKategori}>Harian</Text>
                  </View>
                  <View style={styles.KategoriTransaksi}>
                    <View style={styles.GroupKategori}>
                      <Text style={styles.TopLabel}>430</Text>
                      <Text style={[styles.LabelNominal, {marginBottom: '20%'}]}>Transaksi</Text>
                      <Text style={styles.LabelNominal} numberOfLines={1}>Rp. 23.000.000</Text>
                    </View>
                    <Text style={styles.LabelKategori}>Mingguan</Text>
                  </View>
                  <View style={styles.KategoriTransaksi}>
                    <View style={styles.GroupKategori}>
                      <Text style={styles.TopLabel}>2.420</Text>
                      <Text style={[styles.LabelNominal, {marginBottom: '20%'}]}>Transaksi</Text>
                      <Text style={styles.LabelNominal} numberOfLines={1}>Rp. 340.000.000</Text>
                    </View>
                    <Text style={styles.LabelKategori}>Bulanan</Text>
                  </View>
                </View>
                <View style={styles.SearchBar}>
                  <Text style={styles.LabelDate}>Selasa, 25 Okt 2022</Text>
                  <TextInput
                    style={styles.TanggalPencarian}
                    placeholder='01/10/2022' />
                  <Text style={styles.Separator}>-</Text>
                  <TextInput
                    style={styles.TanggalPencarian}
                    placeholder='01/10/2022' />
                  <Image
                    style={styles.ButtonCari}
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/2d1zb6sjwsk-9%3A541?alt=media&token=e0d7181d-47e8-4874-b1d6-a56e100e4106",
                    }}
                  />
                  <Image
                    style={styles.ButtonReset}
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/2d1zb6sjwsk-9%3A542?alt=media&token=2cada01a-08f7-4906-a8bb-d94490d93a0e",
                    }}
                  />
                  <Image
                    style={styles.MenuIcon3DotsVertical}
                    source={{
                      uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/2d1zb6sjwsk-18%3A1038?alt=media&token=f2c2d98c-652b-4045-8de3-1ffedbced160",
                    }}
                  />
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
                  <View style={styles.PerTransaksi}>
                    <Text style={styles.LabelDateTrx}>Selasa, 25 Okt 2022 - 13.00</Text>
                    <View style={styles.TitleBox}>
                      <Text style={[styles.LabelText, {width: '40%'}]}>Nama Barang</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Jml</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '22%'}]}>Harga</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '24%'}]}>Sub Total</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>2</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 60.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 120.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>4</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 28.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 112.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Yakult</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 10.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 10.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Torabika Cappucino (rentengan)</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 17.500</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 17.500</Text>
                    </View>
                    <View style={[styles.TitleName, {backgroundColor: "rgba(0,0,0,0.3)"}]}>
                      <Text style={[styles.LabelText, {width: '74%'}]}>Total Belanja</Text>
                      {/* <View style={styles.Line} /> */}
                      <Text style={[styles.LabelText, {textAlign: 'right', width: '24%'}]}>Rp. 259.500</Text>
                    </View>
                  </View>
                  
                  <View style={styles.PerTransaksi}>
                    <Text style={styles.LabelDateTrx}>Selasa, 25 Okt 2022 - 13.00</Text>
                    <View style={styles.TitleBox}>
                      <Text style={[styles.LabelText, {width: '40%'}]}>Nama Barang</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Jml</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '22%'}]}>Harga</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '24%'}]}>Sub Total</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>2</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 60.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 120.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>4</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 28.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 112.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Yakult</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 10.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 10.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Torabika Cappucino (rentengan)</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 17.500</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 17.500</Text>
                    </View>
                    <View style={[styles.TitleName, {backgroundColor: "rgba(0,0,0,0.3)"}]}>
                      <Text style={[styles.LabelText, {width: '74%'}]}>Total Belanja</Text>
                      {/* <View style={styles.Line} /> */}
                      <Text style={[styles.LabelText, {textAlign: 'right', width: '24%'}]}>Rp. 259.500</Text>
                    </View>
                  </View>

                  <View style={styles.PerTransaksi}>
                    <Text style={styles.LabelDateTrx}>Selasa, 25 Okt 2022 - 13.00</Text>
                    <View style={styles.TitleBox}>
                      <Text style={[styles.LabelText, {width: '40%'}]}>Nama Barang</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Jml</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '22%'}]}>Harga</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '24%'}]}>Sub Total</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>2</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 60.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 120.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>4</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 28.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 112.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Yakult</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 10.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 10.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Torabika Cappucino (rentengan)</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 17.500</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 17.500</Text>
                    </View>
                    <View style={[styles.TitleName, {backgroundColor: "rgba(0,0,0,0.3)"}]}>
                      <Text style={[styles.LabelText, {width: '74%'}]}>Total Belanja</Text>
                      {/* <View style={styles.Line} /> */}
                      <Text style={[styles.LabelText, {textAlign: 'right', width: '24%'}]}>Rp. 259.500</Text>
                    </View>
                  </View>

                  <View style={styles.PerTransaksi}>
                    <Text style={styles.LabelDateTrx}>Selasa, 25 Okt 2022 - 13.00</Text>
                    <View style={styles.TitleBox}>
                      <Text style={[styles.LabelText, {width: '40%'}]}>Nama Barang</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Jml</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '22%'}]}>Harga</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText, {textAlign: 'center', width: '24%'}]}>Sub Total</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>2</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 60.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 120.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>4</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 28.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 112.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Yakult</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 10.000</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 10.000</Text>
                    </View>
                    <View style={styles.TitleName}>
                      <Text style={[styles.LabelText1, {width: '40%'}]} numberOfLines={1}>Torabika Cappucino (rentengan)</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>1</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '22%'}]}>Rp. 17.500</Text>
                      <View style={styles.Line} />
                      <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 17.500</Text>
                    </View>
                    <View style={[styles.TitleName, {backgroundColor: "rgba(0,0,0,0.3)"}]}>
                      <Text style={[styles.LabelText, {width: '74%'}]}>Total Belanja</Text>
                      {/* <View style={styles.Line} /> */}
                      <Text style={[styles.LabelText, {textAlign: 'right', width: '24%'}]}>Rp. 259.500</Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <ButtonTransaksi />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
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
  Beranda: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  Transaksi: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  HeaderTransaksi: {
    display: "flex",
    flexDirection: "row",
    paddingTop: '12%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
    backgroundColor: "rgba(167,56,56,1)",
  },
  KategoriTransaksi: {
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    width: '24%',
    justifyContent: 'space-between'
  },
  TopLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
  },
  GroupKategori: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  LabelNominal: {
    fontSize: 10,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  LabelKategori: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
  },
  SearchBar: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    backgroundColor: "rgba(217,217,217,1)",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  LabelDate: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(100,100,100,1)",
    alignSelf: 'center',
    justifyContent: "flex-end",
    marginRight: '2%',
  },
  TanggalPencarian: {
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    borderRadius: 5,
    backgroundColor: "rgba(255,251,251,1)",
    borderWidth: 1,
    justifyContent: 'center',
    borderStyle: "solid",
    borderColor: "rgba(174,174,174,1)",
  },
  Separator: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(100,100,100,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginHorizontal: '2%'
  },
  ButtonCari: {
    width: 24,
    height: 24,
    marginLeft: '1%'
  },
  ButtonReset: {
    width: 24,
    height: 24,
    marginHorizontal: '1%'
  },
  MenuIcon3DotsVertical: {
    width: 24,
    height: 24,
  },
  PerTransaksi: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginHorizontal: '2%',
    marginTop: '2%',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "rgba(72,139,239,1)",
  },
  LabelDateTrx: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "right",
    justifyContent: "flex-end",
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
    color: "rgba(255, 255, 255, 1)",
    marginHorizontal: 1,
  },
  LabelText1: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 1)",
    marginHorizontal: 1,
  },

  Item: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 2,
    paddingBottom: 4,
    paddingLeft: 2,
    paddingRight: 1,
    marginBottom: 3,
    backgroundColor: "rgba(217,217,217,0.1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(218,218,218,1)",
  },
})
