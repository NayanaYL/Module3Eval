import { useEffect,useState } from "react";
import{getRestaurants,saveRestaurants} from  "../utils/localStorage";
import RestaurantCard from "../components/RestaurantCard";
import {useNavigate} from "react-router-dom";
const defaultImage=
"https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg";
function AdminDashboard(){
    const [restaurants,setRestaurants]=useState([]);
    const [form, setForm]=useState({
        restaurantName:"",
        address:"",
        type:"",
        parkingLot:"",
        image:defaultImage,
    });
    const navigate=useNavigate();
    useEffect(()=>{
        setRestaurants(getRestaurants());
    },[]);
    const handleAdd=()=>{
        if(!form.restaurantName||!form.address||!form.type){
            alert("please fill all fields");
            return;
        }
        const newRestaurant={
            id:Date.now(),
            ...form,
            parkingLot:form.parkingLot==="true",
        };
        const updated=[...restaurants,newRestaurant];
        saveRestaurants(updated);
        saveRestaurants(updated);
        alert("Restaurant added successfully");
        setForm({
            restaurantName:"",
        address:"",
        type:"",
        parkingLot:"",
        image:defaultImage,
    });

    };
    const handleDelete=(id)=>{
        if(!window.confirm("are you sure you want to delete"))return;
        const updated=restaurants.filter((r)=>r.id !==id);
        saveRestaurants(updated);
        saveRestaurants(updated);
        alert("restaurant deleted successufully");

    };
    return(
        <div style={{display:"flex"}}>
            {/*Sidebar*/}
            <div style={{width:"300px",padding:"10px"}}>
                <h3>Add Restaturant</h3>
                <input
                placeholder="Name"
                value={form.restaurantName}
                onChange={(e)=>
                    setForm({...form,restaurantName:e.target.value})
                }
                />
                <input
                placeholder="Address"
                value={form.address}
                onChange={(e)=>
                    setForm({...form,address:e.target.value})
                }
                />
                <select
                value={form.type}
                onChange={(e)=>setForm({...form,type:e.target.value})}
                >
                <option value="">Select Type</option>
                <option>Rajasthani</option>
                <option>Gujarathi</option>
                <option>SouthIndian</option>
                <option>NorthIndian</option>
                </select>
                <select
                value={form.parkingLot}
                onChange={(e)=>setForm({...form,parkingLot:e.target.value})}
                >
                <option value="">Parking Available</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
                <button onClick={handleAdd}>Add</button>
            
            </div>
            {/*Restaurant List*/}
            <div>
            {restaurants.map((r)=>(
                <RestaurantCard
                key={r.id}
                restaurant={r}
                isAdmin={true}
                onDelete={handleDelete}
                onUpdate={(id)=>navigate(`/admin/restaurants/update/${id}`)}
                />
            ))}
        </div>
        </div>
    );
}
export default AdminDashboard