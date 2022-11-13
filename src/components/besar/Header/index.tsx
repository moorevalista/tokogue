import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';

const Header = () => {
  const {dataUser} = useSelector(state => state);

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

  return (
    <View style={styles.Headerbar}>
      <View style={styles.HeaderInner}>
        {/* <View style={styles.EllipseImage} /> */}
        <View style={styles.HeaderContent}>
          <Text style={styles.OutletTitle}>{dataUser.nama_outlet}</Text>
          <Text style={styles.Address} numberOfLines={1}>
            {dataUser.address}
          </Text>
          <View style={styles.Rating}>
            <Icons name={'star'} color='#FFC700' size={15} opacity={1} />
            <Icons name={'star'} color='#FFC700' size={15} opacity={1} />
            <Icons name={'star'} color='#FFC700' size={15} opacity={1} />
            <Icons name={'star'} color='#FFC700' size={15} opacity={1} />
            <Icons name={'star-half'} color='#FFC700' size={15} opacity={1} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  Headerbar: {
    paddingTop: '12%',
    paddingBottom: '2%',
    paddingHorizontal: '2%',
    marginBottom: 10,
    backgroundColor: "rgba(167,56,56,1)",
  },
  HeaderInner: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: '2%',
    paddingHorizontal: '2%',
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  EllipseImage: {
    backgroundColor: "rgba(217,217,217,1)",
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: '4%',
  },
  HeaderContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  OutletTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    marginBottom: '2%',
  },
  Address: {
    fontSize: 10,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 1)",
    marginBottom: '2%',
  },
  Rating: {
    display: "flex",
    flexDirection: "row",
  },
});
