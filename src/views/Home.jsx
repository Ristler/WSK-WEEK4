import React, { useEffect, useState } from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import { fetchData } from '../utils/fetchData';


const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const mediaUrl = import.meta.env.VITE_MEDIA_API + '/media';
  const authUrl = import.meta.env.VITE_AUTH_API;
  


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


  //console.log("mediarray pääohlema", mediaArray);

  return (
    <>
     <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
           
          </tr>
        </thead>
        <tbody>

          {mediaArray.map((item) => (
            <MediaRow
            key={item.media_id}
            item={item} 
            setSelectedItem={setSelectedItem}
            />

          ))}
        </tbody>
      </table>
      </>
  );
};

export default Home;
