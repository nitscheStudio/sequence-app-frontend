import React, { useState } from "react";
import FileDragAndDrop from "../components/FileDragAndDrop";
import sequenceLogo from "../assets/sequence-logo_new.svg";
import { useForm } from "react-hook-form";
import http from "../utils/http";
import { CgProfile } from "react-icons/cg";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

type FormValues = {
  profile_picture: FileList | null;
};

const UploadProfilePicture = () => {
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<FormValues>();
  const { state } = useLocation();

  const prefilledUsername = state?.username || "";

  const {
    handleSubmit: handleFormSubmit,
    setError,

    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const formData = new FormData();
      formData.append("profile_picture", file!);

      const response = await http.post("/user/edit/profilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/dashboard", {
        state: { profilePictureEdit: true, message: "Profile picture updated" },
      });
    } catch (exception: any) {
      const errors = exception.response.data.errors;

      for (let [fieldName, errorList] of Object.entries(errors)) {
        type Field = "profilePicture";
        const errors = (errorList as any[]).map((message) => ({ message }));
        console.log(fieldName, errors);
        setError(fieldName as "profile_picture", errors[0]);
      }
    }
  };
  const navigate = useNavigate();

  const handleRedirect = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/dashboard", {
      state: { message: "Profile picture edit cancelled" },
    });
  };

  const onError = (error: any) => {
    console.log("Form Error", error);
  };

  return (
    <div className="profile-picture-edit-wrapper">
      <img
        className="sequence-logo-form"
        src={sequenceLogo}
        alt="Sequence Logo"
      />
      <h1 className="h1-icon">
        {/* Welcome: <span className="">{prefilledUsername}</span> <br /> */}
        <CgProfile /> Upload your Profile Picture
      </h1>
      <p>
        We use your profile picture for sample uploads. <br /> The profile
        picture is visible to all users.
      </p>
      <form onSubmit={handleFormSubmit(onSubmit)}>
        <div className="file-upload-wrapper">
          <FileDragAndDrop file={file} setFile={setFile} dataTypes={"image"} />
        </div>
        <p className="error-message">{errors.profile_picture?.message}</p>

        <button
          onClick={handleFormSubmit(onSubmit)}
          disabled={isSubmitting}
          className="submit-btn"
          type="submit"
        >
          Submit
        </button>
        <div className="margin-top-20">
          <button onClick={handleRedirect} className="back-step-btn">
            <FaArrowLeftLong />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadProfilePicture;
