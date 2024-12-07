import { Link, useNavigate } from "react-router-dom";

const DealDetail = (props) => {
  const {
    selectedDeal,
    dealList,
    setSelectedDeal,
    handleRemoveDeal,
    user,
    handleTakeDeal,
    handleReturnDeal,
    userData,
  } = props;

  const navigate = useNavigate();

  const handleCloseDetails = () => {
    setSelectedDeal(null);
    navigate("/deals");
  };

  const bundleNum = selectedDeal?.joined_users?.length;

  return (
    <div className="deal-details-container">
      <div className="deal-header">
        <p>{selectedDeal.category}</p>
        <p id="author">{selectedDeal.author_id}</p>
      </div>

      <div className="deal-image">
        <img
          src={selectedDeal.image}
          alt={selectedDeal.title}
        />
      </div>

      <div className="deal-main">
        <h1 className="deal-title">{selectedDeal.title}</h1>
        <div className="deal-info">
          <div>
            <p>Price: ${selectedDeal.discount_price}</p>
            <p>Deals Taken: {selectedDeal.joined_users.length}</p>
            <p>Total Deals: {selectedDeal.bundle_number}</p>
          </div>
        </div>
        <div className="deal-description">
          <p>{selectedDeal.description}</p>
        </div>
      </div>

      <div className="deal-actions">
        <button className="deal-button">Comments</button>
        {selectedDeal.bundle_number > bundleNum ? (
          <button
            className="deal-button"
            onClick={() => handleTakeDeal()}
          >
            BundleUp Deal
          </button>
        ) : (
          <button className="deal-button">Deal Full</button>
        )}
        <button
          className="deal-button"
          onClick={() => handleReturnDeal()}
        >
          UnBundle Deal
        </button>
      </div>

      <div className="deal-footer">
        <button onClick={() => handleCloseDetails()}>Close Details</button>
        {selectedDeal.author === userData._id && (
          <>
            <button
              className="deal-edit"
              onClick={() =>
                navigate(`/deals/dealform`, {
                  state: { dealData: selectedDeal },
                })
              }
            >
              Edit
            </button>
            <button
              className="deal-delete"
              onClick={() => handleRemoveDeal(selectedDeal._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DealDetail;
