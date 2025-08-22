import { useEffect, useState } from 'react';
import useUsernameContext from '@/context/UsernameContext';
import usePasswordContext from '@/context/PasswordContext';
import axiosInstance from '@/services/api';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [isFullNameFieldFocused, setIsFullNameFieldFocused] = useState<
    boolean | null
  >(null);

  const {
    username,
    setUsername,
    isUsernameValid,
    isUsernameFieldFocused,
    setIsUsernameFieldFocused,
    usernameError,
    isUsernameAvailable,
    resetUsernameState,
  } = useUsernameContext();

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isEmailFieldFocused, setIsEmailFieldFocused] = useState<
    boolean | null
  >(null);
  const [emailError, setEmailError] = useState('');

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
    } else setIsAnyFieldFocused(false);
  }, [
    isFullNameFieldFocused,
    isUsernameFieldFocused,
    isEmailFieldFocused,
    isPasswordFieldFocused,
    isConfirmPasswordFieldFocused,
  ]);

  const validateEmail = (emailValue: string | null) => {
    if (!emailValue) return;

    setEmail(emailValue);

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailValidity: boolean = regex.test(emailValue);

    if (emailValidity) {
      setIsEmailValid(true);
      setEmailError('');
    } else {
      setIsEmailValid(false);
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password || !confirmPassword)
      setSignUpError('All fields are required.');

    if (isUsernameValid && !isUsernameAvailable) {
      console.log(isUsernameAvailable);
      console.log(isUsernameValid);
      setSignUpError('Username is already taken.');
    }

    if (
      isUsernameValid &&
      isUsernameAvailable &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordMatched
    ) {
      setSignUpError('');
      await axiosInstance.post('/users/create', {
        fullName,
        username,
        email,
        password,
      });

      resetUsernameState();
      resetPasswordState();
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
        onBlur={() => setIsFullNameFieldFocused(false)}
        value={fullName}
        className="border-default input-default text-medium"
      />

      <div>
        <label htmlFor="username">Username</label>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            onFocus={() => setIsUsernameFieldFocused(true)}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setIsUsernameFieldFocused(false)}
            value={username}
            className="border-default input-default text-medium"
          />
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
            onBlur={() => setIsConfirmPasswordFieldFocused(false)}
            value={confirmPassword}
            className="border-default input-default text-medium"
          />
          {!isAnyFieldFocused &&
            confirmPassword &&
            !isConfirmPasswordFieldFocused && <p>{confirmPasswordError}</p>}
        </div>
      </div>

      <button className="btn-auth-main-signin text-semibold">Sign Up</button>
    </form>
  );
};

export default SignUp;
