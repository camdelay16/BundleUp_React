import { AuthedUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import * as eventService from "../../services/eventService";
import * as dealService from "../../services/dealService";

const Dashboard = ({ userData }) => {
  const user = useContext(AuthedUserContext);
  const [joinedEventsList, setJoinedEventsList] = useState([]);
  const [joinedDealsList, setJoinedDealsList] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await eventService.index();
        if (events.error) {
          throw new Error(events.error);
        }
        setJoinedEventsList(events);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  const filteredJoinedEvents = joinedEventsList.filter((eventItem) => {
    let userEvents = { ...userData };
    const attendingEvents = userEvents.joinedEvents;
    return attendingEvents.includes(eventItem._id);
  });

  const events = filteredJoinedEvents.map((eventItem) => (
    <div key={eventItem._id}>
      <div className="dashboardListCard">
        <div className="eventListImgContainer">
          <img
            src={eventItem.image}
            alt="Event Image"
            id="eventListImg"
          />
        </div>
        <div className="eventListDetailsContainer">
          <h3 className="eventTitle">{eventItem.eventTitle}</h3>
        </div>
      </div>
    </div>
  ));

  useEffect(() => {
    const getDeals = async () => {
      try {
        const deals = await dealService.index();
        if (deals.error) {
          throw new Error(deals.error);
        }
        setJoinedDealsList(deals);
      } catch (error) {
        console.log(error);
      }
    };
    getDeals();
  }, []);

  const filteredJoinedDeals = joinedDealsList.filter((dealItem) => {
    let userDeals = { ...userData };
    const attendingDeals = userDeals.joinedDeals;
    return attendingDeals.includes(dealItem._id);
  });

  const deals = filteredJoinedDeals.map((dealItem) => (
    <div key={dealItem._id}>
      <div className="dashboardListCard">
        <div className="eventListImgContainer">
          <img
            src={dealItem.image}
            alt="Deal Image"
            id="eventListImg"
          />
        </div>
        <div className="eventListDetailsContainer">
          <h3 className="eventTitle">{dealItem.title}</h3>
        </div>
      </div>
    </div>
  ));

  return (
    <main>
      <div className="dashboardCard">
        <h1>Welcome, {userData.username}</h1>
        <p>Start to BundleUp!</p>

        <h3>Joined Events</h3>

        {!filteredJoinedEvents.length ? (
          <h3>No events at the moment</h3>
        ) : (
          <ul className="dashboardEventList">{events}</ul>
        )}

        <h3>Bundled Deals</h3>

        {!filteredJoinedDeals.length ? (
          <h3>No deals at the moment</h3>
        ) : (
          <ul className="dashboardEventList">{deals}</ul>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
