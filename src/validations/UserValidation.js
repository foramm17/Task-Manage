import * as yup from "yup";

export const userSchema = yup.object().shape({
  title: yup.string().required("Title is required*"),
  description: yup.string().required("Description is required*"),
  dueDate: yup
    .date()
    .min(new Date(), "Due Date must be in the future")
    .required("Due Date is required*"),
  priority: yup.string().required("Priority is required*"),
  status: yup.string().required("Status is required*"),
});
