import React from 'react';
import Axios from 'axios';

// To download the JSON 
export function Download(props){
    const download=(e)=>{

        Axios({
            url: 'https://localhost:33123/items/downloadJSON/',
            method: 'GET',
            responseType: 'text', // important (have it as blob if you don't stringify)
            headers: {
                accessToken: localStorage.getItem("accessToken"),
                username: props.username,
                },
        }).then((response) => {
            
            const sanitizedData = JSON.stringify(response.data, null, "\t").replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
            const create_url = window.URL.createObjectURL(new Blob([sanitizedData]));
            const generate_link = document.createElement('a');

            generate_link.href = create_url;
            generate_link.setAttribute('download', 'auctions.json');
            document.body.appendChild(generate_link);
            generate_link.click();
        
        });
    }

    return (
        <div>
            <button className="buttonito" onClick={download} >Download JSON</button>
        </div>
    );

}