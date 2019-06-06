const LOGIN = (state, payload) => {
  state.user = payload;
};
const LOGOUT = state => {
  state.user = false;
};
export default { LOGIN, LOGOUT };
