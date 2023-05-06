import axios from 'axios';
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from './authSlice';
const urlLogin = 'https://localhost:44303/api/Login';
const urlRegister = 'https://localhost:44303/api/Users';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    const res = await axios.post(urlLogin, user);
    // if (res.data.data.accessToken) {
    if (res.data.success) {
        dispatch(loginSuccess(res.data));
        localStorage.setItem('user', JSON.stringify(res.data));
        const getUser = localStorage.getItem('user');
        const user = JSON.parse(getUser);
        console.log(user);
        if (user.roleName === 'Admin') navigate('/AdminHome');
        else if (user.roleName === 'Expert') navigate('/expert');
        else navigate('/');
    } else {
        dispatch(loginFailed());
        alert('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu');
        navigate('/login');
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(urlRegister, user);
        dispatch(registerSuccess()); // để show status lên redux devtool extension
        alert('Đăng ký thành công!');
        window.location.reload();
    } catch (error) {
        alert('Đăng ký thất bại!');
        dispatch(registerFailed());
    }
};

export const logoutUser = async (dispatch, navigate) => {
    dispatch(registerStart());
    try {
        navigate('/login');
        localStorage.removeItem('user');
    } catch (error) {
        console.warn(error);
    }
};
