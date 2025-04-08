const SingleView = (props) => {
    const {item, setSelectedItem} = props;
  
    const handleClick = () => {
      setSelectedItem(null);
    };
    return (

      <>
        {item && (
          <dialog open>
            <button onClick={handleClick}>&#10005;</button>
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
    );
  };
  export default SingleView;
