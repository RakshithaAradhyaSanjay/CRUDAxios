import { useState, useEffect } from "react";
import axios from 'axios';
const API_URL = "https://jsonplaceholder.typicode.com/users";

const User = () => {
  const [users, setusers] = useState([]);
  const [userName, setuserName] = useState("");
  const [selecteduser, setSelecteduser] = useState(null);


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setusers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const adduser = async (name) => {
    const newuser = { name: name };
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newuser),
    });

    //get the newly created user from the response
    const user = await response.json();

    //we are update the user list with the newly added list
    setusers([...users, user]);
  };



  
  const deleteuser = (userId) => {
    // Delete user by ID
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => {
        // Update state to remove the deleted user
        setusers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  const edituser = (user) => {
    setSelecteduser(user);
    setuserName(user.name);
  };
 
  const updateduser = async () => {
    const updateduser = { ...selecteduser, name: userName };
  
    await fetch(`${API_URL}/${selecteduser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateduser),
    });

    setusers(
      users.map((user) =>
        user.id === selecteduser.id ? updateduser : user
      )
    );
    setSelecteduser(null);
    setuserName("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selecteduser) {
      adduser(userName);
    } else {
      updateduser();
    }
    setuserName("");
  };

  return (
    <>
      <div>
        <div>
          {users.map(user => (
            <div Key={user.id}>
              <div>{user.name}</div>

              <div>
                <button onClick={() => edituser(user)} >Edit</button>
                <button onClick={() => deleteuser(user.id)} >Delete</button>
             
                </div>
              </div>
            
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            placeholder="Enter the user name"
            required
          ></input>
          <button type="submit">
            {selecteduser ? "Update user" : "Add user"}
          </button>
        </form>
      </div>
    </>
  );
}; // add the new user

export default User;
