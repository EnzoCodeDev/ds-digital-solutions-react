import React from 'react';
import { useHistory } from 'react-router';
export const ButtonOpen = () => {
    const history = useHistory()
    const handleClickNew = () => {
        history.push('/newDocument')
    }
    return (
        <button
            className="btn btn-danger fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}