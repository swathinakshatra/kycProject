import { combineReducers } from "redux";

import getusersreducer from "./getusersreducer";
import getkychistoryreducer from "./GetKYCHistoryReducer";
import getcreditshistoryreducer from "./GetCreditsHistoryReducer";
import getadmincontrolsReducer from "./GetAdminControlsReducer";
import getkycstatsreducer from "./GetKycStatsReducer";
import getappidreducer from "./GetAppIdReducer";

export default function allReducers() {
  return combineReducers({
    getusers: getusersreducer,
    getkychistory: getkychistoryreducer,
    getcreditshistory: getcreditshistoryreducer,
    getadmincontrols: getadmincontrolsReducer,
    getkycstats: getkycstatsreducer,
    getappid: getappidreducer,
  });
}
