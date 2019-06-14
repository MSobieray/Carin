let nextId = 0;
const PUSH = (state, notification) => {
  state.notifications.push({
    ...notification,
    id: nextId++
  });
};
const REMOVE = (state, id) => {
  state.notifications = state.notifications.filter(
    notification => notification.id !== id
  );
};

export default {
  PUSH,
  REMOVE
};
