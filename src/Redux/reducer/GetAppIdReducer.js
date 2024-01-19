import { GET_APPID } from "../action/getAppIdAction";

const getappidreducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_APPID:
      return payload;
    default:
      return state;
  }
};
export default getappidreducer;
