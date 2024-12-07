import { Link } from "react-router-dom";

const DealList = (props) => {
  const { dealList, handleViewDeal } = props;

  const deals = dealList.map((deal) => (
    <div
      key={deal.id}
      className="deal-item"
    >
      <img
        src={deal.image}
        alt={deal.title}
        className="deal-image"
      />
      <div className="deal-content">
        <h3>{deal.title}</h3>
        <p>{deal.description}</p>
        <p>
          <span className="original-price">{deal.originalPrice}</span>{" "}
          <span className="discounted-price">{deal.discountedPrice}</span>
        </p>
        <Link to={`/deals/${deal._id}`}>
          <button onClick={() => handleViewDeal(deal)}>View</button>
        </Link>
      </div>
    </div>
  ));

  return (
    <div className="deal-list-container">
      <h1>Deals on BundleUp</h1>
      <p>
        Explore incredible savings on your favorite activities and services!
      </p>
      <Link to={`/deals/dealForm`}>
        <button>Add Deals</button>
      </Link>
      <div className="deal-list">
        {!dealList.length ? <h3>No deals at the moment</h3> : <ul>{deals}</ul>}
      </div>
    </div>
  );
};

export default DealList;
