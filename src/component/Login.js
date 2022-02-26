import React from 'react';
import Auth from './Auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './login.css';
const Login = () => {
    const history = useHistory();
    const login = () => {
        Auth.login();
        history.push("/")
    }

    return (
        <div className="wrapper">
            <div id="formContent">
                <div className="pt-3"><h3>Đăng nhập</h3></div>
                <p className="text-danger err_login mt-1"></p>
                <form action="#" method="post">
                    <input type="text" name="email" placeholder="Email" />
                    <p className="text-danger err_email mt-1"></p>
                    <input type="password" name="password" placeholder="Mật khẩu" />
                    <p className="text-danger err_pass mt-1"></p>
                    <input type="submit" value="Đăng nhập" onClick={login} />
                </form>
            </div>
        </div >
    )
}

export default Login;