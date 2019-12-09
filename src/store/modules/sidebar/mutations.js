const TOGGLE = (state, payload = !state.visible) => {
  state.visible = payload;
};

const UPDATE = (state, payload) => {
  state.type = payload;
};

export default {
  TOGGLE,
  UPDATE
};
