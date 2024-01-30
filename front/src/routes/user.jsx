import { useLoaderData } from "react-router";
import { config } from "../config";
import axios from "axios";
import LoadsWithGUI from "../components/LoadsWithGUI";

export async function loader({ params }) {
  const response = await axios.get(`${config.API_URL}/user/${params.user}`);
  const user = response.data;
  return { user };
}

export default function User() {
  const { user } = useLoaderData();

  return <LoadsWithGUI user={user} />;
}
