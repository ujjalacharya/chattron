import * as api from "../api/auth";

export const registerUser = (formData) => async (dispatch) => {
  const user = await api.register(formData);
  dispatch({ type: "AUTH_REGISTER_SUCCESS" });
  return user;
};
