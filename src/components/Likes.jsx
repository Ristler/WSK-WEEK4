import {useState} from 'react';
import PropTypes from 'prop-types';
import {useAuthentication, useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({item}) => {

  const [likesCount, setLikesCount] = useState(item.likes_count || 0);
  const [userLiked, setUserLiked] = useState(item.user_liked || false);
  
  const {isLoggedIn} = useAuthentication();
  const {user} = useUserContext();
  const token = localStorage.getItem('token');
  const {postLike, deleteLike} = useLike();

  const handleLikeClick = async () => {
    if (!isLoggedIn) return;
    
    try {
      if (userLiked) {
        await deleteLike(item.media_id, token);
      } else {
    
        await postLike({media_id: item.media_id}, token);
      }
      
     
      
      setUserLiked(!userLiked);
      setLikesCount(prevCount => userLiked ? prevCount - 1 : prevCount + 1);
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleLikeClick}
        disabled={!isLoggedIn}
        className={userLiked ? "text-red-500" : "text-gray-500"}
      >
        {userLiked ? '❤️' : '♡'}
      </button>
      <span className="ml-2">{likesCount} likes</span>
    </div>
  );
};

Likes.propTypes = {
  item: PropTypes.object.isRequired
};

export default Likes;