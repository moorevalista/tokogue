import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IconPanah from 'react-native-vector-icons/Ionicons';

import {
  Beranda,
  DaftarBarang,
  GantiSandi,
  Laporan,
  Login,
  Pendaftaran,
  Pengaturan,
  Profile,
  Transaksi,
  TambahTransaksi,
} from '../screens';
import {BottomNavigator} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Icons = ({label, name}) => {
  if (label === 'Panah') {
    return <IconPanah style={styles.IconPanah} name={name} />;
  }
};

const MainApp = (props) => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomNavigator {...props} props={props} />}
      initialRouteName="Beranda">
      <Tab.Screen
        name="Transaksi"
        component={Transaksi}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Barang"
        component={DaftarBarang}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Beranda"
        component={Beranda}
        options={{headerShown: false}}
      />

      <Tab.Screen
        name="Laporan"
        component={Laporan}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Pengaturan"
        component={Pengaturan}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const HeaderNavigation = title => {
  return ({navigation}) => ({
    title: title,
    headerTitleAlign: 'center',
    headerTitleStyle: {fontSize: 14, color: 'rgba(0, 0, 0, 1)'},
    headerStyle: {
      backgroundColor: 'rgba(217,217,217,1)',
    },
    headerTintColor: 'rgba(255, 255, 255, 1)',

    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.navigate('Beranda')}>
        <View style={styles.IconHeader}>
          <Icons label="Panah" name="grid" />
        </View>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          title === 'Antrian' ? navigation.navigate('MainApp') : navigation.goBack();
        }}>
        <View style={styles.IconHeader}>
          <Icons label="Panah" name="chevron-back-sharp" />
        </View>
      </TouchableOpacity>
    ),
  });
};

const HeaderNoNavigation = title => {
  return ({navigation}) => ({
    title: title,
    headerTitleAlign: 'center',
    headerTitleStyle: {fontSize: 14, color: 'rgba(255, 255, 255, 1)'},
    headerStyle: {
      backgroundColor: 'rgba(54,54,54,1)',
    },
    headerTintColor: 'rgba(255, 255, 255, 1)',

  });
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="loginScreen">
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="loginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registrasiScreen"
        component={Pendaftaran}
        options={HeaderNoNavigation('Pendaftaran')}
      />
      <Stack.Screen
        name="profileScreen"
        component={Profile}
        options={HeaderNoNavigation('Profile')}
      />
      <Stack.Screen
        name='gantiSandi'
        component={GantiSandi}
        options={HeaderNoNavigation('Ganti Kata Sandi')}
      />
      <Stack.Screen
        name='tambahTransaksi'
        component={TambahTransaksi}
        options={HeaderNoNavigation('Tambah Transaksi')}
      />

    </Stack.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({
  IconHeader: {
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(67, 169, 221, 1)',
    borderRadius: 100,
    width: 30,
    height: 30,
  },
  IconPanah: {
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 14,
    opacity: 0.8,
  },
});
