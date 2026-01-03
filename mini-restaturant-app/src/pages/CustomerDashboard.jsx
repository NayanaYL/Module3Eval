import { useEffect, useState, useRef } from "react";
import { getRestaurants } from "../utils/localStorage";
import RestaurantCard from "../components/RestaurantCard";

function CustomerDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterParking, setFilterParking] = useState("");
  const searchRef = useRef();

  useEffect(() => {
    setRestaurants(getRestaurants());
    searchRef.current.focus(); // autofocus search input
  }, []);

  const filteredRestaurants = restaurants
    .filter((r) =>
      (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((r) => (filterType ? r.type === filterType : true))
    .filter((r) =>
      filterParking === ""
        ? true
        : r.parkingLot === (filterParking === "true")
    );

  return (
    <div style={{ padding: "10px" }}>
      <h2>Customer Dashboard</h2>

      {/* Navbar with search and filters */}
      <div style={{ marginBottom: "20px" }}>
        <input
          ref={searchRef}
          placeholder="Search by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option>Rajasthani</option>
          <option>Gujarati</option>
          <option>Mughlai</option>
          <option>Jain</option>
          <option>Thai</option>
          <option>North Indian</option>
          <option>South Indian</option>
        </select>

        <select
          value={filterParking}
          onChange={(e) => setFilterParking(e.target.value)}
        >
          <option value="">All Parking</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      {/* Restaurant Cards */}
      <div>
        {filteredRestaurants.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}

export default CustomerDashboard;
