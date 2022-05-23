import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";

import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  };
  const [user, setUser] = useState(userInfos);
  const { first_name, last_name, email, password, confirmationPassword } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Validation Register
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least 8 characters including an uppercase letter, a lowercase letter, a symbol, and a number"
      )
      .min(8, "Password must be atleast 8 characters.")
      .max(36, "Password can't be more than 36 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Weak Password"
      ),
    confirmationPassword: Yup.string()
      .required("This field is required.")
      .oneOf([Yup.ref("password"), null], "Password don't match"),
  });

  const [dateError, setDateError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");
  const [icon1, setIcon1] = useState(eyeOff);
  const [icon2, setIcon2] = useState(eyeOff);
  const handleToggle1 = () => {
    if (type1 === "password") {
      setIcon1(eye);
      setType1("text");
    } else {
      setIcon1(eyeOff);
      setType1("password");
    }
  };
  const handleToggle2 = () => {
    if (type2 === "password") {
      setIcon2(eye);
      setType2("text");
    } else {
      setIcon2(eyeOff);
      setType2("password");
    }
  };
  return (
    <div className="blur">
      <div className="register scrollbar">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            confirmationPassword,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            registerSubmit();
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="register_form">
                <div className="reg_line">
                  <RegisterInput
                    type="text"
                    placeholder="First name"
                    name="first_name"
                    onChange={handleRegisterChange}
                  />
                  <RegisterInput
                    type="text"
                    placeholder="Last name"
                    name="last_name"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="text"
                    placeholder="Email address"
                    name="email"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_line" style={{ position: "relative" }}>
                  <RegisterInput
                    type={type1}
                    placeholder="New password"
                    name="password"
                    onChange={handleRegisterChange}
                  />

                  <span
                    className="eye"
                    onClick={handleToggle1}
                    style={{ position: "absolute", top: "20px", right: "30px" }}
                  >
                    <Icon icon={icon1} size={20} />
                  </span>
                </div>
                <div className="reg_line" style={{ position: "relative" }}>
                  <RegisterInput
                    type={type2}
                    placeholder="Confirmation password"
                    name="confirmationPassword"
                    onChange={handleRegisterChange}
                  />
                  <span
                    className="eye"
                    onClick={handleToggle2}
                    style={{ position: "absolute", top: "20px", right: "30px" }}
                  >
                    <Icon icon={icon2} size={20} />
                  </span>
                </div>
                <div className="reg_infos">
                  By clicking Sign Up, you agree to our{" "}
                  <span>Terms, Data Policy &nbsp;</span>
                  and <span>Cookie Policy.</span> You may receive SMS
                  notifications from us and can opt out at any time.
                </div>
                <div className="reg_btn_wrapper">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="blue_btn open_signup"
                  >
                    {isValid ? "Sign Up" : "Sign Up"}
                  </button>
                </div>
                <DotLoader color="#1876f2" loading={loading} size={30} />
                {error && <div className="error_text">{error}</div>}
                {success && <div className="success_text">{success}</div>}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
