import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// import Card from "./components/Card/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [type, setType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats"
        );
        if (response && response.data && response.data.length > 0) {
          setCards(response.data);
          setFilterData(response.data);
          // iterate over response and filter all types
          const uniqueTypes = [
            ...new Set(response.data.map((card) => card.type)),
          ];
          setType(uniqueTypes);
        }

        // console.log(type);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  const handleTypeFilter = (e) => {
    const selectedType = e.target.value;
    console.log(selectedType);

    if (selectedType === "All") {
      // Show all cards if "All" is selected
      setFilterData([...cards]);
    } else {
      // Filter cards based on the selected type
      const filteredCards = cards.filter((card) => card.type === selectedType);
      setFilterData(filteredCards);
    }
  };

  const handleCardDate = (e) => {
    const sortOrder = e.target.value;

    // Create a copy of the current filterData
    const sortedCards = [...filterData].sort((a, b) => {
      if (sortOrder === "inc") {
        // Sort in ascending order
        return a.date - b.date;
      } else if (sortOrder === "dec") {
        // Sort in descending order
        return b.date - a.date;
      } else {
        // If no valid sortOrder, return 0 to keep original order
        return 0;
      }
    });

    // Update the state with the sorted cards
    setFilterData(sortedCards);
  };

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery === "") {
      setFilterData(cards);
    } else {
      const filteredCards = cards.filter((card) =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilterData(filteredCards);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading indicator or something similar
  }

  return (
    <div className="wellness-outer-container">
      <div className="header">
        <h1 className="header-title">Wellness Retreats</h1>
      </div>
      <div className="hero">
        <img className="hero-image" src="../public/yoga-img.png" alt="" />
        <h2 className="hero-title">Discover Your Inner Peace</h2>
        <p className="hero-description">
          Just us for a series of wellness retreats designed to help you find
          joy and enjoy
        </p>
      </div>
      <div className="filter">
        <select className="filter-date" onChange={handleCardDate}>
          <option value="" disabled selected>
            Filter by Date
          </option>
          <option value="inc">Increasing Order by Date</option>
          <option value="dec">Decreasing order by Date</option>
        </select>

        <select
          className="filter-date"
          onChange={handleTypeFilter}
          defaultValue="All"
        >
          <option value="All" disabled>
            Filter by Type
          </option>
          {type.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          className="filter-search"
          type="text"
          placeholder="Search retreats by title"
          onChange={handleSearchChange}
        />
      </div>
      <div className="card-section">
        {filterData.length === 0 ? (
          <h1>Oops! No Data</h1>
        ) : (
          filterData.map((card) => (
            <Card
              key={`card-${card.id}`}
              card={card}
              formatTimestamp={formatTimestamp}
            />
          ))
        )}
      </div>

      <div className="pagination">
        <button className="page-btn">Prev</button>

        <button className="page-btn">Next</button>
      </div>
      <div className="footer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-c-circle"
          viewBox="0 0 16 16"
        >
          <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c-1.212 0-1.927.92-1.927 2.502v1.06c0 1.571.703 2.462 1.927 2.462.979 0 1.641-.586 1.729-1.418h1.295v.093c-.1 1.448-1.354 2.467-3.03 2.467-2.091 0-3.269-1.336-3.269-3.603V7.482c0-2.261 1.201-3.638 3.27-3.638 1.681 0 2.935 1.054 3.029 2.572v.088H9.875c-.088-.879-.768-1.512-1.729-1.512" />
        </svg>{" "}
        <span>2024 Wellness Retreats. All rights reserved</span>
      </div>
    </div>
  );
}

export default App;

const Card = ({ card, formatTimestamp }) => {
  return (
    <div className="card">
      <div className="card-inside-container">
        <img className="card-img" src={card.image} alt="" />
        <h1 className="card-title">{card.title} </h1>
        <p className="card-description">{card.description}</p>
        <div className="creation-information">
          <div className="date-info">Date : {formatTimestamp(card.date)}</div>
          <div className="location-info">Location : {card.location}</div>
          <div className="price-info">Price : {card.price}</div>
          <div className="price-info">Type : {card.type}</div>
        </div>
      </div>
    </div>
  );
};

// {
//     "title": "Yoga for Stress Relief",
//     "description": "A weekend retreat focused on yoga and meditation to relieve stress.",
//     "date": 1692921600,
//     "location": "Goa",
//     "price": 200,
//     "type": "Signature",
//     "condition": "Stress Relief",
//     "image": "https://cdn.midjourney.com/a287f9bc-d0fb-4e78-a0fa-e8136d3c408a/0_0.jpeg",
//     "tag": [
//         "relaxation",
//         "meditation",
//         "weekend"
//     ],
//     "duration": 3,
//     "id": "1"
// }
