import { useSearchParams, useNavigate, NavLink } from 'react-router-dom';
import GreenCheckIcon from '@/assets/images/icons/green-check-icon.png';

const ResetLinkSent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  return (
    <div className="flex-center-page">
      <div className="mx-2 rounded-[5px] bg-gray-800 p-4">
        <header className="mb-4 text-center">
          <h1 className="text-bold">Check your Email</h1>
          <p className="text-regular">
            We've sent a password reset link to your email
          </p>
        </header>
        <main>
          <article className='flex-col-center-page gap-1'>
            <img src={GreenCheckIcon} className="h-15 w-15" />
            <p className="text-regular">We've sent a password reset link to:</p>
            <div className="w-full rounded-[5px] bg-amber-800 p-4 text-center">
              <p className="text-semibold">{email}</p>
            </div>
            <aside className="text-regular">
              Didn't receive the email? Check your spam folder or try again in a
              few minutes.
            </aside>
          </article>

          <footer>
            <button
              className="btn-auth-main-reset"
              onClick={() =>
                navigate('/auth/forgot-password ', { replace: true })
              }>
              Try Different Email
            </button>

            <NavLink
              to="/auth"
              className="text-semibold mt-2 block text-center">
              &larr; Back to Sign In
            </NavLink>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default ResetLinkSent;
