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

  // console.log(users);

  return (
    <div>
      {users.length ? (
        <ul>
          {users.map((user, user_index) => (
            <li key={user_index}>
              <Link to={`/i/${user.user}`}>{user.username}</Link>
              {user.tags
                ? user.tags.map((tag, index) => {
                    return (
                      <span>
                        #{tag}
                        {index < user.tags.length - 1 ? ", " : ""}
                      </span>
                    );
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
