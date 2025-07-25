export type AccountType = "client" | "professionnel" | "";

export interface SignupFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  profession: string;
  siret: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

export interface FormFieldProps {
  formData: SignupFormData;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
}
