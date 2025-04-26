import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/contextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loginuser" className="block mb-1">
            Username
          </label>
          <input
            onChange={handleInputChange}
            value={inputs.username}
            type="text"
            id="loginuser"
            name="username"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="loginpassword" className="block mb-1">
            Password
          </label>
          <input
            onChange={handleInputChange}
            value={inputs.password}
            type="password"
            id="loginpassword"
            name="password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;