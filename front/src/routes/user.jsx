import { useLoaderData } from "react-router";
import { config } from "../config";
import axios from "axios";
import LoadsWithGUI from "../components/LoadsWithGUI";

export async function loader({ params }) {
  const response = await axios.get(`${config.API_URL}/user/${params.user}`);
  const user = response.data;
  console.log(user);
  return { user };
}

export default function User() {
  const { user } = useLoaderData();

  return (
    <div>
      user
      <LoadsWithGUI user={user} />
    </div>
  );
}
