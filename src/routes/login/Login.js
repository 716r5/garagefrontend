import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGIN_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import Button from "../../components/button/Button";
import { useAuth } from "../../contexts/AuthProvider";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

import axios from 'axios';
import styles from "./Login.module.css";

function Login() {
  const [matric, setMatric] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isDenied, setDenied] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const ROUTE_DESTINATION = (location.state?.to || "/");
  const ROUTE_TITLEHEADING = (location.state?.name || "Member Login");

  const handlePasscodeChange = (e) => {
    const inputPasscode = e.target.value;
    const formattedPasscode = inputPasscode.replace(/\D/g, '').slice(0, 4);
    setPasscode(formattedPasscode);
  };

  const handleSubmit = async () => {
    const config = {
      redirect: "follow",
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    };

    // Security: Removed console.log to prevent credential exposure
    
    // Client-side validation (Note: Server-side validation is also required)
    if (!matric || !passcode) {
      setDenied(true);
      return;
    }

    // Basic matric number validation (format: U1234567XY)
    const matricRegex = /^[Uu]\d{7}[A-Za-z]$/;
    if (!matricRegex.test(matric)) {
      setDenied(true);
      return;
    }

    // Passcode should be exactly 4 digits
    if (passcode.length !== 4) {
      setDenied(true);
      return;
    }
    
    try {
      setLoading(true);

      const response = await axios.post(
        LOGIN_DOMAIN, 
        {matric: matric, passcode:passcode, type:"userdata"}, 
        config,
      );

      // Security: Removed console.log to prevent response data exposure

      setLoading(false);
      
      if (response.data.status === "DATA RETRIEVAL SUCCESSFUL") {
        auth.loginAction(response.data); 
        navigate(ROUTE_DESTINATION);
      } else {
        setDenied(true);
      }
    } catch (error) {
      console.error("Error logging in", error);
      setDenied(true);
      setLoading(false);
    }
  };

  return (
    <Transition>
      <PageTemplate>
        <div className={styles.content}>

          <div className={styles["heading-space"]}>
            <div>
              <Typography variant="heading">{ROUTE_TITLEHEADING}</Typography>
            </div>
            <BackButton to={"/"}/>
          </div>

          <form className={styles["form"]} onSubmit={(e) => {e.preventDefault()}}>

            <div className={styles["form-item"]}>
              <Typography variant="body">{"Matriculation Number:"}</Typography>
                <input
                  className={ (isDenied ?
                    styles["form-input-invalid"]:
                    styles["form-input"]
                  )}
                  type="text" 
                  placeholder="eg. U123456789A"
                  value={matric}
                  onChange={(e) => setMatric(e.target.value)}
                  required
                />
            </div>

            <div className={styles["form-item"]}>
              <Typography variant="body">{"Passcode (DDMM):"}</Typography>
                <input 
                  className={ (isDenied ?
                    styles["form-input-invalid"]:
                    styles["form-input"]
                  )}
                  type="password" 
                  placeholder="eg. 1911"
                  value={passcode}
                  onChange={handlePasscodeChange}
                  required
                  minLength={4}
                />
            </div>
            
            <Typography variant="body" className={(isDenied ? styles["error-message"] : styles["hidden"])}>
              {"Invalid matriculation number or passcode"}
            </Typography>

            {isLoading ? 
                (
                  <LoadingSpinner />
                ) : (
                  <Button onClick={handleSubmit} className={styles['login-btn']}>
                    {"Login"}
                  </Button>
                )
              }
            
          </form>

        </div>
      </PageTemplate>
    </Transition>
  );
}

export default Login;