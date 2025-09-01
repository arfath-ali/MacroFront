import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import useUsernameContext from '@/context/UsernameContext';
import useEmailContext from '@/context/EmailContext';
import usePasswordContext from '@/context/PasswordContext';
import axiosInstance from '@/services/api';
import { log } from '@/utils/logger';
import GreenCheckIcon from '@/assets/images/icons/green-check-icon.png';

const SignUp = () => {
  const navigate = useNavigate();

  const fullNameRef = useRef<HTMLInputElement>(null);
  const [fullName, setFullName] = useState('');
  const [isFullNameFieldFocused, setIsFullNameFieldFocused] = useState<
    boolean | null
  >(null);

  const {
    usernameRef,
    username,
    setUsername,
    isUsernameFieldFocused,
    setIsUsernameFieldFocused,
    isUsernameValid,
    usernameError,
    isSearchingUsername,
    isUsernameAvailable,
    resetUsernameState,
  } = useUsernameContext();

  const {
    emailRef,
    email,
    setEmail,
    isEmailFieldFocused,
    setIsEmailFieldFocused,
    isEmailValid,
    emailError,
    resetEmailState,
  } = useEmailContext();

  const {
    passwordRef,
    password,
    setPassword,
    isPasswordValid,
    isPasswordFieldFocused,
    setIsPasswordFieldFocused,
    passwordError,
    confirmPasswordRef,
    confirmPassword,
    setConfirmPassword,
    isConfirmPasswordMatched,
    isConfirmPasswordFieldFocused,
    setIsConfirmPasswordFieldFocused,
    confirmPasswordError,
    resetPasswordState,
  } = usePasswordContext();

  const [isAnyFieldFocused, setIsAnyFieldFocused] = useState<boolean | null>(
    null,
  );

  const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  useEffect(() => {
    resetUsernameState();
    resetEmailState();
    resetPasswordState();
  }, []);

  useEffect(() => {
    if (
      isFullNameFieldFocused ||
      isUsernameFieldFocused ||
      isEmailFieldFocused ||
      isPasswordFieldFocused ||
      isConfirmPasswordFieldFocused
    ) {
      setIsAnyFieldFocused(true);
      return;
    } else {
      setIsAnyFieldFocused(false);
      return;
    }
  }, [
    isFullNameFieldFocused,
    isUsernameFieldFocused,
    isEmailFieldFocused,
    isPasswordFieldFocused,
    isConfirmPasswordFieldFocused,
  ]);

  useEffect(() => {
    if (isUsernameAvailable) {
      setSignUpError('');
    } else if (isUsernameAvailable === false) {
      setSignUpError('Username is already taken.');
    }
  }, [isUsernameAvailable]);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSignUpButtonClicked(true);

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setSignUpError('All fields are required.');
      return;
    }

    if (!fullName) {
      fullNameRef.current?.focus();
      return;
    }

    if (
      !username ||
      isUsernameValid === false ||
      isUsernameAvailable === false
    ) {
      usernameRef.current?.focus();

      if (isUsernameAvailable === false)
        setSignUpError('Username is already taken.');
      return;
    }

    if (!email || isEmailValid === false) {
      emailRef.current?.focus();
      return;
    }

    if (!password || isPasswordValid === false) {
      passwordRef.current?.focus();
      return;
    }

    if (!confirmPassword || isConfirmPasswordMatched === false) {
      confirmPasswordRef.current?.focus();
      return;
    }

    if (
      isUsernameAvailable &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordMatched
    ) {
      setSignUpError('');
      setSignUpLoading(true);

      try {
        const response = await axiosInstance.post('/users/create', {
          fullName,
          username,
          email,
          password,
        });

        log(response?.data?.message);

        resetUsernameState();
        resetEmailState();
        resetPasswordState();

        setTimeout(() => {
          setSignUpLoading(false);
          setIsSignUpButtonClicked(false);
          navigate('/home', { replace: true });
        }, 1500);
      } catch (err: any) {
        setSignUpError(err.response.data?.error);
      }
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSignUp(e);
      }}>
      {signUpError && (
        <p id="signUpError" role="alert">
          {signUpError}
        </p>
      )}

      <div>
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          name="full-name"
          ref={fullNameRef}
          onFocus={() => setIsFullNameFieldFocused(true)}
          onChange={(e) => {
            setFullName(e.target.value);
            setSignUpError('');
            setIsSignUpButtonClicked(false);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              if (fullName === '' || fullName.endsWith(' ')) e.preventDefault();
            }
          }}
          onBlur={() => {
            setIsFullNameFieldFocused(false);
            setFullName(fullName.trim());
          }}
          value={fullName}
          className="input-default text-medium border hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700"
        />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <div>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              ref={usernameRef}
              aria-describedby="usernameError"
              onFocus={() => setIsUsernameFieldFocused(true)}
              onChange={(e) => {
                setUsername(e.target.value);
                setSignUpError('');
                setIsSignUpButtonClicked(false);
              }}
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
              onBlur={() => {
                setIsUsernameFieldFocused(false);
              }}
              value={username}
              className={`username-input-default text-medium border ${
                isUsernameValid === false && isUsernameFieldFocused === false
                  ? 'border-red-600'
                  : 'hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700'
              } `}
            />
            <div className="absolute top-3 right-2 flex items-center">
              {isSearchingUsername ? (
                <>
                  <ClipLoader size={15} color="#4F46E5" />
                  <span className="sr-only" aria-live="polite">
                    Checking username availability
                  </span>
                </>
              ) : isUsernameAvailable ? (
                <>
                  <img
                    src={GreenCheckIcon}
                    alt="Username available"
                    className="h-[15px] w-[15px]"
                  />
                  <span className="sr-only" aria-live="polite">
                    Username available
                  </span>
                </>
              ) : null}
            </div>
          </div>
          <p id="usernameError" aria-live="polite" aria-atomic="true">
            {(isUsernameValid === false &&
              !isAnyFieldFocused &&
              isUsernameFieldFocused === false) ||
            (isSignUpButtonClicked && isUsernameFieldFocused)
              ? usernameError
              : ''}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            aria-describedby="emailError"
            onFocus={() => setIsEmailFieldFocused(true)}
            onChange={(e) => {
              setEmail(e.target.value);
              setSignUpError('');
              setIsSignUpButtonClicked(false);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => {
              setIsEmailFieldFocused(false);
            }}
            value={email}
            className="input-default text-medium border hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700"
          />
          <p id="emailError" aria-live="polite">
            {!isAnyFieldFocused && email && !isEmailFieldFocused
              ? emailError
              : ''}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            aria-describedby="passwordError"
            onFocus={() => setIsPasswordFieldFocused(true)}
            onChange={(e) => {
              setPassword(e.target.value);
              setSignUpError('');
              setIsSignUpButtonClicked(false);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => {
              setIsPasswordFieldFocused(false);
            }}
            value={password}
            className="input-default text-medium border hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700"
          />
          <p id="passwordError" aria-live="polite">
            {!isAnyFieldFocused && password && !isPasswordFieldFocused
              ? passwordError
              : ''}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            ref={confirmPasswordRef}
            aria-describedby="confirmPasswordError"
            onFocus={() => setIsConfirmPasswordFieldFocused(true)}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setSignUpError('');
              setIsSignUpButtonClicked(false);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => {
              setIsConfirmPasswordFieldFocused(false);
            }}
            value={confirmPassword}
            className="input-default text-medium border hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700"
          />

          <p id="confirmPasswordError" aria-live="polite">
            {!isAnyFieldFocused &&
            confirmPassword &&
            !isConfirmPasswordFieldFocused
              ? confirmPasswordError
              : ''}
          </p>
        </div>
      </div>

      <button type="submit" className="btn-auth-main-signin text-semibold">
        {signUpLoading ? <ClipLoader size={30} /> : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUp;
