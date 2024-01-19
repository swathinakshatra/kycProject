import store from "../store/store";
import { backEndCallObj } from "../../AdminComponents/Services/mainServiceFile";


export var GET_APPID = "GET_APPID";

async function get_AppId(route, email) {
  try {
    const data = await backEndCallObj(route, {
      email,
    });
    if (data) {
      store.dispatch({ type: GET_APPID, payload: data });
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      // authService.logout();
    }
  }
}

export default get_AppId;
