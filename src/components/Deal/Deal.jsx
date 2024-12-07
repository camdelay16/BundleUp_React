import "./Deal.css";
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DealList from "./DealList";
import DealDetail from "./DealDetail";
import DealForm from "./DealForm";
import * as dealService from "../../services/dealService";
import * as userService from "../../services/userService";

const Deal = (props) => {
  const { user, userData } = props;
  const [dealList, setDealList] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getDeals = async () => {
      try {
        const deals = await dealService.index();
        if (deals.error) {
          throw new Error(deals.error);
        }
        setDealList(deals);
      } catch (error) {
        console.log("Error fetching deals:", error);
      }
    };
    getDeals();
  }, [selectedDeal]);

  const handleViewDeal = (dealItem) => {
    setSelectedDeal(dealItem);
  };

  const handleAddDeal = async (formData) => {
    try {
      const newDeal = await dealService.create(formData);
      if (newDeal.error) {
        throw new Error(newDeal.error);
      }
      setDealList([newDeal, ...dealList]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDeal = async (formData, dealId) => {
    try {
      const updatedDeal = await dealService.update(formData, dealId);
      if (updatedDeal.error) {
        throw new Error(updatedDeal.error);
      }
      const updatedDealList = dealList.map((deal) =>
        deal._id !== updatedDeal._id ? deal : updatedDeal
      );
      setDealList(updatedDealList);
      setSelectedDeal(updatedDeal);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveDeal = async (dealId) => {
    try {
      await dealService.deleteDeal(dealId);
      setDealList(dealList.filter((deal) => deal._id !== dealId));
      setSelectedDeal(null);
      navigate(`/deals`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTakeDeal = async () => {
    const tookDeal = selectedDeal?.joined_users?.includes(userData._id);
    if (!tookDeal) {
      const updatedDealData = {
        ...selectedDeal,
        joined_users: [...(selectedDeal?.joined_users || []), userData._id],
      };

      try {
        const updatedDeal = await dealService.update(
          updatedDealData,
          selectedDeal._id
        );
        let newUserForm = { ...userData };
        newUserForm.joinedDeals.push(selectedDeal._id);
        const updateUser = await userService.update(userData._id, newUserForm);
        if (updatedDeal.error) {
          throw new Error(updatedDeal.error);
        }
        setSelectedDeal(updatedDeal);
      } catch (error) {
        console.error("Error updating deal:", error);
      }
    } else {
      window.alert("You're already attending this deal.");
    }
  };

  const handleReturnDeal = async () => {
    const updatedJoined_users = selectedDeal.joined_users.filter(
      (userId) => userId !== userData._id
    );

    const updatedDealData = {
      ...selectedDeal,
      joined_users: updatedJoined_users,
    };

    try {
      const updatedDeal = await dealService.update(
        updatedDealData,
        selectedDeal._id
      );
      let newUserForm = { ...userData };
      const indexToRemove = newUserForm.joinedDeals.lastIndexOf(
        selectedDeal._id
      );
      if (indexToRemove !== -1) {
        newUserForm.joinedDeals.splice(indexToRemove, 1);
      }
      const updateUser = await userService.update(user._id, newUserForm);
      if (updatedDeal.error) {
        throw new Error(updatedDeal.error);
      }
      setSelectedDeal(updatedDeal);
    } catch (error) {
      console.error("Error updating deal:", error);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <DealList
              dealList={dealList}
              handleViewDeal={handleViewDeal}
            />
          }
        />
        <Route
          path="/:dealId"
          element={
            <DealDetail
              dealList={dealList}
              selectedDeal={selectedDeal}
              setSelectedDeal={setSelectedDeal}
              handleRemoveDeal={handleRemoveDeal}
              user={user}
              userData={userData}
              handleTakeDeal={handleTakeDeal}
              handleReturnDeal={handleReturnDeal}
            />
          }
        />
        <Route
          path="/dealForm"
          element={
            <DealForm
              handleAddDeal={handleAddDeal}
              selectedDeal={selectedDeal}
              handleUpdateDeal={handleUpdateDeal}
              user={user}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Deal;
