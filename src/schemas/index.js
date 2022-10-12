import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
const usernameRules = /^[0-9]{9}$/;
// min 7 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const basicSchema = yup.object().shape({
   uname: yup
      .string()
      .matches(usernameRules, { message: "Hãy nhập đủ 10 số!" })
      .required("Hãy nhập số điện thoại!"),
   pass: yup
      .string()
      .matches(passwordRules, { message: "Hãy nhập mật khẩu mạnh hơn!" })
      .required("Không được bỏ trống!"),
   confirmPassword: yup
      .string()
      .oneOf(
         [yup.ref("password"), null],
         "Mật khẩu phải trùng với mật khẩu ở trên!"
      )
      .required("Không được bỏ trống!"),
   fname: yup.string().required("Không được bỏ trống!"),
   lname: yup.string().required("Không được bỏ trống!"),
});
