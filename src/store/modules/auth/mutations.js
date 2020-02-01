const SET_USER = (state, { displayName, email, uid, photoURL }) => {
  state.user = {
    name: displayName,
    email,
    uid,
    photoURL
  };
};
const LOGOUT = state => {
  state.user = false;
};
export default { SET_USER, LOGOUT };
