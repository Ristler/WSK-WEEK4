import {useState} from 'react';
import {Link, useNavigate} from 'react-router';
import PropTypes from 'prop-types';
import {useAuthentication, deleteMedia} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import EditMediaDialog from './EditMediaDialog';

const MediaRow = (props) => {
  const {isLoggedIn} = useAuthentication();
  const {user} = useUserContext();
  const {item, setSelectedItem} = props;
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);

  const isOwner = user && user.user_id === item.user_id;
  const isAdmin = user && user.role === 'admin';
  const showButtons = isLoggedIn && (isOwner || isAdmin);
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      console.log('delete button clicked',item.media_id);
      await deleteMedia(item.media_id, token);
      navigate(0); 
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <>
      <tr className="*:p-4 *:border-2 *:border-[#ccc]">
        <td>
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-52 object-cover"
          />
        </td>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td>{item.username}</td>
        <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
        <td>{item.filesize}</td>
        <td>{item.media_type}</td>
        <td className="p-0!">
          <div className="flex gap-2 *:p-2">
            <Link
              to="/single"
              state={{item}}
              className="hover:bg-amber-300 hover:text-gray-900"
              onClick={(event) => {
                event.preventDefault();
                setSelectedItem(item);
              }}
            >
              View
            </Link>

            {showButtons && (
              <>
                <button
                  type="button"
                  className="hover:bg-sky-400 hover:text-black"
                  onClick={() => setShowEditDialog(true)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="hover:bg-red-500"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
      
      {showEditDialog && (
        <EditMediaDialog 
          item={item}
          onClose={() => setShowEditDialog(false)}
          onSuccess={() => {
            setShowEditDialog(false);
            navigate(0);
          }}
        />
      )}
    </>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;