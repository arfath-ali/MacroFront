import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleResetPasswordButton = () => {
    navigate('/auth/password-reset-success', { replace: true });
  };
  return (
    <div className="flex-center-page">
      <div className="m-3 rounded-[5px] bg-gray-800 p-4">
        <h1 className="text-bold mb-4 text-center">Set New Password</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPasswordButton();
          }}>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            className="border-default input-default text-medium"
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="border-default input-default text-medium"
          />
          <button className="btn-auth-main-reset text-semibold">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
