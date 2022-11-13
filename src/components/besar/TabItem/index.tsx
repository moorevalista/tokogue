import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

const TabItem = ({isFocused, onLongPress, onPress, label}) => {
  const Icon = () => {
    if (label === 'Transaksi') {
      return <Icons style={styles.icon(isFocused)} name="cart" />;
    }

    if (label === 'Barang') {
      return <Icons style={styles.icon(isFocused)} name="archive" />;
    }

    if (label === 'Beranda') {
      return <Icons style={styles.icon(isFocused)} name="grid" />;
    }

    if (label === 'Laporan') {
      return <Icons style={styles.icon(isFocused)} name="document-text" />;
    }

    if (label === 'Pengaturan') {
      return <Icons style={styles.icon(isFocused)} name="settings" />;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Text allowFontScaling={false} style={styles.text(isFocused)}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: isFocused => ({
    color: isFocused ? 'white' : '#C4C4C4',
    fontSize: 12,
    marginTop: 4,
  }),
  icon: isFocused => ({
    backgroundColor: 'transparent',
    color: isFocused ? 'white' : '#C4C4C4',
    fontSize: 24,
    // opacity: 0.8,
  }),
});
