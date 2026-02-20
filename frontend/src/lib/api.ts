import { supabase } from "./supabaseClient";

const API_BASE_URL = "http://localhost:5000";

export const api = {
  async signup(userData: any) {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async login(credentials: any) {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async updateUser(userData: any) {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  async deleteUser() {
    const { data: { session } } = await supabase.auth.getSession();
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    return response.json();
  },
};
