import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleLogout} = useUserContext();

  return (
    <div>
      <header>
        <h1 className="text-4xl mb-4">My App</h1>
        <nav>
          <ul className="flex justify-end list-none p-2 mb-2 bg-[#333]">
            <li className="p-4 hover:bg-[#111]">
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="p-4 hover:bg-[#111]">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="p-4 hover:bg-[#111]">
                  <Link to="/upload">Upload</Link>
                </li>
                <li className="p-4 hover:bg-[#111]">
                  <button 
                    onClick={handleLogout} 
                    className="text-white bg-transparent border-0 p-0 m-0 cursor-pointer font-inherit text-inherit"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="p-4 hover:bg-[#111]">
                  <Link to="/login">Login</Link>
                </li>
                <li className="p-4 hover:bg-[#111]">
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;