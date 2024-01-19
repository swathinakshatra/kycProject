import store from "../store/store";
import { backEndCallObj } from "../../AdminComponents/Services/mainServiceFile";

export var GET_USERS = "GET_USERS";

async function get_Users(route, page, limit) {
  try {
    var existingUsers = store.getState().getusers;

    existingUsers =
      existingUsers === null || existingUsers === undefined
        ? []
        : existingUsers.data;

    const data = await backEndCallObj(route, {
      page,
      limit,
    });
    if (data) {
      const loadMore = data.loadMore;

      const combinedData = [...existingUsers, ...data.main];
      const combinedPayload = {
        data: combinedData,
        loadMore: loadMore,
      };
      store.dispatch({ type: GET_USERS, payload: combinedPayload });
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
    }
  }
}

export default get_Users;
