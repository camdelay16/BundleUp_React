import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AccountInfoForm = (props) => {
  const { user, userData, handleChange, handleSubmit, formHidden } = props;

  return (
    <main>
      <div className="accountInfoCard">
        <div className="accountInfoForm">
          <form>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={userData.username}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address:</label>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={userData.email}
              onChange={handleChange}
            />
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              defaultValue={userData.phoneNumber}
              onChange={handleChange}
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={userData.address}
              placeholder="Enter your address"
              onChange={handleChange}
            />
            <label htmlFor="type">Account Type:</label>
            <select
              name="type"
              id="type"
              defaultValue={userData.type}
              onChange={handleChange}
            >
              <option value="Individual">Individual</option>
              <option value="Vendor">Vendor</option>
            </select>
            <button
              type="submit"
              onClick={handleSubmit}
            >
              Update Account
            </button>
            <button onClick={formHidden}>Cancel</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AccountInfoForm;
