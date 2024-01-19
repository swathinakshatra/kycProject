import { GET_KYC_HISTORY } from "../action/GetKYCHistoryAction";

const getkychistoryreducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_KYC_HISTORY:
      return payload;
    default:
      return state;
  }
};
export default getkychistoryreducer;
