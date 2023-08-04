import React, { useState, memo } from 'react';
import Login from './Login';

const Registration = memo(({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://devora-test-api.codeesa.com/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      });

      if (response.ok) {
        setIsSuccessModalVisible(true);
        setIsErrorModalVisible(false);
      } else {
        console.error('Registration failed with status:', response.status);
        setIsErrorModalVisible(true);
        setIsSuccessModalVisible(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setIsErrorModalVisible(true);
      setIsSuccessModalVisible(false);
    }
  };

  const handleClose = () => {
    setIsSuccessModalVisible(false);
    setIsErrorModalVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        {isSuccessModalVisible ? (
          <>
            <h2 className="text-xl font-semibold mb-4">Registration success. Please login!</h2>
            <Login onClose={handleClose} />
          </>
        ) : (
          <form onSubmit={handleRegistration}>
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
            <div className="mb-3">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border rounded p-1 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-1 px-2 rounded">
              Register
            </button>
            <button type="button" onClick={handleClose} className="bg-red-500 text-white py-1 px-2 rounded ml-2">
              Cancel
            </button>
          </form>
        )}
        {isErrorModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-md">
              <p>Registration error. Try again!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Registration;
