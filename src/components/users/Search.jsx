import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = ({ setAlert, searchUsers, showClearBtn, clearUsers }) => {
    //state
    const [text, setText] = useState('')

    //functions
    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (text === "") {
            setAlert('Please Enter Something', 'alert-light');
        } else {
            searchUsers(text);
            setText("");
        }
    }
    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" name="text" placeholder="Search User" onChange={onChange} value={text} />
                <input type="submit" className="btn btn-dark btn-block" value="Search" />
            </form>
            {
                showClearBtn && (
                    <button className="btn btn-danger btn-block" onClick={clearUsers}>Clear</button>)
            }
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}
export default Search;
