const LOGIN = (state, { displayName, email, uid, photoURL }) => {
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
export default { LOGIN, LOGOUT };
