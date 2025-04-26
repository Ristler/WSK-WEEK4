import {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {useMedia} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const EditMediaDialog = ({item, onClose, onSuccess}) => {
  const {modifyMedia} = useMedia();
  const dialogRef = useRef(null);
  
  const initValues = {
    id: item.media_id,
    title: item.title,
    description: item.description
  };

  const doUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await modifyMedia(inputs, token);
      onSuccess();
    } catch (error) {
      console.error('Error updating media', error);
      alert('Failed to update media: ' + error.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpdate, initValues);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }
    
    return () => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog 
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed top-[10%] max-w-lg p-0 rounded-lg shadow-lg backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Media</h2>
          <button 
            onClick={onClose}
            className="text-2xl font-bold hover:text-gray-500"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-medium">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

EditMediaDialog.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default EditMediaDialog;