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
  const [fullNameError, setFullNameError] = useState('');

  const {
    usernameRef,
    username,
    setUsername,
    setIsUsernameFieldFocused,
    isUsernameValid,
    usernameError,
    setUsernameError,
    isSearchingUsername,
    isUsernameAvailable,
    resetUsernameState,
  } = useUsernameContext();

  const {
    emailRef,
    email,
    setEmail,
    setIsEmailFieldFocused,
    isEmailValid,
    emailError,
    setEmailError,
    resetEmailState,
  } = useEmailContext();

  const {
    passwordRef,
    password,
    setPassword,
    isPasswordValid,
    setIsPasswordFieldFocused,
    passwordError,
    setPasswordError,
    confirmPasswordRef,
    confirmPassword,
    setConfirmPassword,
    isConfirmPasswordMatched,
    setIsConfirmPasswordFieldFocused,
    confirmPasswordError,
    setConfirmPasswordError,
    resetPasswordState,
  } = usePasswordContext();

  const fields = [
    { value: fullName, ref: fullNameRef, setError: setFullNameError },
    {
      value: username,
      ref: usernameRef,
      setError: setUsernameError,
      valid: isUsernameValid,
      available: isUsernameAvailable,
    },
    {
      value: email,
      ref: emailRef,
      setError: setEmailError,
      valid: isEmailValid,
    },
    {
      value: password,
      ref: passwordRef,
      setError: setPasswordError,
      valid: isPasswordValid,
    },
    {
      value: confirmPassword,
      ref: confirmPasswordRef,
      setError: setConfirmPasswordError,
      valid: isConfirmPasswordMatched,
    },
  ];

  const [isSignUpButtonClicked, setIsSignUpButtonClicked] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  useEffect(() => {
    resetFullNameState();
    resetUsernameState();
    resetEmailState();
    resetPasswordState();
  }, []);

  const resetFullNameState = () => {
    if (fullNameRef.current) fullNameRef.current.value = '';
    setFullName('');
    setFullNameError('');
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSignUpButtonClicked(true);

    let hasFocused = false;

    for (const field of fields) {
      if (!field.value) {
        field.setError('This field is required');

        if (!hasFocused) {
          field.ref.current?.focus();
          hasFocused = true;
        }
      }
    }

    if (hasFocused) return;

    if (
      isUsernameAvailable &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordMatched
    ) {
      setSignUpLoading(true);

      try {
        const response = await axiosInstance.post('/users/create', {
          fullName,
          username,
          email,
          password,
        });

        log(response?.data?.message);

        resetFullNameState();
        resetUsernameState();
        resetEmailState();
        resetPasswordState();

        setTimeout(() => {
          setSignUpLoading(false);
          setIsSignUpButtonClicked(false);
          navigate('/home', { replace: true });
        }, 1500);
      } catch {
        setSignUpError('Something went wrong. Please try again.');
        setSignUpLoading(false);
        setIsSignUpButtonClicked(false);
      }
      return;
    }
  };

  return (
    <form
      onSubmit={(e) => {
        handleSignUp(e);
      }}>
      {signUpError && <p aria-live="polite">{signUpError}</p>}
      <div>
        <label htmlFor="full-name">Full Name</label>
        <div>
          <input
            type="text"
            id="full-name"
            name="full-name"
            ref={fullNameRef}
            aria-describedby="fullNameError"
            onChange={(e) => {
              setFullName(e.target.value);
              if (isSignUpButtonClicked && e.target.value.trim() === '') {
                setFullNameError('This field is required.');
              } else setFullNameError('');
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                if (fullName === '' || fullName.endsWith(' '))
                  e.preventDefault();
              }
            }}
            onBlur={() => {
              setFullName(fullName.trim());
            }}
            value={fullName}
            className={`input-default text-medium border ${
              fullNameError
                ? 'border-red-600'
                : 'hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700'
            } `}
          />
          <p id="fullNameError" aria-live="polite">
            {fullNameError ? fullNameError : ''}
          </p>
        </div>
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
                if (isSignUpButtonClicked && e.target.value.trim() === '') {
                  setUsernameError('This field is required.');
                } else setUsernameError('');
              }}
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
              onBlur={() => {
                setIsUsernameFieldFocused(false);
              }}
              value={username}
              className={`username-input-default text-medium border ${
                usernameError
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
            {usernameError ? usernameError : ''}
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
              if (isSignUpButtonClicked && e.target.value.trim() === '') {
                setEmailError('This field is required.');
              } else setEmailError('');
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => {
              setIsEmailFieldFocused(false);
            }}
            value={email}
            className={`input-default text-medium border ${
              emailError
                ? 'border-red-600'
                : 'hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700'
            } `}
          />
          <p id="emailError" aria-live="polite">
            {emailError ? emailError : ''}
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
              if (isSignUpButtonClicked && e.target.value.trim() === '') {
                setPasswordError('This field is required.');
              } else setPasswordError('');
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => {
              setIsPasswordFieldFocused(false);
            }}
            value={password}
            className={`input-default text-medium border ${
              passwordError
                ? 'border-red-600'
                : 'hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700'
            } `}
          />
          <p id="passwordError" aria-live="polite">
            {passwordError ? passwordError : ''}
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
              if (isSignUpButtonClicked && e.target.value.trim() === '') {
                setConfirmPasswordError('This field is required.');
              } else setConfirmPasswordError('');
            }}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => {
              setIsConfirmPasswordFieldFocused(false);
            }}
            value={confirmPassword}
            className={`input-default text-medium border ${
              confirmPasswordError
                ? 'border-red-600'
                : 'hover:border-gray-400 dark:border-gray-400 dark:hover:border-gray-700'
            } `}
          />

          <p id="confirmPasswordError" aria-live="polite">
            {confirmPasswordError ? confirmPasswordError : ''}
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
