import { useNavigate } from 'react-router-dom';
import GreenCheckIcon from '@/assets/images/icons/green-check-icon.png';

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-center-page">
      <div className="flex-col-center-page mx-2 gap-4 rounded-[5px] bg-gray-800 p-4">
        <img src={GreenCheckIcon} className="h-15 w-15" />
        <h1 className="text-bold text-center">Password Reset Successfully</h1>
        <p className="text-regular">
          Your password has been reset successfully. You can now sign in with
          your new password.
        </p>

        <button
          className="btn-auth-main-reset"
          onClick={() => navigate('/auth', { replace: true })}>
          Go to Sign In
        </button>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
