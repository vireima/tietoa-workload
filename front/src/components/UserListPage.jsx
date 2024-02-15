import { useOutletContext, useParams } from "react-router";
import Header from "./Header";
import NavigationColumn from "./NavigationColumn";
import Column from "./Column";
import { Link } from "react-router-dom";
import UserListWidget from "./UserListWidget";

export default function UserListPage() {
  const { users } = useOutletContext();

  return (
    <>
      <div>
        <Header text={`Käyttäjätunnuslista`} />
      </div>
      <div className="v2">
        <Column>
          <NavigationColumn users={users} />
        </Column>
        <Column>
          <UserListWidget users={users} key="olo" />
        </Column>
      </div>
    </>
  );
}
