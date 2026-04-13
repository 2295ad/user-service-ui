import { useState } from "react";
import { apiRequest } from "../apiRequest";

export default function UserForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

    const formatDate = (value) => {
        const date = new Date(value);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");

        return `${yyyy}-${mm}-${dd}`;
    };

    const createUser = async (payload) => {
        try {
            const resp = await apiRequest(`/customer-service/user/v1/register`,"POST",payload);
            console.log(resp?.success);
            setFirstName("");
            setLastName("");
            setDob("");
            } catch (err) {
              console.error(err);
        }
    };

  const handleSubmit = async() => {
    
    const userData = {
      firstName,
      lastName,
      dateOfBirth: dob,
    };

    await createUser(userData);
  };

  return (
    <div style={{ padding: "80px", textAlign: "center",    border: "5px solid black"}}>
      <h3>User Form</h3>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(formatDate(e.target.value))}
        />
      </div>

      <button onClick={handleSubmit} style={{ padding: "6px 12px" }}>
        Register
      </button>
    </div>
  );
}

