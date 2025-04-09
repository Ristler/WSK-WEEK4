import React from 'react'
import {useLocation, useNavigate} from "react-router";

const Single = () => {
  const {state} = useLocation();
  const item = state.item;
  const navigate = useNavigate();


  return (
    <>
    {item && (
      <dialog open>
        <button onClick={() => navigate(-1)}>&#10005;</button>
        {item.media_type.includes('video') ? (
          <video src={item.filename} controls />
        ) : (
          <img src={item.filename} alt={item.title} />
        )}
        <h3>Title: {item.title}</h3>
        <p>{item.description}</p>
      </dialog>
    )}
  </>
  )
}

export default Single