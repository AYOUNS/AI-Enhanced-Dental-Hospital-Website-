import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import "../ForgetPassword/ForgetPassword.css";
import ResetPassword from '../ResetPassword/ResetPassword';

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [correctEmail, setCorrectEmail] = useState(null);
    const [alertStyle, setAlertStyle] = useState({});
    const [loader, setLoader] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const resetAlert = useCallback(() => {
        setVisible(false);
        setAlertStyle({
            transform: 'translateX(350px)',
            transition: 'all 1s ease-in',
        });
    }, []);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                resetAlert();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [visible, resetAlert]);

    const sendEmail = async (e) => {
        e.preventDefault();
        setLoader(true);

        const url = "http://aidoctortest.visooft-code.com/api/auth/forgot/password";
        const headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
        const body = JSON.stringify({ email });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers,
                body,
            });
            const result = await response.json();

            setCorrectEmail(result.status);
            if (result.errors) {
                setError(result.message);
            }

            if (result.status) {
                setTimeout(() => {
                    navigate('/resetPassword');
                }, 5000);
            }

        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoader(false);
            setAlertStyle({
                transform: 'translateX(0)',
                transition: 'all 1s ease-in',
            });
            setVisible(true);
        }
    };

    return (
        <div className="ForgetPassword vh-100" style={{ overflow: visible ? 'auto' : 'hidden' }}>
            {correctEmail !== null && (
                <div
                    className={`alert mt-5 me-3 ${correctEmail ? 'alert-success' : 'alert-danger'}`}
                    style={alertStyle}
                    role="alert"
                >
                    {correctEmail ? 'The code has been sent to your email' : error}
                </div>
            )}
            <div className="container d-flex justify-content-center align-items-center w-100 h-100">
                <div className="block text-center rounded-bottom py-5 px-5 col-12">
                    <h2>Forget Password</h2>
                    <form onSubmit={sendEmail}>
                        <div>
                            <input
                                type="email"
                                className="form-control d-block my-4 px-5 py-3 inp"
                                id="staticEmail2"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="btn mb-3 position-relative" type="submit">
                                {loader ? <i className="fa-solid fa-rotate-right fa-spin"></i> : 'Send Code'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
