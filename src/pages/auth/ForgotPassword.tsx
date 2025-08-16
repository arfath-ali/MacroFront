import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const handleSendResetLinkButton = () => {
    navigate(`/auth/forgot-password/sent?email=${encodeURIComponent(email)}`, {
      replace: true,
    });
  };
  return (
    <div className="flex-center-page">
      <div className="m-3 rounded-[5px] bg-gray-800 p-4">
        <h1 className="text-bold text-center">Forgot Password</h1>
        <p className="text-regular mt-2 mb-4">
          Enter your email to receive a password reset link
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendResetLinkButton();
          }}>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border-default input-default text-medium"
          />
          <button className="btn-auth-main-reset text-semibold">
            Send Reset Link
          </button>
          <NavLink to="/auth" className="text-semibold mt-2 block text-center">
            &larr; Back to Sign In
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
