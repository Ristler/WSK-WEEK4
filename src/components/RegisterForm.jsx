import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    try {
      const userResult = await postUser(inputs);
      console.log(userResult);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  return (
    <div className="max-w-md mx-auto mt-8 p-4">
      <h1 className="text-2xl mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="registeruser" className="block mb-1">Username</label>
          <input
            onChange={handleInputChange}
            value={inputs.username}
            type="text"
            id="registeruser"
            name="username"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="registeremail" className="block mb-1">Email</label>
          <input
            onChange={handleInputChange}
            value={inputs.email}
            type="email"
            id="registeremail"
            name="email"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="registerpassword" className="block mb-1">Password</label>
          <input
            onChange={handleInputChange}
            value={inputs.password}
            type="password"
            id="registerpassword"
            name="password"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;