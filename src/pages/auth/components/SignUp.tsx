import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import useUsernameContext from '@/context/UsernameContext';
import usePasswordContext from '@/context/PasswordContext';
import axiosInstance from '@/services/api';
import { log } from '@/utils/logger';
import GreenCheckIcon from '@/assets/images/icons/green-check-icon.png';

const SignUp = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [isFullNameFieldFocused, setIsFullNameFieldFocused] = useState<
    boolean | null
  >(null);

  const {
    username,
    setUsername,
    isUsernameFieldFocused,
    setIsUsernameFieldFocused,
    usernameError,
    isSearchingUsername,
    isUsernameAvailable,
    resetUsernameState,
  } = useUsernameContext();

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isEmailFieldFocused, setIsEmailFieldFocused] = useState<
    boolean | null
  >(null);
  const [emailError, setEmailError] = useState('');

  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');

  const {
    password,
    setPassword,
    isPasswordValid,
    isPasswordFieldFocused,
    setIsPasswordFieldFocused,
    passwordError,
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

  const validateEmail = (emailValue: string | null) => {
    if (!emailValue) return;

    setEmail(emailValue);

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValidity: boolean = regex.test(emailValue);

    if (emailValidity) {
      setIsEmailValid(true);
      setEmailError('');
      return;
    } else {
      setIsEmailValid(false);
      setEmailError('Please enter a valid email address.');
      return;
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setSignUpError('All fields are required.');
      return;
    }

    if (isUsernameAvailable === false) {
      setSignUpError('Username is already taken.');
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
        resetPasswordState();

        setTimeout(() => {
          setSignUpLoading(false);
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
      {signUpError && <p>{signUpError}</p>}

      <label htmlFor="full-name">Full Name</label>
      <input
        type="text"
        id="full-name"
        name="full-name"
        onFocus={() => setIsFullNameFieldFocused(true)}
        onChange={(e) => setFullName(e.target.value)}
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
        className="border-default input-default text-medium"
      />

      <div>
        <label htmlFor="username">Username</label>
        <div>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              onFocus={() => setIsUsernameFieldFocused(true)}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === ' ') e.preventDefault();
              }}
              onBlur={() => setIsUsernameFieldFocused(false)}
              value={username}
              className="border-default username-input-default text-medium"
            />
            <div className="absolute top-3 right-2 flex items-center">
              {isSearchingUsername ? (
                <ClipLoader size={15} color="#4F46E5" />
              ) : isUsernameAvailable ? (
                <img src={GreenCheckIcon} className="h-[15px] w-[15px]" />
              ) : null}
            </div>
          </div>
          {!isAnyFieldFocused && username && !isUsernameFieldFocused && (
            <p>{usernameError}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            onFocus={() => setIsEmailFieldFocused(true)}
            onChange={(e) => validateEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => setIsEmailFieldFocused(false)}
            value={email}
            className="border-default input-default text-medium"
          />
          {!isAnyFieldFocused && email && !isEmailFieldFocused && (
            <p>{emailError}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            onFocus={() => setIsPasswordFieldFocused(true)}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => setIsPasswordFieldFocused(false)}
            value={password}
            className="border-default input-default text-medium"
          />
          {!isAnyFieldFocused && password && !isPasswordFieldFocused && (
            <p>{passwordError}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            onFocus={() => setIsConfirmPasswordFieldFocused(true)}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === ' ') e.preventDefault();
            }}
            onBlur={() => setIsConfirmPasswordFieldFocused(false)}
            value={confirmPassword}
            className="border-default input-default text-medium"
          />
          {!isAnyFieldFocused &&
            confirmPassword &&
            !isConfirmPasswordFieldFocused && <p>{confirmPasswordError}</p>}
        </div>
      </div>

      <button className="btn-auth-main-signin text-semibold">
        {signUpLoading ? <ClipLoader size={30} /> : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUp;
