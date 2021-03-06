import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';
const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (Auth.isAuth()) {
                return <Component />
            } else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        }} />
    )
}

export default ProtectedRoute;