import { Link, useLoaderData } from "react-router-dom";
import { config } from "../config";
import axios from "axios";

export async function loader({ params }) {
  const response = await axios.get(`${config.API_URL}/users`);
  const users = response.data;
  return { users };
}

export default function Users() {
  const { users } = useLoaderData();

  console.log(users);

  return (
    <div>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.user}>
              <Link to={`/u/${user.user}`}>{user.slackname}</Link>
              {user.tags && user.tags.length
                ? user.tags.map((tag) => {
                    tag;
                  })
                : ""}
            </li>
          ))}
        </ul>
      ) : (
        "-"
      )}
    </div>
  );
}
