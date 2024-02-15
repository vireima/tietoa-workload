import { Link } from "react-router-dom";
import "../styles/navigation.css";

export default function NavigationColumn({ users, tag }) {
  const tags = users
    .flatMap((user) => user.tags)
    .filter((tag, index, array) => array.indexOf(tag) == index);

  return (
    <div className="navigation">
      <Link to={"/"} className={`navigation-tag${!tag ? " selected" : ""}`}>
        Tietoa
      </Link>
      {tags.map((tg) => (
        <Link
          key={tg}
          to={`/tag/${tg}`}
          relative="path"
          className={`navigation-tag${tg == tag ? " selected" : ""}`}
        >
          {tg}
        </Link>
      ))}
      {tag ? (
        users
          .filter((user) => user.tags.includes(tag))
          .map((user) => (
            <Link
              key={user.user}
              to={`/u/${user.user}`}
              className="navigation-user"
            >
              {user.username}
            </Link>
          ))
      ) : (
        <></>
      )}
    </div>
  );
}