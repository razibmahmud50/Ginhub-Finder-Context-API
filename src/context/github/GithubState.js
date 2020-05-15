import React, {useReducer} from 'react'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import axios from 'axios'
import {SEARCH_USERS, GET_USER, CLEAR_USERS, GET_REPOS, SET_LOADING, SET_ALERT, REMOVE_ALERT} from '../types'

const GithubState = props=>{
    const initialState ={
        users:[],
        user:{},
        repos: [],
        loading:false
    };
    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // search github users
    const searchUsers = async (text) => {
        setLoading()

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&
            client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
            client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)
        dispatch ({
            type:SEARCH_USERS,
            payload:res.data.items
        })
    }
      //clear all users
      const clearUsers = () => dispatch({type:CLEAR_USERS})

          //get single user
          const getUser = async (username) => {
            setLoading()
        
            const res = await axios.get(`https://api.github.com/users/${username}?
                client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
                client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)
            dispatch({
                type:GET_USER,
                payload:res.data
            })
          }

          
  //get user repos
  const getUserRepos = async (username) => {
    setLoading()
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
        client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
        client_secret_id=${process.env.REACT_APP_GITHUB_CLIENT_SECRET_ID}`)
    dispatch({
        type:GET_REPOS,
        payload:res.data
    })
  }


    //Set Loading
    const setLoading = ()=> dispatch({type:SET_LOADING})
    
    return (
        <GithubContext.Provider value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos

        }}>
            {props.children}
        </GithubContext.Provider>
    )

}
export default GithubState