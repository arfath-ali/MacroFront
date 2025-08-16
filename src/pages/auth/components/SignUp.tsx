const SignUp = () => {
  return (
    <form>
      <label htmlFor="full-name">Full Name</label>
      <input
        type="text"
        id="full-name"
        name="full-name"
        className="border-default input-default text-medium"
      />

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        className="border-default input-default text-medium"
      />

      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        className="border-default input-default text-medium"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        className="border-default input-default text-medium"
      />

      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        className="border-default input-default text-medium"
      />

      <button className="btn-auth-main-signin text-semibold">Sign Up</button>
    </form>
  );
};

export default SignUp;
