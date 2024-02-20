import { set, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import http from "../utils/http";
import { useLocation, useNavigate } from "react-router-dom";

//Context
import { AuthContext } from "../context/AuthProvider";

//Icon & Image Imports
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import sequenceLogo from "../assets/sequence-logo_new.svg";

type FormValues = {
  login: string;
  password: string;
};

const Login = () => {
  const { auth, setAuth, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const prefilledUsername = state?.username || "";
  const form = useForm<FormValues>();
  const {
    setValue,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const location = useLocation();
  const logoutSuccessful = location.state?.logoutSuccessful;

  const { accountCreated, username, profilePictureAdded } =
    location.state || {};
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  // Wenn Nutzer von einer Private Route kam
  // dann wollen wir dahin nach Login zurück
  // Wenn er direkt auf Login klickte, schicken wir
  // den Nutzer an die Homepage
  const { from = "/dashboard" } = state || {};

  useEffect(() => {
    setValue("login", prefilledUsername); // Prefill the username
  }, [prefilledUsername, setValue]);

  // Wird ausgeführt wenn alle Felder korrekt validiert sind
  const onSubmit = async (data: FormValues) => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post("/login", {
        login: data.login,
        password: data.password,
      });
      // console.log(response);
      const userData = response.data;

      setAuth({
        id: userData.user.id,
        username: userData.user.username,
        is_private: userData.user.is_private,
        profile_picture_path: userData.user.profile_picture_path,
        samplesCount: userData.user.SamplesCount,
      });

      navigate(from);
    } catch (exception: any) {
      const errors = exception.response.data.errors;

      for (let [fieldName, errorList] of Object.entries(errors)) {
        type Field = "login" | "password" | "root";
        const errors = (errorList as any[]).map((message) => ({ message }));
        console.log(fieldName, errors);
        setError(fieldName as Field, errors[0]);
      }
    }
  };
  // Wird ausgeführt wenn Fehler vorhanden sind
  const onError = () => {
    console.log("Form error");
  };

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setPasswordIsVisible(!passwordIsVisible);
  };

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      // Redirect to dashboard or another appropriate page
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <main>
      <section className="login-section">
        <div className="login-wrapper">
          <img
            className="sequence-logo-form"
            src={sequenceLogo}
            alt="Sequence Logo"
          />
          {accountCreated && username && (
            <div className="success-message">
              Welcome to Sequence, {username}.
            </div>
          )}

          {/* Display success message if logout was successful */}
          {logoutSuccessful && (
            <div className="success-message">
              Logout successful. Please login again.
            </div>
          )}
          <h1 className="form-headline">Login To Your Account</h1>
          <section className="form-section">
            <form
              className="form"
              onSubmit={handleSubmit(onSubmit, onError)}
              noValidate
            >
              <label htmlFor="E-Mail">E-Mail or Username:</label>
              <input
                type="text"
                {...register("login", {
                  required: "Please enter an email or username",
                })}
              />
              <p className="error-message">{errors.login?.message}</p>

              <label htmlFor="Password">Password:</label>
              <div className="input-container">
                <input
                  type={!passwordIsVisible ? "password" : "text"}
                  // aria-onInvalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter a password",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-visibility"
                >
                  {!passwordIsVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              </div>

              <p className="error-message">{errors.password?.message}</p>
              <p className="error-message">{errors.root?.message}</p>

              <button
                className="submit-btn margin-auto-center"
                disabled={isSubmitting}
              >
                Login
              </button>
              <p>
                Don't have an account yet?
                <Link to="/register" className="margin-l-s">
                  Register
                </Link>
              </p>
            </form>

            <DevTool control={control} />
          </section>
        </div>
      </section>
    </main>
  );
};

export default Login;
