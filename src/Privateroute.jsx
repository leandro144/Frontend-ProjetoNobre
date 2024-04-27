
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Privateroute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to='/' />;
};

Privateroute.propTypes = {
  children: PropTypes.node 
};

export default Privateroute;
