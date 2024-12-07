import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  category: "",
  description: "",
  original_price: "",
  discount_price: "",
  bundle_number: "",
  image: "",
};

const DealForm = (props) => {
  const { handleAddDeal, selectedDeal, handleUpdateDeal, user } = props;
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const dealData = location.state?.dealData;
    if (dealData) {
      setFormData(dealData);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDeal) {
      handleUpdateDeal(formData, selectedDeal._id);
      setFormData(initialState);
      navigate(`/deals/${selectedDeal._id}`);
    } else {
      handleAddDeal(formData);
      setFormData(initialState);
      navigate("/deals");
    }
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <main>
      <h1 className="deal-form-header">New Deal</h1>
      <div className="eventFormCard">
        <form
          className="deal-form"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="author_id"
            value={formData.user}
          />
          <label htmlFor="dealTitle">Deal Title:</label>
          <input
            type="text"
            id="dealTitle"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Choose One</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
          </select>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <label htmlFor="originalPrice">Original Price:</label>
          <input
            type="number"
            id="originalPrice"
            name="original_price"
            value={formData.original_price}
            onChange={handleChange}
            required
          />

          <label htmlFor="discountPrice">Discount Price:</label>
          <input
            type="number"
            id="discountPrice"
            name="discount_price"
            value={formData.discount_price}
            onChange={handleChange}
            required
          />

          <label htmlFor="bundle_number">User Deal Limit:</label>
          <input
            type="number"
            id="bundle_number"
            name="bundle_number"
            value={formData.bundle_number}
            onChange={handleChange}
            min="0"
          />

          <label htmlFor="image">Deal Image Url:</label>
          <input
            type="text"
            id="image"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <button type="submit">
            {selectedDeal ? "Update Deal" : "Submit New Deal"}
          </button>
        </form>
      </div>
      <Link to={`/events`}>
        <button>Go Back</button>
      </Link>
    </main>
  );
};

export default DealForm;
