import { GET_KYCSTATS } from "../action/GetKycStatsAction";

const getkycstatsreducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_KYCSTATS:
      return payload;
    default:
      return state;
  }
};
export default getkycstatsreducer;
