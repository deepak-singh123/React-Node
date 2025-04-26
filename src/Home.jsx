import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  

const Home = ({ userdata }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    console.log(userdata);
  }, [userdata]);

  return (
    <div className="home-container">
      <h1 className="home-title">User List</h1>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userdata) && userdata.length > 0 ? (
              userdata.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.dob}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-users">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="logout-button-container">
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
