import { GET_CREDITS_HISTORY } from "../action/GetCreditsHistoryaAction";

const getcreditshistoryreducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_CREDITS_HISTORY:
      return payload;
    default:
      return state;
  }
};
export default getcreditshistoryreducer;
