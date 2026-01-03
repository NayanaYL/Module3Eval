import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurants, saveRestaurants } from "../utils/localStorage";

function UpdateRestaurant() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const data = getRestaurants();
    setRestaurants(data);

    const found = data.find((r) => r.id === Number(id));
    setForm(found);
  }, [id]);

  const handleUpdate = () => {
    if (!form.restaurantName || !form.address || !form.type) {
      alert("Please fill all fields");
      return;
    }

    if (!window.confirm("Are you sure you want to update?")) return;

    const updated = restaurants.map((r) =>
      r.id === Number(id) ? { ...form } : r
    );

    saveRestaurants(updated);
    alert("Restaurant updated successfully");
    navigate("/admin/dashboard");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Update Restaurant</h2>

      <input
        value={form.restaurantName}
        onChange={(e) =>
          setForm({ ...form, restaurantName: e.target.value })
        }
      />

      <input
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option>Rajasthani</option>
        <option>Gujarati</option>
        <option>Mughlai</option>
        <option>Jain</option>
        <option>Thai</option>
        <option>North Indian</option>
        <option>South Indian</option>
      </select>

      <select
        value={form.parkingLot}
        onChange={(e) =>
          setForm({ ...form, parkingLot: e.target.value === "true" })
        }
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>

      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateRestaurant;
