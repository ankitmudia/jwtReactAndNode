import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getAllOrders, getAllUsers } from "../services/user.service";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const location = useLocation();
  console.log("PATH NAME ", history.location.pathname);

  useEffect(() => {
    console.log("READING TOKEN......");
    const tokenString = localStorage.getItem("token");
    if (!tokenString) {
      console.log(" TOKEN NOT FOUND......");
      history.push("/login?returnUrl=" + location.pathname);
      return;
    }

    console.log(" TOKEN  FOUND......");
    console.log("Getting All USERs.....");
    getAllUsers().then((users) => {
      setUsers(users);
    });

    getAllOrders().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <hr />

      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {user.firstName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export { UserList };
