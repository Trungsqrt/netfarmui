import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';

const urlLogin = 'https://localhost:44303/api/Login';
const urlRegister = 'https://localhost:44303/api/Users';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    const res = await axios.post(urlLogin, user);
    if (res.data.data.accessToken) {
        dispatch(loginSuccess(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/client/home');
    } else {
        dispatch(loginFailed());
        alert('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu');
        navigate('/login');
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('https://localhost:44303/api/Users', user);
        dispatch(registerSuccess()); // để show status lên redux devtool extension
        alert('Đăng ký thành công!');
        window.location.reload();
    } catch (error) {
        alert('Đăng ký thất bại!');
        dispatch(registerFailed());
    }
};

// export const logoutUser = async () => {
//    logout() {
//       localStorage.removeItem("user");
//     }
// }
