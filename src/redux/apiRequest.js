import axios from "axios";
import {
   loginFailed,
   loginStart,
   loginSuccess,
   registerFailed,
   registerStart,
   registerSuccess,
} from "./authSlice";

const urlLogin = "https://localhost:44303/api/Login";
const urlRegister = "https://localhost:44303/api/Register";

export const loginUser = async (user, dispatch, navigate) => {
   dispatch(loginStart());
   const res = await axios.post(urlLogin, user);
   if (res.data.data.accessToken) {
      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/home");
   } else {
      dispatch(loginFailed());
      navigate("/");
   }
};

export const registerUser = async (user, dispatch, navigate) => {
   dispatch(registerStart());
   try {
      await axios.post(urlRegister, user);
      dispatch(registerSuccess());
      navigate("/login");
   } catch (error) {
      dispatch(registerFailed);
   }
};

// export const logoutUser = async () => {
//    logout() {
//       localStorage.removeItem("user");
//     }
// }
