import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);

  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, [getUserByToken]);

  console.log('user', user);
  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-white">Profile</h2>
      {user ? (
        <div className="bg-gray-700 rounded shadow-md p-4 space-y-3 border border-gray-600">
          <p className="border-b border-gray-600 pb-2 text-white">
            <span className="font-semibold">Username: </span>
            {user.username}
          </p>
          <p className="border-b border-gray-600 pb-2 text-white">
            <span className="font-semibold">Email: </span>
            {user.email}
          </p>
          <p className="text-white">
            <span className="font-semibold">Register Date: </span>
            {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </div>
      ) : (
        <p className="text-white font-medium p-4 bg-gray-700 rounded shadow">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;