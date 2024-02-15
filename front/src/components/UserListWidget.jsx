import { Link } from "react-router-dom";

function userListItem(user) {
  return (
    <li key={user.user}>
      <span
        className={`content-username${
          user.active ? " data-user-active" : " data-user-inactive"
        }${user.notifications ? " data-user-notifications" : ""}`}
      >
        <Link to={`/u/${user.user}`} relative="path">
          {user.username}
        </Link>
      </span>
      {user.tags ? (
        <span className="content-tags">{user.tags.join(", ")}</span>
      ) : (
        <></>
      )}
    </li>
  );
}

export default function UserListWidget({ users }) {
  const tags = users
    .flatMap((user) => user.tags)
    .filter((tag, index, array) => array.indexOf(tag) == index);

  const untagged = users.filter((user) => !user.tags.length);

  return (
    <div className="widget users-list">
      {tags.map((tag, index) => (
        <ul>
          <li>{tag}</li>
          {users
            .filter((user) => user.tags.includes(tag))
            .map((user, index) => userListItem(user))}
        </ul>
      ))}
      {untagged ? (
        <ul>
          <li>Muut</li>
          {untagged.map((user, index) => userListItem(user))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
