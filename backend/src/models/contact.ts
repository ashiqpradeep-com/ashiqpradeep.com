export default interface Contact {
  id?: number;
  full_name: string;
  email: string;
  message?: string;
  created_at: Date;
}
