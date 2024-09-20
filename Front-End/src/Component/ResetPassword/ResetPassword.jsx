import React, { useEffect, useState } from 'react';
import "../ResetPassword/ResetPassword.css";
import { Link, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [correctCode, setCorrectCode] = useState(null);
  const [alertStyle, setAlertStyle] = useState({});
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        setAlertStyle({ transform: 'translateX(350px)', transition: 'all 1s ease-in' });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoader(true);

    const url = "http://aidoctortest.visooft-code.com/api/auth/reset/password";
    const headers = { "Content-Type": "application/json", "Accept": "application/json" };
    const body = { code, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }).then(response => response.json());

      setCorrectCode(response.status);

      if (response.status) {
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }

      setVisible(true);
      setAlertStyle({ transform: 'translateX(0)', transition: 'all 1s ease-in' });
    } catch (err) {
      console.error("Error resetting password:", err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="ResetPassword vh-100" style={{ overflow: visible ? 'hidden' : 'auto', transition: 'all 1s ease-in' }}>
      {visible && (
        <div className={`alert ${correctCode ? 'alert-success' : 'alert-danger'} mt-5 me-3`} style={alertStyle} role="alert">
          {correctCode ? "The password was reset successfully" : "Code is not correct"}
        </div>
      )}
      <div className="container d-flex justify-content-center align-items-center w-100 h-100">
        <div className="block text-center rounded-bottom py-5 px-5 col-12">
          <h2>Reset Password</h2>
          <form onSubmit={sendEmail}>
            <div className="form-group">
              <input
                type="text"
                className="form-control my-4 px-5 py-3"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control my-4 px-5 py-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn mb-3 position-relative" type="submit">
              {loader ? <i className="fa-solid fa-rotate-right fa-spin"></i> : 'Send Code'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
