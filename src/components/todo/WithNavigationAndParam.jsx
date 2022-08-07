import {useNavigate, useParams} from 'react-router-dom'

function withNavigationAndParam(Component) {
    return props => <Component {...props} navigate={useNavigate()} params={useParams()} />;
}

export default withNavigationAndParam