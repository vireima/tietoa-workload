import { Link } from "react-router-dom";
import "../styles/navigation.css";

export default function NavigationColumn({ users, tag }) {
  const tags = users
    .flatMap((user) => user.tags)
    .filter((tag, index, array) => array.indexOf(tag) == index);

  return (
    <div className="navigation">
      <ul>
        <li key="tietoa" className={`navigation-tag${!tag ? " selected" : ""}`}>
          <Link to={"/"}>Tietoa</Link>
        </li>
        {tags.map((tg) => (
          <li
            key={tg}
            className={`navigation-tag${tg == tag ? " selected" : ""}`}
          >
            <Link to={`/tag/${tg}`} relative="path">
              {tg}
            </Link>
            <ul>
              {tg === tag ? (
                users
                  .filter((user) => user.tags.includes(tag))
                  .map((user) => (
                    <li key={user.user} className="navigation-user">
                      <Link to={`/u/${user.user}`}>
                        {user.slack.profile.display_name ||
                          user.slack.profile.real_name}
                      </Link>
                    </li>
                  ))
              ) : (
                <></>
              )}
            </ul>
          </li>
        ))}

        <li key="users">
          <Link to={`/u`} className="">
            Käyttäjät
          </Link>
        </li>
      </ul>
    </div>
  );
}
