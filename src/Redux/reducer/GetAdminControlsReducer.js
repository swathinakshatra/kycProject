import { GET_ADMINCONTROLS } from "../action/GetAdminControlsAction";

const getadmincontrolsReducer = (state = null, { type, payload }) => {
  switch (type) {
    case GET_ADMINCONTROLS:
      return payload;
    default:
      return state;
  }
};
export default getadmincontrolsReducer;
