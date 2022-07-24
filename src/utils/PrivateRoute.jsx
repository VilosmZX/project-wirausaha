import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    console.log(children, rest)
    return (
        <Route {...rest}>{children}</Route>
    );
};

export default PrivateRoute;