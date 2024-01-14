import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import sequenceLogo from "../assets/sequence-logo.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";
import { useLocation, useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();
  const form = useForm<FormValues>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  // Wenn Nutzer von einer Private Route kam
  // dann wollen wir dahin nach Login zurück
  // Wenn er direkt auf Login klickte, schicken wir
  // den Nutzer an die Homepage
  const { from = "/dashboard" } = state || {};

  // Wird ausgeführt wenn alle Felder korrekt validiert sind
  const onSubmit = async (data: FormValues) => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.post("/login", data);
      // console.log(response);
      const userData = response.data;

      setAuth({
        id: userData.id,
        username: userData.username,
        is_private: userData.is_private,
        profile_picture_path: userData.profile_picture_path,
      });
      console.log(from);
      navigate(from);
    } catch (exception: any) {
      const errors = exception.response.data.errors;

      for (let [fieldName, errorList] of Object.entries(errors)) {
        type Field = "email" | "password" | "root";
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

  return (
    <>
      <img src={sequenceLogo} alt="Sequence Logo" />
      <h1 className="form-headline">Login To Your Account</h1>
      <section className="form-section">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit, onError)}
          noValidate
        >
          <label htmlFor="E-Mail">E-Mail</label>
          <input
            type="email"
            placeholder="Your E-Mail"
            // aria-onInvalid={errors.email ? "true" : "false"}
            {...register("email", {
              required: {
                value: true,
                message: "Please enter an email adress",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          <p className="error-message">{errors.email?.message}</p>

          <label htmlFor="Password">Password:</label>
          <input
            type="password"
            // aria-onInvalid={errors.password ? "true" : "false"}
            {...register("password", {
              required: {
                value: true,
                message: "Please enter a password",
              },
            })}
          />
          <p className="error-message">{errors.password?.message}</p>

          <button disabled={isSubmitting}>Login</button>
          <p>
            Don't have an account yet?{" "}
            <Link to="/register" className="">
              Register
            </Link>
          </p>
        </form>

        <DevTool control={control} />
      </section>
    </>
  );
};

export default Login;
