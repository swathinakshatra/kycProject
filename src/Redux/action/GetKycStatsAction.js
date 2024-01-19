import store from "../store/store";
import { backEndCallObj } from "../../AdminComponents/Services/mainServiceFile";
import authService from "../../AdminComponents/Services/authService";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export var GET_KYCSTATS = "GET_KYCSTATS";

async function get_KycStats(route) {
  try {
    const data = await backEndCallObj(route);
    if (data) {
      store.dispatch({ type: GET_KYCSTATS, payload: data });
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      // authService.logout();
    }
  }
}

export default get_KycStats;
