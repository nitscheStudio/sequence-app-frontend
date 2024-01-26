import { useForm } from "react-hook-form";
import http from "../utils/http";
import { useState } from "react";
import { Sample } from "../types/sample";

type EditSampleProps = {
  sampleId: number;
};

const EditSample = ({ sampleId }: EditSampleProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [sampleData, setSampleData] = useState<Sample | null>(null);
  //Fetch Sample from database
  const getSampleInfo = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.get(`/sample/${sampleId}`);
    } catch (error) {}
  };

  return <div>EditSample</div>;
};

export default EditSample;
