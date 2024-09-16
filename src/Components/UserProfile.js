import { useEffect, useState } from "react";
import { User } from "../models/User";

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    birthdate: "",
    country: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const fetchedUser = await User.fetch(userId);
        setUser(fetchedUser);
        const [day, month, year] = fetchedUser.birthdate.split("-");
        const formattedDate = `${year}-${month}-${day}`;
        setFormData({
          username: fetchedUser.username,
          password: fetchedUser.password,
          birthdate: formattedDate,
          country: fetchedUser.country,
          email: fetchedUser.email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const formatDateForStorage = (date) => {
    const [year, month, day] = date.split("-");
    return `${String(day).padStart(2, "0")}-${String(month).padStart(
      2,
      "0"
    )}-${year}`;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValid = validateEmail(formData.email);
    if (!emailValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format.",
      }));
      return;
    }

    setErrors({});

    if (user) {
      user.username = formData.username;
      user.password = formData.password;
      user.birthdate = formatDateForStorage(formData.birthdate);
      user.country = formData.country;
      user.email = formData.email;
      try {
        await user.save();
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
