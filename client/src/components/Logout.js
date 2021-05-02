import API from "./../api/api";
import { useHistory } from "react-router-dom";

export default function Logout() {
  let history = useHistory();
  async function Logout() {
    try {
      await API.get("user/logout/").then((res) => {
        history.push(`/login`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={() => Logout()}
      >
        Logout
      </button>
    </>
  );
}
