import { fetchData } from '../utils/fetchData';
import React, { useEffect, useState } from 'react';


const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
const authUrl = import.meta.env.VITE_AUTH_API;


const useMedia = () => {
    const [mediaArray, setMediaArray] = useState([]);



const getMedia = async() => {
    try {
      const mediaData = await fetchData(mediaUrl);
 
      setMediaArray(mediaData);
    
      const newData = await Promise.all(
        mediaData.map(async (item) => {
          const data = await fetchData(`${authUrl}/users/${item.user_id}`);
          return {...item, username: data.username}
        })
      )
      console.log(mediaArray)
      setMediaArray(newData);
    } catch (error) {
      console.log(error);
      
    }
  };
    
  useEffect(() => {
    getMedia();
  },[]);
  
  return mediaArray
}

  export default useMedia;