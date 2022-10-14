import { useState } from "react";
import "./CreateExpert.css";
import loginImage from "../../assets/image/loginImage.jpg";
function CreateExpert() {
    return <div>
        <div className="container-create">
            <div className="content-left">
                <h2>TẠO TÀI KHOẢN EXPERT</h2>
                <img className="createImage" src={loginImage} alt="img"></img>
            </div>
            <div className="content-right">
                <h2>Tài khoản Expert</h2>
                <p className="create-note">Nhập thông tin đăng ký</p>
                <form className="form-create">
                    <tr>
                        <td colSpan="2">
                            <input className="input-field" type="text" name="fname" placeholder="Họ lót"></input>
                        </td>
                        <td>
                            <input className="input-field" type="text" name="fname" placeholder="Tên"></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <input className="input-field" type="number" name="uname" id="uname" placeholder="Số điện thoại"></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <input className="input-field" type="password" name="pass" placeholder="Mật khẩu"></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <input className="input-field" type="password" name="repass" placeholder="Xác nhận mật khẩu"></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input className="input-field" type="number" name="day" placeholder="Ngày sinh"></input>
                        </td>
                        <td>
                            <input className="input-field" type="number" name="month" placeholder="Tháng sinh"></input>
                        </td>
                        <td>
                            <input className="input-field" type="number" name="year" placeholder="Năm sinh"></input>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <span className="name-field">Giới tính</span>
                            <select>
                                <option>Nam</option>
                                <option>Nữ</option>
                            </select>
                        </td>
                    </tr>
                </form>
                <button className="btn-create" type="submit">CREATE</button>
            </div>
        </div>
    </div>;
}
export default CreateExpert;