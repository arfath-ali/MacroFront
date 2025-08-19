import { useEffect, useState } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AuthFeatures from './components/AuthFeatures';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState<boolean | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('authTab');
    if (savedAuth === 'sign-up') setIsSignIn(false);
    else setIsSignIn(true);
  }, []);

  const handleSignInTab = () => {
    setIsSignIn(true);
    localStorage.setItem('authTab', 'sign-in');
  };

  const handleSignUpTab = () => {
    setIsSignIn(false);
    localStorage.setItem('authTab', 'sign-up');
  };

  return (
    <>
      <header className="p-4">
        <h1 className="text-bold text-center text-4xl">MacroFront</h1>
        <p className="tablet:block text-semibold hidden text-center">
          Live markets.Economic insights.Real-time analytics.
        </p>
        <div className="tablet:block hidden">
          <AuthFeatures />
        </div>
      </header>
      <main className="p-4">
        <div className="flex flex-col items-center rounded-[5px] bg-gray-900 p-3">
          <h2 className="text-bold">Welcome to MacroFront</h2>
          <div className="mt-4 flex w-full justify-center rounded-[5px] bg-gray-700 p-1">
            <button
              onClick={() => {
                handleSignInTab();
              }}
              className={`btn-auth-signin text-semibold ${isSignIn ? 'bg-black' : ''}`}>
              Sign In
            </button>
            <button
              onClick={() => {
                handleSignUpTab();
              }}
              className={`btn-auth-signup text-semibold ${!isSignIn ? 'bg-black' : ''}`}>
              Sign Up
            </button>
          </div>
          <div className="mt-4">{isSignIn ? <SignIn /> : <SignUp />}</div>
        </div>
        <div className={!isSignIn ? 'hidden' : 'tablet:hidden mt-10'}>
          <AuthFeatures />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Auth;
