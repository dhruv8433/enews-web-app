// src/types/formData.types.ts
export interface FormDataType {
  name?: string;         // optional because you do `userData.name || ""`
  email: string;
  password: string;
  phone_no?: string;     // optional because you do `userData.phone_no || ""`
  avatar?: File;         // optional, because it may or may not be provided
}
