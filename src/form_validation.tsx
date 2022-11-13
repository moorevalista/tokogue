import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import { showMessage, hideMessage } from 'react-native-flash-message';
import moment from 'moment-timezone';

const APIKeyGoogle = 'AIzaSyBL5Autz9I1xnUPAP1zlu1BI5T6IfJhxgY';
const baseUrl = 'http://localhost:8080/api/'; //offline
const assetsUrl = 'http://192.168.100.2:8080/'; //offline

export const form_validation = React.createContext({
    env: 'development',
    base_url: baseUrl,
    assetsUrl: assetsUrl,
    theme: 'light',
    toggleTheme: () => {},
    reloadTheme: false,

    //untuk menampilkan error
    showError: (e: string) => {
        showMessage({
        message: e,
        //description: "My message description",
        type: "default",
        backgroundColor: "rgba(255,255,255,0.8)",
        color: "rgba(0,0,0,1)",
        duration: 5000,
        floating: true,
        style: { top:'25%', borderRadius: 20 }
        });
    },

    onChangeHp: (currVal, val) => {
        //const numericRegex = /^([0-9]{1,13})$/
        const numericRegex = /^(0|08|08[0-9]{1,13})$/
        if(val !== '' && val !== null) {
          if(numericRegex.test(val)) {
              return(val);
          }else {
            return(currVal);
          }
        }else {
          return('');
        }
    },

    onChangeInput: (val) => {
        if(val !== '' && val !== null) {
          return(val);
        }else {
          return('');
        }
    },

    getKategori: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};

        callBack = await axios
            .get(baseUrl + "layanan/getCategory")
            .then(result => {
                isValid = true;
                responseMsg['msg'] = '';
                responseMsg['status'] = isValid;
                responseMsg['res'] = result.data;
                return(responseMsg);
            })
            .catch(error => {
                isValid = false;
                responseMsg['msg'] = JSON.stringify(error.message);
                responseMsg['status'] = isValid;
                return(responseMsg);
            })
        return(callBack);
    },

    //registrasi
    handlePreSubmit: (params) => {
        let isValid = true;
        let responseMsg = {};

        if(params[0].cpassword !== '' && params[0].password !== '') {
            if(params[0].cpassword != params[0].password) {
                isValid = false;
                responseMsg['msg'] = '*Kata sandi tidak sama';
            }else {
                // responseMsg['msg'] = '';
            }
        }else {
            isValid = false;
            responseMsg['msg'] = '*Konfirmasi Kata sandi tidak boleh kosong';
        }

        if(params[0].password !== '') {
            let passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
            if(params[0].password.length < 8) {
                isValid = false;
                responseMsg['msg'] = '*Kata sandi tidak valid';
            }else {
                if(!params[0].password.match(passPattern)) {
                    isValid = false;
                    responseMsg['msg'] = '*Kata sandi tidak valid';
                }else {
                    // responseMsg['msg'] = '';
                }
            }
        }else {
            isValid = false;
            responseMsg['msg'] = '*Kata sandi tidak boleh kosong';
            // responseMsg['cpassword'] = '';
        }

        if(params[0].email !== '') {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if(!params[0].email.match(pattern)){
                isValid = false;
                responseMsg['msg'] = '*Email tidak valid';
            }else {
                // responseMsg['msg'] = '';
            }
        }else {
            isValid = false;
            responseMsg['msg'] = '*Email tidak boleh kosong';
        }

        if(params[0].nophp !== '') {
            if(params[0].nohp.length < 10){
                isValid = false;
                responseMsg['msg'] = '*No. Handphone tidak valid';
            }else {
                // responseMsg['msg'] = '';
            }
        }else {
            isValid = false;
            responseMsg['msg'] = '*No. Handphone tidak boleh kosong';
        }

        if(params[0].idKategori === '') {
            isValid = false;
            responseMsg['msg'] = '*Kategori tidak boleh kosong';
        }

        if(params[0].namaPemilik !== '') {
            if(params[0].namaPemilik.length < 3){
                isValid = false;
                responseMsg['msg'] = '*Nama Pemilik tidak valid';
            }else if(!params[0].namaPemilik.match(/^[^\s]+[a-zA-Z .]+$/)){
                isValid = false;
                responseMsg['msg'] = '*Nama Pemilik tidak valid';
            }else {
                // responseMsg['msg'] = '';
            }
        }else {
            isValid = false;
            responseMsg['msg'] = '*Nama Pemilik tidak boleh kosong';
        }

        if(params[0].namaToko !== '') {
            if(params[0].namaToko.length < 3){
                isValid = false;
                responseMsg['msg'] = '*Nama Toko/Outlet tidak valid';
            }else if(!params[0].namaToko.match(/^[^\s]+[a-zA-Z0-9 .,-_]+$/)){
                isValid = false;
                responseMsg['msg'] = '*Nama Toko/Outlet tidak valid';
            }else {
                // responseMsg['msg'] = '';
            }
        }else {
            isValid = false;
            responseMsg['msg'] = '*Nama Toko/Outlet tidak boleh kosong';
        }

        responseMsg['status'] = isValid;
        return(responseMsg);

    },

    checkHP: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
        if(params[0].nohp !== '') {
            callBack = await axios
                .post(baseUrl + "user/validationHp/" + params[0].nohp)
                .then(res => {
                    if(res.data.responseCode !== "000") {
                        isValid = false;
                        responseMsg['msg'] = "*Nomor handphone sudah terdaftar";
                        responseMsg['status'] = isValid;
                        return(responseMsg);
                    }else {
                        responseMsg['status'] = isValid;
                        return(responseMsg);
                    }
                })
                .catch(error => {
                    isValid = false;
                    responseMsg['msg'] = JSON.stringify(error.message);
                    responseMsg['status'] = isValid;
                    return(responseMsg);
                })
        }else {
            responseMsg['msg'] = '';
            return(responseMsg);
        }
        return(callBack);
    },

    checkEmail: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
        if(params[0].nohp !== '') {
            callBack = await axios
                .post(baseUrl + "user/validationEmail/" + params[0].email)
                .then(res => {
                    if(res.data.responseCode !== "000") {
                    isValid = false;
                    responseMsg['msg'] = "*Email sudah terdaftar";
                    responseMsg['status'] = isValid;
                    return(responseMsg);
                    }else {
                    responseMsg['status'] = isValid;
                    return(responseMsg);
                    }
                })
                .catch(error => {
                    isValid = false;
                    responseMsg['msg'] = JSON.stringify(error.message);
                    responseMsg['status'] = isValid;
                    return(responseMsg);
                })
        }else {
            responseMsg['msg'] = '';
            return(responseMsg);
        }
        return(callBack);
    },

    //registrasi
    registrasi: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};

        const formData = new URLSearchParams();
        formData.append("outlet_name", params[0].outlet_name);
        formData.append("id_category", params[0].id_category);
        formData.append("full_name", params[0].full_name);
        formData.append("mobile_phone_number", params[0].mobile_phone_number);
        formData.append("email", params[0].email);
        formData.append("password", params[0].password);

        callBack = await axios
            .post(baseUrl + "user/registrasi/", formData)
            .then(res => {
                if(res.data.responseCode !== "000") {
                isValid = false;
                responseMsg['msg'] = res.data.message;
                responseMsg['status'] = isValid;
                return(responseMsg);
                }else {
                responseMsg['status'] = isValid;
                return(responseMsg);
                }
            })
            .catch(error => {
                isValid = false;
                responseMsg['msg'] = JSON.stringify(error.message);
                responseMsg['status'] = isValid;
                return(responseMsg);
            })
        return(callBack);
    },

    convertToken: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
        let res = '';
    
        const formData = new FormData();
        formData.append("fcmToken", params[0].fcmToken);
    
        callBack = await axios
            .post(baseUrl + "layanan/convertToken/", formData)
            .then(res => {
                isValid = true;
                res = res.data;
                responseMsg['msg'] = '';
                responseMsg['status'] = isValid;
                responseMsg['res'] = res;
                return(responseMsg);
            })
            .catch(error => {
                if(error.response !== undefined && error.response.status === 404) {
                    isValid = false;
                    responseMsg['msg'] = 'Terjadi kesalahan...';
                    responseMsg['status'] = isValid;
                }else if(error.response.data.status === 401 && error.response.data.messages.error === 'Expired token'){
                    isValid = false;
                    responseMsg['msg'] = error.response.data.messages.error;
                    responseMsg['status'] = isValid;
                }else {
                    isValid = false;
                    responseMsg['msg'] = error;
                    responseMsg['status'] = isValid;
                }
                return(responseMsg);
            })
        return(callBack);
    },

    checkToken: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
        let res = '';
    
        const formData = new URLSearchParams();
        formData.append("token", params[0].token);
    
        callBack = await axios
            .post(params[0].base_url + "user/checkToken/", formData)
            .then(res => {
                isValid = true;
                res = res.data;
                responseMsg['msg'] = '';
                responseMsg['status'] = isValid;
                responseMsg['res'] = res;
                return(responseMsg);
            })
            .catch(error => {
                isValid = false;
                responseMsg['msg'] = JSON.stringify(error.message);
                responseMsg['status'] = isValid;
                return(responseMsg);
            })
        return(callBack);
    },

    //login
    login: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
        let res = '';

        const formData = new URLSearchParams();
        formData.append("password", params[0].password);
        formData.append("fcmToken", params[0].fcmToken);

        callBack = await axios
        .post(params[0].base_url + "user/login/" + params[0].nohp, formData)
        .then(res => {
            isValid = true;
            res = res.data;
            responseMsg['msg'] = '';
            responseMsg['status'] = isValid;
            responseMsg['res'] = res;
            return(responseMsg);
        })
        .catch(error => {
            isValid = false;
            responseMsg['msg'] = JSON.stringify(error.message);
            responseMsg['status'] = isValid;
            return(responseMsg);
        })
        return(callBack);
    },

    getLoginData: async () => {
        const params = [];
        try {
          const loginState = await AsyncStorage.getItem('loginStateUser');
          const hp = await AsyncStorage.getItem('hp');
          const id_user = await AsyncStorage.getItem('id_user');
          const en_id_user = await AsyncStorage.getItem('en_id_user');
          const nama_user = await AsyncStorage.getItem('nama_user');
          const email = await AsyncStorage.getItem('email');
          const id_outlet = await AsyncStorage.getItem('id_outlet');
          const nama_outlet = await AsyncStorage.getItem('nama_outlet');
          const id_kategori = await AsyncStorage.getItem('id_kategori');
          const kategori = await AsyncStorage.getItem('kategori');
          const address = await AsyncStorage.getItem('address');
          const verified = await AsyncStorage.getItem('verified');
          const token = await AsyncStorage.getItem('token');
          await params.push({
            loginState: loginState,
            hp: hp,
            id_user: id_user,
            en_id_user: en_id_user,
            nama_user: nama_user,
            email: email,
            id_outlet: id_outlet,
            nama_outlet: nama_outlet,
            id_kategori: id_kategori,
            kategori: kategori,
            address: address,
            verified: verified,
            token: token
          });
    
        } catch (error) {
          // Error saving data
          alert(error);
        } finally {
          return(params);
        }
    },

    getLocationByAddress: async (address) => {
        Geocoder.init(APIKeyGoogle);
    
        const callBack = await Geocoder.from(address)
          .then(json => {
            var location = json.results[0].geometry.location;
            return(location);
          })
          .catch(error => console.warn(error));
    
        return(callBack);
    },

    getLocation: async (lat, lon) => {
        Geocoder.init(APIKeyGoogle);
    
        let callBack = [];
        // let isValid = true;
        // let responseMsg = {};
        // let res = '';
    
        if(lat !== '' && lon !== '') {
          callBack = await Geocoder.from(lat, lon)
            .then(json => {
              var location = json.results[0].formatted_address;
              //console.log(location);
              return(location);
            })
            .catch(error => console.warn(error));
        }
    
        return(callBack);
    },

    //cek password lama saat update password
    checkCurrentPassword: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};

        if(params[0].old_pass !== '') {
        callBack = await axios
        .get(baseUrl + "user/validationPassword/" + params[0].id_user, {params: {old_password: params[0].old_pass}})
        .then(res => {
            if(res.data.responseCode !== "000") {
            isValid = false;
            responseMsg['msg'] = "*Password lama salah";
            responseMsg['status'] = isValid;
            return(responseMsg);
            }else {
            responseMsg['status'] = isValid;
            return(responseMsg);
            }
        })
        .catch(error=>{
            isValid = false;
            responseMsg['msg'] = JSON.stringify(error.message);
            responseMsg['status'] = isValid;
            return(responseMsg);
        })
        }
        return(callBack);
    },

    handlePreSubmitUpdatePassword: (params) => {
        let isValid = true;
        let responseMsg = {};
    
        const oldPassword = params[0].oldPassword;
        const password = params[0].password;
        const cpassword = params[0].cpassword;
    
        if(oldPassword == '') {
          isValid = false;
          responseMsg['oldPassword'] = '*Kata sandi tidak boleh kosong';
        }
    
        if(!cpassword == '' && !password == '') {
          if(cpassword != password){
            isValid = false;
            responseMsg['cpassword'] = '*Kata sandi tidak sama';
          }else {
            responseMsg['cpassword'] = '';
          }
        }else {
          isValid = false;
          responseMsg['cpassword'] = '*Kata sandi tidak boleh kosong';
        }
    
        if(!password == '') {
          //let passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
          let passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
          if(password.length < 8){
            isValid = false;
            responseMsg['password'] = '*Kata sandi tidak valid';
          }else {
            if(!password.match(passPattern)) {
              isValid = false;
              responseMsg['password'] = '*Kata sandi tidak valid';
            }else {
              responseMsg['password'] = '';
            }
          }
        }else {
          isValid = false;
          responseMsg['password'] = '*Kata sandi tidak boleh kosong';
          responseMsg['cpassword'] = '';
        }
    
        responseMsg['status'] = isValid;
        return(responseMsg);
      },

      updatePassword: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
    
        const formData = new URLSearchParams();
          formData.append("password", params[0].password);
          formData.append("token", params[0].token);
    
        callBack = await axios
          .post(baseUrl + "user/updatePassword/" + params[0].id_user, formData)
          .then(res => {
            // console.log('RES : ', res);
            if(res.data.responseCode !== "000") {
              isValid = false;
              responseMsg['msg'] = (res.data.messages[0] !== undefined && res.data.messages[0].length > 1) ? res.data.messages[0] : res.data.messages;
              responseMsg['status'] = isValid;
              return(responseMsg);
            }else {
              responseMsg['status'] = isValid;
              return(responseMsg);
            }
          })
          .catch(error => {
            isValid = false;
            responseMsg['msg'] = JSON.stringify(error.message);
            responseMsg['status'] = isValid;
            return(responseMsg);
          })
        return(callBack);
    },

    logout: async (params) => {
        let callBack = [];
        let isValid = true;
        let responseMsg = {};
        let res = '';
        
        const formData = new URLSearchParams();
        formData.append("id_user", params[0].id_user);
        formData.append("token", params[0].token);
    
        callBack = await axios
          .post(baseUrl + "user/logout/", formData)
          .then(res => {
            isValid = true;
            res = res.data;
            responseMsg['msg'] = '';
            responseMsg['status'] = isValid;
            responseMsg['res'] = res;
            return(responseMsg);
          })
          .catch(error => {
            isValid = false;
            responseMsg['msg'] = JSON.stringify(error.message);
            responseMsg['status'] = isValid;
            return(responseMsg);
          })
        return(callBack);
    },

    updateDataOutlet: async (params) => {
        let callBack = [];
        
        const formData = new URLSearchParams();
        formData.append("id_user", params[0].id_user);
        formData.append("token", params[0].token);
        formData.append("id_category", params[0].id_category);
        formData.append("address", params[0].address);
        formData.append("lat", params[0].lat);
        formData.append("lon", params[0].lon);

        callBack = await axios
            .post(baseUrl + "user/updateDataOutlet/", formData)
            .then(res => {
                return(res.data);
            })
            .catch(error => {
                return(error);
            })
        return(callBack);
    },

    getProductCategory: async (params) => {
        let callBack = [];
        const formData = new URLSearchParams();
        formData.append("token", params[0].token);

        callBack = await axios
            .get(baseUrl + "layanan/getProductCategory/" + params[0].id_outlet, {params: {token: params[0].token}})
            .then(res => {
                return(res.data);
            })
            .catch(error => {
                return(error);
            })
        return(callBack);
    },

    setProductCategory: async (params) => {
        let callBack = [];
        const formData = new URLSearchParams();
        formData.append("id_outlet", params[0].id_outlet);
        formData.append("id_product_category", params[0].idProductCategory);
        formData.append("product_category", params[0].productCategory);
        formData.append("token", params[0].token);

        callBack = await axios
            .post(baseUrl + "layanan/setProductCategory/" + params[0].method, formData)
            .then(res => {
                return(res.data);
            })
            .catch(error => {
                return(error);
            })
        return(callBack);
    },

    setProduct: async (params) => {
        let callBack = [];
        const formData = new URLSearchParams();
        if(params[0].method === 'add') {
            formData.append("id_outlet", params[0].id_outlet);
            formData.append("product_name", params[0].product_name);
            formData.append("id_product_category", params[0].id_product_category);
            formData.append("price", params[0].price);
            formData.append("unit", params[0].unit);
            formData.append("stock", params[0].stock);
            formData.append("token", params[0].token);
        }else if(params[0].method === 'edit') {
            formData.append("id_outlet", params[0].id_outlet);
            formData.append("id_product", params[0].id_product);
            formData.append("stock", params[0].stock);
            formData.append("token", params[0].token);
        }else if(params[0].method === 'editReduce') {
            formData.append("id_outlet", params[0].id_outlet);
            formData.append("id_product", params[0].id_product);
            formData.append("stock", params[0].stock);
            formData.append("info", params[0].info);
            formData.append("token", params[0].token);
        }
        else if(params[0].method === 'editName') {
            formData.append("id_outlet", params[0].id_outlet);
            formData.append("id_product", params[0].id_product);
            formData.append("product_name", params[0].product_name);
            formData.append("token", params[0].token);
        }

        callBack = await axios
            .post(baseUrl + "layanan/setProduct/" + params[0].method, formData)
            .then(res => {
                return(res.data);
            })
            .catch(error => {
                return(error);
            })
        return(callBack);
    },

    getProduct: async (params) => {
        let callBack = [];
        const formData = new URLSearchParams();
        formData.append("id_outlet", params[0].id_outlet);
        formData.append("token", params[0].token);

        callBack = await axios
            .post(baseUrl + "layanan/getProduct/", formData)
            .then(res => {
                return(res.data);
            })
            .catch(error => {
                return(error);
            })
        return(callBack);
    },

    formatDecimal: (num) => {
        return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },

    convertDecimal: (ev) => {
        let biaya = ev;
        biaya = biaya.replace(/\./g,"");
        let biaya_fix = biaya.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        biaya_fix = biaya_fix.replace(/,/g, ".");
        return biaya_fix;
    },

    revertDecimal: (ev) => {
        let biaya = ev;
        biaya = biaya.replace(/\./g,"");
        return biaya;
    },

    currencyFormat: (num) => {
        return 'Rp. ' + num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
});