import { ErrMessageKeys, ValidationRules } from "../../utils/validation";

export const useDishForm = () => {
  const validationRules: ValidationRules = {
    name: { required: true },
    preparationTiome: { required: true },
    type: { required: true },
  };

  const errorMessageKeys: ErrMessageKeys = {
    name: "Required",
    preparationTiome: "Required",
    type: "Required",
  };

  return {
    rules: validationRules,
    errMessage: errorMessageKeys,
  };
};
