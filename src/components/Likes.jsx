import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useAuthentication, useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';

const Likes = ({item}) => {
  const [likesCount, setLikesCount] = useState(item.likes_count || 0);
  const [userLiked, setUserLiked] = useState(false);
  const [userLikeId, setUserLikeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const {isLoggedIn} = useAuthentication();
  const {user} = useUserContext();
  const token = localStorage.getItem('token');
  const {postLike, deleteLike, getAllLikes} = useLike();

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setIsLoading(true);

        const allLikes = await getAllLikes();
       
        
        const mediaLikes = allLikes.filter(
          like => parseInt(like.media_id) === parseInt(item.media_id)
        );
        
        setLikesCount(mediaLikes.length);
        

        if (isLoggedIn && user) {
          const userLike = mediaLikes.find(
            like => like.user_id === user.user_id
          );
          
          if (userLike) {
            console.log('User already liked this item:', userLike);
            setUserLiked(true);
            setUserLikeId(userLike.like_id);
          } else {
            setUserLiked(false);
            setUserLikeId(null);
          }
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLikes();
  }, [item.media_id, isLoggedIn, user]);

  const handleLikeClick = async () => {
    if (!isLoggedIn || isLoading) return;
    
    try {
      setIsLoading(true);
      
      if (userLiked) {
        console.log('Deleting like with ID:', userLikeId);
        
        if (!userLikeId) {
          const allLikes = await getAllLikes();
          const existingLike = allLikes.find(
            like => like.user_id === user.user_id && 
                    parseInt(like.media_id) === parseInt(item.media_id)
          );
          
          if (existingLike) {
            console.log('Found like ID for deletion:', existingLike.like_id);
            await deleteLike(existingLike.like_id, token);
          } else {
            console.error('Could not find like to delete');
           
            setUserLiked(false);
          }
        } else {
          await deleteLike(userLikeId, token);
        }
        
        setUserLiked(false);
        setUserLikeId(null);
        setLikesCount(prev => Math.max(0, prev - 1));
      } else {
        try {
          console.log('Posting new like for media:', item.media_id);
          const newLike = await postLike({media_id: item.media_id}, token);
          console.log('Like posted successfully:', newLike);
          setUserLiked(true);
          setUserLikeId(newLike.like_id);
          setLikesCount(prev => prev + 1);
        } catch (error) {
          if (error.message?.includes('already liked')) {
            console.log('User already liked this item, fetching like data');
 
            const allLikes = await getAllLikes();
            const existingLike = allLikes.find(
              like => like.user_id === user.user_id && 
                     parseInt(like.media_id) === parseInt(item.media_id)
            );
            
            if (existingLike) {
              console.log('Found existing like:', existingLike);
              setUserLiked(true);
              setUserLikeId(existingLike.like_id);
            }
          } else {
            throw error;
          }
        }
      }
    } catch (error) {
      console.error('Error updating like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleLikeClick}
        disabled={!isLoggedIn || isLoading}
        className={`${userLiked ? "text-red-500" : "text-gray-500"} 
                   ${isLoading ? "opacity-50 cursor-wait" : "hover:scale-110"} 
                   transition-all text-xl`}
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