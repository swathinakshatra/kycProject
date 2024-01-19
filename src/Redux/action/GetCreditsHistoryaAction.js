import store from "../store/store";
import { backEndCallObj } from "../../AdminComponents/Services/mainServiceFile";

export var GET_CREDITS_HISTORY = "GET_CREDITS_HISTORY";

async function get_Credits_History(route, page, limit) {
  try {
    var existingCreditsHistory = store.getState().getcreditshistory;

    existingCreditsHistory =
      existingCreditsHistory === null || existingCreditsHistory === undefined
        ? []
        : existingCreditsHistory.data;

    const data = await backEndCallObj(route, {
      page,
      limit,
    });
    if (data) {
      const loadMore = data.loadMore;

      const combinedData = [...existingCreditsHistory, ...data.main];
      const combinedPayload = {
        data: combinedData,
        loadMore: loadMore,
      };
      store.dispatch({ type: GET_CREDITS_HISTORY, payload: combinedPayload });
    }
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      // authService.logout();
    }
  }
}

export default get_Credits_History;
