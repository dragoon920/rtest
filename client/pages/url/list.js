import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import buildClient from "../../api/build-client";

const urlList = (currentUser) => {
    const [longUrl, setLongUrl] = useState('');
    const [userId, setUserId] = useState('')
    const [lists, setLists] = useState([]);

    useEffect(() => {
        if(currentUser){
            setUserId(currentUser.currentUser.id)
        }else {
            Router.push('/');
        }
    }, [currentUser, Router])

    useEffect(() => {
        (async () => {
            console.log(userId)
            if(userId) {
                console.log(`/api/url/${userId}`);    
                const res = await axios.get(`/api/url/${userId}`);
                console.log(res.data);
                setLists(res.data);
            }
        })()
    }, [userId])
    


    const {doRequest, errors} = useRequest({
        // url: `/api/url/${userId}`,
        url: `/api/url/${userId}`,
        method: 'post',
        body: {
            longUrl, 
        },
        onSuccess: (data) => {
            setLists([...lists, data])
        },
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
        setLongUrl('')
    }

    
    // const fetchLists = async () => {
    //     console.log(`/api/url/${userId}`);
    //     const res = await axios.get(`/api/url/${userId}`);
    //     console.log(res.data);
    //     setLists(res.data);
    // }


    const renderLists = Object.values(lists).map(list => {
        return <div className="card" style={{ width:'30%', marginBottom:'20px'}}
         key={list.id}
        >
            <div className='card-body'>
                <h3>Long: {list.longUrl}</h3>
                <div>Short: {list.shortUrl}</div>
            </div>
        </div>
    });

    return(
        <div>
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
            <div className='d-flex flex-row flex-wrap justify-content-between'>
                {renderLists}
            </div>
        </div>

    );
}

urlList.getInitialProps = async (context) => {
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');
    return data;
};
export default urlList;