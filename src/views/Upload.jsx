import {useFile, useMedia} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      // implement upload
      const token = window.localStorage.getItem('token');

      const fileResult = await postFile(file, token);
      console.log('fileResult', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaResult', mediaResult);

      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      // TODO: set the file to state
      setFile(evt.target.files[0]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium text-white">
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-white">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="file" className="block text-sm font-medium text-white">
            File
          </label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        
        <div className="flex justify-center">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/600x400?text=Choose+image'
            }
            alt="preview"
            className="h-48 object-contain border rounded-md"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={!(file && inputs?.title.length > 3)}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;