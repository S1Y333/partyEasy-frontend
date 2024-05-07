import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoadingToRedirect.scss"

const LoadingToRedirect = () => {
  //count down time to redirect to login page
  const [count, setCount] = useState(3);
  let navigate = useNavigate();

  useEffect(() => {
    //decrease every 1 second
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once count is equal to 0
    count === 0 && navigate("/login");
    //cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="redirect">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
