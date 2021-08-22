import {useState} from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const urlList = () => {
    const [longUrl, setLongUrl] = useState('');
    let [userId, setUserId] = useState('');
    userId = 1234;
    const {doRequest, errors} = useRequest({
        url: '/api/url/',
        method: 'post',
        body: {
            longUrl, 
            userId,
        },
        onSuccess: () => {},
    });
    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    }
    return(
        <form onSubmit={onSubmit}>
            <h1>Add URL</h1>
            <div className='form-group'>
                <label>Long Url</label>
                <input value = {longUrl} onChange = {e=>setLongUrl(e.target.value)}
                 className="form-control" />
            </div>
            {errors}
            <button className="btn btn-primary">Add Long URL</button>
        </form>
    );
}
export default urlList;