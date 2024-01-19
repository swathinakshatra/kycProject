import { GET_USERS } from "../action/getusersAction";

const getusersreducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_USERS:
      return payload;
    default:
      return state;
  }
};
export default getusersreducer;
