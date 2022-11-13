import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Text, Linking, Platform, TouchableOpacity } from "react-native";

function ButtonTransaksi(props) {

  return (
    <TouchableOpacity style={styles.ButtonTransaksi} onPress={props.action}>
      <Text style={styles.LabelButton}>Tambah Transaksi</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonTransaksi: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'flex-end',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    position: 'absolute',
    bottom: '2%',
    right: '2%',
    borderRadius: 15,
    backgroundColor: "rgba(36,98,155,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(200,200,200,1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  LabelButton: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)"
  },
});

export default ButtonTransaksi;
