import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from '../hooks/apiHooks';
import {useState} from 'react';

const Home = () => {
  const {mediaArray} = useMedia();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="px-2">
      <h2 className="text-2xl my-4 font-mono text-white">My Media</h2>
      
      <div className="overflow-x-auto w-full pb-4">
        <table className="w-full table-fixed bg-gray-800">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 border border-gray-600 text-white w-[120px]">Thumbnail</th>
              <th className="p-2 border border-gray-600 text-white w-[15%]">Title</th>
              <th className="p-2 border border-gray-600 text-white w-[20%]">Description</th>
              <th className="p-2 border border-gray-600 text-white w-[10%]">Owner</th>
              <th className="p-2 border border-gray-600 text-white w-[15%]">Created</th>
              <th className="p-2 border border-gray-600 text-white w-[10%]">Size</th>
              <th className="p-2 border border-gray-600 text-white w-[10%]">Type</th>
              <th className="p-2 border border-gray-600 text-white w-[15%]">Actions</th>
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
      </div>
      
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </div>
  );
};

export default Home;