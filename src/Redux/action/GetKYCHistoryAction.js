import store from "../store/store";
import { backEndCallObj } from "../../AdminComponents/Services/mainServiceFile";

export var GET_KYC_HISTORY = "GET_KYC_History";

async function get_Kyc_History(route, page, limit) {
  try {
    var existingKycHistory = store.getState().getkychistory;

    existingKycHistory =
      existingKycHistory === null || existingKycHistory === undefined
        ? []
        : existingKycHistory.data;

    const data = await backEndCallObj(route, {
      page,
      limit,
    });

    if (data) {
      const loadMore = data.loadMore;
      const combinedData = [...existingKycHistory, ...data.main];
      const combinedPayload = {
        data: combinedData,
        loadMore: loadMore,
      };
      store.dispatch({ type: GET_KYC_HISTORY, payload: combinedPayload });
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      // authService.logout();
    }
  }
}

export default get_Kyc_History;
