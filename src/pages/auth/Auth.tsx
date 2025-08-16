import { useState } from 'react';
import AuthFeatures from './components/AuthFeatures';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <header className="p-4">
        <h1 className="text-bold text-center text-4xl">MacroFront</h1>
        <p className="tablet:block text-semibold hidden">
          Live markets.Economic insights.Real-time analytics.
        </p>
        <div className="tablet:block hidden">
          <AuthFeatures />
        </div>
      </header>
      <main className="p-4">
        <div className="flex flex-col items-center rounded-[5px] bg-gray-900 p-3">
          <h2 className="text-bold">Welcome to MacroFront</h2>
          <div className="mt-1 flex w-full justify-center rounded-[5px] bg-gray-700 p-1">
            <button
              onClick={() => {
                setIsSignIn(true);
                setIsSignUp(false);
              }}
              className={`btn-auth-signin text-semibold ${isSignIn ? 'bg-black' : ''}`}>
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignIn(false);
                setIsSignUp(true);
              }}
              className={`btn-auth-signup text-semibold ${isSignUp ? 'bg-black' : ''}`}>
              Sign Up
            </button>
          </div>
        </div>
        <div className={isSignUp ? 'hidden' : 'tablet:hidden'}>
          <AuthFeatures />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Auth;
