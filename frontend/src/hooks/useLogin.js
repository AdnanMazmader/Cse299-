import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Swal from 'sweetalert2'; // Import SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const Swal = require('sweetalert2')

  const login = async (email, password, isAdmin) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, isAdmin }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      Swal.fire({
        icon: 'error', // Use an error icon
        title: 'Login Error',
        text: json.error, // Display the error message from the server
      });
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
      Swal.fire({
        icon: 'success', // Use a success icon
        title: 'Login Successful',
        showConfirmButton: true, // Hide the "OK" button
        //timer: 1500, // Automatically close after 1.5 seconds
      });
    }
  };

  return { login, isLoading, error };
};
