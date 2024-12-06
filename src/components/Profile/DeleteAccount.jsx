import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const DeleteAccount = (props) => {
  const { user, userData, userId, handleDClick } = props;

  const handleDelete = async () => {
    try {
      const deleteUser = await userService.deleteUser(id);
      deleteUser(userId);
      handleSignout();
      alert("Account deleted.");
      navigate("/");
    } catch (error) {
      alert("Sorry, that didn't work. Try again.");
    }
  };

  return (
    <main>
      <div className="accountInfoCard">
        <div className="deleteInfo">
          <p>
            Are you sure you want to delete your account? This can't be undone.
          </p>
          <button onClick={handleDClick}>No, don't delete</button>
          <button onClick={handleDelete}>Yes, please delete</button>
        </div>
      </div>
    </main>
  );
};

export default DeleteAccount;
