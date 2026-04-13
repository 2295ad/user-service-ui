import {useEffect, useState} from 'react';

import UserTable from "./components/UserTable";
import { apiRequest } from './apiRequest';
import UserForm from './components/UserForm';

function App() {
  const [allUserData,setAllUserData] = useState([]);
  const [searchUserData, setSearchUserData] = useState([]);
  const [text, setText] = useState("");

  useEffect(()=>{
      const fetchUsers = async () => {
        try {
          const resp = await apiRequest("/customer-service/user/v1/find-all");
          setAllUserData(resp?.success?resp.data:[]);
        } catch (err) {
          console.error(err);
        }
      };
    fetchUsers();
  },[]);

    const fetchUser = async () => {
      try {
        const resp = await apiRequest(`/customer-service/user/v1/${text}`);
        setSearchUserData(resp?.success?resp.data:[]);
        } catch (err) {
          console.error(err);
      }
    };


  return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
      <h3>Create user :</h3>
      <UserForm/>
      <>
      <h3>Fetch user :</h3>
          <div style={{ padding: "20px" }}>
              <input
                type="text"
                placeholder="Enter username to search"
                value={text}
                onChange={(e) => {setText(e.target.value)}}
              />

              <button onClick={fetchUser} style={{ padding: "5px 10px" }}>
                Submit
              </button>
          </div>
      {searchUserData?.length>0 && <UserTable data={searchUserData} paginationAllowed={false}/>}
      </>

      <>
      <h4>All user details</h4>
      <UserTable data={allUserData}/>
      </>
</div>
  );
}

export default App;
