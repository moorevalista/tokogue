import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View,
  ScrollView, Image,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Linking, TextInput, TouchableOpacity
} from "react-native"
import { form_validation } from "../../form_validation"
import Spinner from 'react-native-loading-spinner-overlay'
import moment from 'moment/min/moment-with-locales';

export default function Laporan(props) {
  const formValidation = useContext(form_validation);
  moment.locale('id');
  
  const [dataLogin, setDataLogin] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('penjualan');

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

  const ChangeTab = (e) => {
    setActiveTab(e);
  }

  function RenderLaporanPenjualan(){
    return (
      <View style={styles.TabLaporan}>
        <Text style={styles.TopLabel}>Laporan Penjualan</Text>
        <View style={styles.TitleBox}>
          <Text style={[styles.LabelText, {width: '18%'}]}>Tanggal</Text>
          <View style={styles.Line} />
          <Text style={[styles.LabelText, {width: '44%'}]}>Nama Barang</Text>
          <View style={styles.Line} />
          <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Jml</Text>
          <View style={styles.Line} />
          <Text style={[styles.LabelText, {textAlign: 'center', width: '24%'}]}>Pendapatan</Text>
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
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 1.020.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 250.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 336.000</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>Rp. 100.000</Text>
          </View>
        </ScrollView>
        <View style={[styles.TitleName, {backgroundColor: "rgba(0,0,0,0.3)"}]}>
          <Text style={[styles.LabelText, {width: '74%'}]}>Total Pendapatan</Text>
          {/* <View style={styles.Line} /> */}
          <Text style={[styles.LabelText, {textAlign: 'right', width: '24%'}]}>Rp. 1.706.000</Text>
        </View>
      </View>
    )
  }

  function RenderBarangMasuk(){
    return (
      <View style={styles.TabLaporan}>
        <Text style={styles.TopLabel}>Barang Masuk</Text>
        <View style={styles.TitleBox}>
          <Text style={[styles.LabelText, {width: '18%'}]}>Tanggal</Text>
          <View style={styles.Line} />
          <Text style={[styles.LabelText, {width: '44%'}]}>Nama Barang</Text>
          <View style={styles.Line} />
          <Text style={[styles.LabelText, {textAlign: 'center', width: '10%'}]}>Jml</Text>
          <View style={styles.Line} />
          <Text style={[styles.LabelText, {textAlign: 'center', width: '24%'}]}>Stok Akhir</Text>
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
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Premium Ikan Mas</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>17</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>200</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Beras Super Udang Jumbo</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>5</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>100</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Minyak Goreng Filma</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>12</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>130</Text>
          </View>
          <View style={styles.TitleName}>
            <Text style={[styles.LabelText1, {width: '18%'}]}>01/10/2022</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {width: '44%'}]} numberOfLines={1}>Yakult</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'center', width: '10%'}]}>10</Text>
            <View style={styles.Line} />
            <Text style={[styles.LabelText1, {textAlign: 'right', width: '24%'}]}>50</Text>
          </View>
        </ScrollView>
      </View>
    )
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
            <View style={styles.LaporanPenjualan}>
              <View style={styles.HeaderPenjualan}>
                <TouchableOpacity style={styles.TabActive(activeTab, 'penjualan')} onPress={() => ChangeTab('penjualan')}>
                  <Text style={styles.LabelHeader(activeTab, 'penjualan')}>Penjualan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TabActive(activeTab, 'barang masuk')} onPress={() => ChangeTab('barang masuk')}>
                  <Text style={styles.LabelHeader(activeTab, 'barang masuk')}>Barang Masuk</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.SearchBar}>
                <Text style={styles.LabelSearch}>Periode Laporan</Text>
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
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ie82gx8v8m-41%3A704?alt=media&token=8426e257-7599-43e7-9dc2-e653bfe693c3",
                  }}
                />
                <Image
                  style={styles.ButtonReset}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ie82gx8v8m-41%3A711?alt=media&token=d09d2f6f-7daa-43e1-ae49-98fe60df4b0a",
                  }}
                />
                <Image
                  style={styles.MenuIcon3DotsVertical}
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/ie82gx8v8m-41%3A720?alt=media&token=82571be8-1b02-48e4-b261-d4c6195cdc27",
                  }}
                />
              </View>
              
              {activeTab === 'penjualan' ?
                <RenderLaporanPenjualan />
                :
                <RenderBarangMasuk />
              }
              
            </View>
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
  LaporanPenjualan: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  HeaderPenjualan: {
    display: "flex",
    flexDirection: "row",
    paddingTop: '18%',
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    justifyContent: 'space-between',
    backgroundColor: "rgba(167,56,56,1)",
  },
  TabActive: (active, currentTab) => ({
    paddingHorizontal: '2%',
    paddingVertical: '4%',
    borderRadius: 10,
    backgroundColor: active === currentTab ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.1)",
    width: '48%',
  }),
  LabelHeader: (active, currentTab) => ({
    fontSize: 18,
    fontWeight: "700",
    color: active === currentTab ? "rgba(0,0,0,0.8)" : "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
  }),
  SearchBar: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    backgroundColor: "rgba(217,217,217,1)",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  LabelSearch: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(100,100,100,1)",
    textAlign: "right",
    justifyContent: "flex-end",
    marginRight: '2%'
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

  TabLaporan: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // alignItems: "flex-end",
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    marginHorizontal: '2%',
    marginVertical: '2%',
    // borderTopLeftRadius: 10,
    // borderBottomRightRadius: 10,
    backgroundColor: "rgba(72,139,239,1)",
  },
  TopLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
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
    color: "rgba(255, 255, 255, 1)",
    marginHorizontal: 1,
  },
  LabelText1: {
    fontSize: 12,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 1)",
    marginHorizontal: 1,
  },
})
