import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/alertContext'

const Search = () => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext)

    //state
    const [text, setText] = useState('')

    //functions
    const onChange = (e) => {
        setText(e.target.value)
    }
    console.log(githubContext.users)
    const onSubmit = (e) => {
        e.preventDefault()
        if (text === "") {
            alertContext.setAlert('Please Enter Something', 'alert-light');
        } else {
            githubContext.searchUsers(text);
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
                githubContext.users.length>0 && (
                    <button className="btn btn-danger btn-block" onClick={githubContext.clearUsers}>Clear</button>)
            }
        </div>
    )
}

export default Search;
