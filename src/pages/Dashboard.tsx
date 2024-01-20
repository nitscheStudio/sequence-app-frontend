import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const Dashboard = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <div>
        <code>{JSON.stringify(auth)}</code>
      </div>
      <section></section>
    </>
  );
};

export default Dashboard;
