import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import "../styles/profile.css";
import { emojify, has } from "node-emoji";

function SlackIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-icon"
    >
      <path
        d="M26.5002 14.9996C27.8808 14.9996 29 13.8804 29 12.4998C29 11.1192 27.8807 10 26.5001 10C25.1194 10 24 11.1193 24 12.5V14.9996H26.5002ZM19.5 14.9996C20.8807 14.9996 22 13.8803 22 12.4996V5.5C22 4.11929 20.8807 3 19.5 3C18.1193 3 17 4.11929 17 5.5V12.4996C17 13.8803 18.1193 14.9996 19.5 14.9996Z"
        fill="#2EB67D"
      />
      <path
        d="M5.49979 17.0004C4.11919 17.0004 3 18.1196 3 19.5002C3 20.8808 4.1193 22 5.49989 22C6.8806 22 8 20.8807 8 19.5V17.0004H5.49979ZM12.5 17.0004C11.1193 17.0004 10 18.1197 10 19.5004V26.5C10 27.8807 11.1193 29 12.5 29C13.8807 29 15 27.8807 15 26.5V19.5004C15 18.1197 13.8807 17.0004 12.5 17.0004Z"
        fill="#E01E5A"
      />
      <path
        d="M17.0004 26.5002C17.0004 27.8808 18.1196 29 19.5002 29C20.8808 29 22 27.8807 22 26.5001C22 25.1194 20.8807 24 19.5 24L17.0004 24L17.0004 26.5002ZM17.0004 19.5C17.0004 20.8807 18.1197 22 19.5004 22L26.5 22C27.8807 22 29 20.8807 29 19.5C29 18.1193 27.8807 17 26.5 17L19.5004 17C18.1197 17 17.0004 18.1193 17.0004 19.5Z"
        fill="#ECB22E"
      />
      <path
        d="M14.9996 5.49979C14.9996 4.11919 13.8804 3 12.4998 3C11.1192 3 10 4.1193 10 5.49989C10 6.88061 11.1193 8 12.5 8L14.9996 8L14.9996 5.49979ZM14.9996 12.5C14.9996 11.1193 13.8803 10 12.4996 10L5.5 10C4.11929 10 3 11.1193 3 12.5C3 13.8807 4.11929 15 5.5 15L12.4996 15C13.8803 15 14.9996 13.8807 14.9996 12.5Z"
        fill="#36C5F0"
      />
    </svg>
  );
}

function userListItem(user, key) {
  const status_text = `Status: <span class="profile-status-text">${
    has(user.slack.profile.status_emoji)
      ? emojify(user.slack.profile.status_emoji)
      : ""
  }${user.slack.profile.status_text}</span><br/>`;
  const tooltip_html = `<p><img class="profile-icon" src="${
    user.slack.profile.image_32
  }" width="32" height="32"/>${
    user.slack.profile.real_name
  }<br/>Käyttäjänimi: ${user.slack.profile.display_name}<br/>${
    user.slack.profile.status_text ? status_text : ""
  }Slack-ID: ${user.user}<br/>Aktiivinen: ${
    user.active ? "kyllä" : "ei"
  }<br/>Slack-muistukset: ${user.notifications ? "kyllä" : "ei"}</p>`;

  return (
    <li
      key={key}
      data-tooltip-id={user.user}
      data-tooltip-html={tooltip_html}
      data-tooltip-place="left"
    >
      <span
        className={`content-username${
          user.active ? " data-user-active" : " data-user-inactive"
        }${user.notifications ? " data-user-notifications" : ""}`}
      >
        <span>
          {has(user.slack.profile.status_emoji)
            ? emojify(user.slack.profile.status_emoji)
            : ""}
        </span>
        <Link to={`/u/${user.user}`} relative="path">
          {user.username}
        </Link>
      </span>
      {user.tags ? (
        <span className="content-tags">{user.tags.join(", ")}</span>
      ) : (
        <></>
      )}
      {user.notifications ? <SlackIcon /> : <></>}
      <Tooltip id={user.user} />
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
      {tags.map((tag, tag_index) => (
        <ul key={tag_index}>
          <li key={tag_index}>{tag}</li>
          {users
            .filter((user) => user.tags.includes(tag))
            .map((user, index) => userListItem(user, `${tag}-${index}`))}
        </ul>
      ))}
      {untagged ? (
        <ul>
          <li key="others">Muut</li>
          {untagged.map((user, index) => userListItem(user, `others-${index}`))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
