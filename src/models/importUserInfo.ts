export interface UserInfo {
  name: string;
  email: string;
  address: string;
  location: {
    city: string;
    state: string;
  };
  id?: string;
  uid?: string;
  cpf: string;
  rg: string;
  phone: string;
  role: "admin" | "user";
}
