import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    const data = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    let [authTokens, setAuthTokens] = useState(() => data);
    let [isDone, setIsDone] = useState(null);
    let [isError, setIsError] = useState(null);
    let [user, setUser] = useState(() => data ? jwtDecode(data.access) : null);
    let [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    let loginUser = async (e) => {
        setIsDone(false);
        setIsError(false);
        e.preventDefault()
        console.log('Form submited');
        let response = await fetch('http://47.254.249.69/api/token/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: e.target.username.value, password: e.target.password.value})
        });
        let data = await response.json();
        if(response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(data.access));
            setIsDone(true);
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            setIsDone(true)
            setIsError(true);
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('secret/login')
    }

    const updateToken = async () => {
        let response = await fetch('http://47.254.249.69/api/token/r/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens.refresh})
        });
        const data = await response.json();
        if(response.status === 200) {
            setAuthTokens(data);
            setUser(jwtDecode(authTokens.access));
            localStorage.setItem('authTokens', JSON.stringify(authTokens));
        } else {
            logoutUser();
        }
    };

    let contextData = {
        loginUser,
        isDone,
        isError,
        user,
        logoutUser
    }

    useEffect(() => {
        console.log('Token Updated');
        let interval = setInterval(() => {
            if(authTokens) {
                updateToken();
            }
        }, 60 * 1000 * 4);
        return () => clearInterval(interval);

    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
};