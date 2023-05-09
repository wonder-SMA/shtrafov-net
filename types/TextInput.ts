export type TTextInput = {
  heading: string;
  id?: string;
  name: string;
  type?: 'text' | 'email';
  placeholder?: string;
  required?: boolean;
  size?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  error?: string;
}
