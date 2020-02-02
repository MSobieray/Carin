const TOGGLE = (state, payload = !state.visible) => {
  state.visible = payload;
};

const UPDATE = (state, payload) => {
  state.type = payload.type;
};

const UPDATE_PAGE = (state, payload) => {
  state.page = payload;
};

export default {
  TOGGLE,
  UPDATE,
  UPDATE_PAGE
};
