
import { userSchema } from "./UserValidation";

export const isValidFormData = async (formData) => {
  try {
    await userSchema.validate(formData);
    return true; // Form data is valid
  } catch (error) {
    return false; // Form data is invalid
  }
};

