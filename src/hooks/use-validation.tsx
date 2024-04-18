import { useState } from "react";

const useValidation = () => {
  const [formValid, setFormValid] = useState(false);

  return {
    isFormValid: formValid,
  };
};

export default useValidation;
