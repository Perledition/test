import React, { useState, useEffect } from 'react';


export interface Props {
    title: string;
    body: string;
}

export default function PostRequest () {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [posts, setPosts] = useState([]);

    const addPosts = async (title: string, body: any) => {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: Math.random().toString(36).slice(2),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            // setPosts((posts) => [data, ...posts]);
            setTitle('');
            setBody('');
        })
        .catch((err) => {
            console.log(err.message);
        });
    };



    return (
        <></>
    );
};
