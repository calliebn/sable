import React, { useState, useCallback } from "react";
import "./style.css";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";

const LoginForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitFormLogin = useCallback(() => {
    setIsSubmitted(true);
  }, [setIsSubmitted]);

  
  return (
    <>
      <div className="form-container">
        <span className="close-btn">×</span>
        <div className="form-content-left">
        </div>
        {!isSubmitted ? (
          <FormSignup submitForm={submitFormLogin} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default LoginForm;
