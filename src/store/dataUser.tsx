const dataUser = (state = {}, action) => {
  switch(action.type) {
    case 'setData':
      return {
        // ...state,
        loginState: action.payload.loginState,
        hp: action.payload.hp,
        id_user: action.payload.id_user,
        nama_user: action.payload.nama_user,
        email: action.payload.email,
        id_outlet: action.payload.id_outlet,
        nama_outlet: action.payload.nama_outlet,
        id_kategori: action.payload.id_kategori,
        kategori: action.payload.kategori,
        address: action.payload.address,
        verified: action.payload.verified,
        token: action.payload.token
      }
      break;
    case 'updateDataOutlet':
      return {
        loginState: state.loginState,
        hp: state.hp,
        id_user: state.id_user,
        nama_user: state.nama_user,
        email: state.email,
        id_outlet: state.id_outlet,
        nama_outlet: state.nama_outlet,
        id_kategori: action.payload[0].id_kategori,
        kategori: state.kategori,
        address: action.payload[0].address,
        verified: state.verified,
        token: state.token
      }
      break;
    default:
      return {
        
      }
  }
  // if(action.type === 'setData') {
  //   return {
  //     // ...state,
  //     loginState: action.payload.loginState,
  //     hp: action.payload.hp,
  //     id_user: action.payload.id_user,
  //     nama_user: action.payload.nama_user,
  //     email: action.payload.email,
  //     nama_outlet: action.payload.nama_outlet,
  //     id_kategori: action.payload.id_kategori,
  //     kategori: action.payload.kategori,
  //     address: action.payload.address,
  //     verified: action.payload.verified,
  //     token: action.payload.token
  //   }
  // }

  return state;
};
  
export default dataUser;  