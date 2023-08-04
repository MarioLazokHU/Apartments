import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../services/actions";

const Login = React.memo(({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://devora-test-api.codeesa.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.status === 201) {
        const responseData = await response.json();

        dispatch(setUser(responseData.user, responseData.accessToken));
        setLoginSuccess(true);
      } else {
        setIsError(true);
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsError(true);
      setErrorMessage("Login failed. Please try again later.");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-1 w-full"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-1 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-1 px-2 rounded"
      >
        Login
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="bg-red-500 text-white py-1 px-2 rounded ml-2"
      >
        Cancel
      </button>
    </form>
  );

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loginSuccess, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {loginSuccess ? (
          <p>Login success...</p>
        ) : (
          renderForm()
        )}
        {isError && <div className="text-red-500 mt-2">{errorMessage}</div>}
      </div>
    </div>
  );
});

export default Login;
