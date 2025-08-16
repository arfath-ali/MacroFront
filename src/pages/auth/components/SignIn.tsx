import { NavLink } from 'react-router-dom';

const SignIn = () => {
  return (
    <form>
      <label htmlFor="username">Username or Email</label>
      <input
        type="text"
        id="username"
        name="username"
        className="border-default input-default text-medium"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="border-default input-default text-medium"
      />

      <button className="btn-auth-main-signin text-semibold">Sign In</button>

      <NavLink
        to="/auth/forgot-password"
        className="text-semibold mt-2 block text-center">
        Forgot your password?
      </NavLink>
    </form>
  );
};

export default SignIn;
