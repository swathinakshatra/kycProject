import store from "../store/store";
import { backEndCallObj } from "../../AdminComponents/Services/mainServiceFile";


export var GET_ADMINCONTROLS = "GET_ADMINCONTROLS";

async function get_AdminControls(route, email) {
  try {
    const data = await backEndCallObj(route, {
      email,
    });
    if (data) {
      store.dispatch({ type: GET_ADMINCONTROLS, payload: data });
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
    }
  }
}

export default get_AdminControls;
