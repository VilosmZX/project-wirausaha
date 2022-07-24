import React, {useContext} from 'react'
import styles from './Login.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { user, isError, isDone, loginUser } = useContext(AuthContext);

  return (
    <div>
      {!user ? (
        <div className={styles.baseLogin}>
            <div>
                <h1>Login</h1>
                <span>Akun hanya bisa dimiliki oleh selaku tim. Dan akun hanya bisa dibuat oleh saya selaku developer.</span>
                {isError && <span>Username atau password salah!</span>}
                <form method='post' onSubmit={(e) => loginUser(e)}>
                    <input type="text" name="username" id="username" placeholder='Username' />
                    <input type="password" name="password" id="password" placeholder='Password'/>
                    {isDone===false ? <button disabled type="submit">Memuat...</button> : <button type="submit">Login</button>}
                </form>
            </div>
        </div>
      ) : (
        <Navigate to='/' />
      )}
    </div>
  )
}

export default Login