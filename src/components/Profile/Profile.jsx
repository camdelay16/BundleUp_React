import { React, useState } from "react";
import * as userService from "../../services/userService";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import "./Profile.css";
import DeleteAccount from "./DeleteAccount";
import AccountInfoForm from "./AccountInfoForm";

const Profile = (props) => {
  const { userData, setUser, setUserData, handleSignout } = props;
  const userId = userData._id;
  const navigate = useNavigate;
  const [isAccountInformationVis, setIsAccountInformationVis] = useState(false);
  const [isAIFormVisible, setIsAIFormVisible] = useState(false);
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: `${userData.username}`,
    email: `${userData.email}`,
    phoneNumber: `${userData.phoneNumber}`,
    address: `${userData.address}`,
    type: `${userData.type}`,
  });

  const handleAIClick = () => {
    isAccountInformationVis
      ? setIsAccountInformationVis(false)
      : setIsAccountInformationVis(true);
    setIsAIFormVisible(false);
    setIsDeleteVisible(false);
  };

  const formVisible = () => {
    isAIFormVisible ? setIsAIFormVisible(false) : setIsAIFormVisible(true);
    setIsAccountInformationVis(false);
    setIsDeleteVisible(false);
  };

  const formHidden = () => {
    setIsAIFormVisible(false);
    setIsAccountInformationVis(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await userService.update(userId, formData);
      setUser(newUserResponse.user);
      setIsAIFormVisible(false);
      setIsAccountInformationVis(true);
      alert("User information updated!");
    } catch (err) {
      alert("Sorry, that didn't work. Try again.");
    }
  };

  const handleDClick = () => {
    isDeleteVisible ? setIsDeleteVisible(false) : setIsDeleteVisible(true);
    setIsAIFormVisible(false);
    setIsAccountInformationVis(false);
  };

  return (
    <div className="profile-container">
      <h2 className="title">Welcome {userData.username}!</h2>
      <h3
        className="link-title"
        onClick={handleAIClick}
      >
        Account information
      </h3>
      {isAccountInformationVis ? (
        <div className="accountInfoCard">
          <div className="accountInfo">
            <ul>
              <li>Username: {userData.username}</li>
              <li>Email: {userData.email}</li>
              <li>Address: {userData.address}</li>
              <li>Phone Number: {userData.phoneNumber}</li>
              <li>Type: {userData.type}</li>
            </ul>
            <button onClick={formVisible}>Edit Profile</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isAIFormVisible ? (
        <AccountInfoForm
          userData={userData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formHidden={formHidden}
        />
      ) : (
        <></>
      )}
      <h3
        className="link-title"
        onClick={handleDClick}
      >
        Delete Account
      </h3>
      {isDeleteVisible ? (
        <DeleteAccount
          userId={userId}
          handleDClick={handleDClick}
        />
      ) : (
        <></>
      )}
      <Link to="/">
        <button onClick={handleSignout}>Sign out</button>
      </Link>
    </div>
  );
};

export default Profile;
