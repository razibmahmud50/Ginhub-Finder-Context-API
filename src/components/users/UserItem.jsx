import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const UserItem = ({ user }) => {
    return (
        <div className="card text-center">
            <img src={user.avatar_url} alt="" className="round-img" style={{ width: '60px' }} />
            <h2>{user.login}</h2>
            <div>
                <Link to={`user/${user.login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
        </div>
    )
}
UserItem.userItemPropTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem;
