import { useLoaderData } from "react-router";

export async function loader({ params }) {
  const user = params.user;
  return { user };
}

export default function User() {
  const { user } = useLoaderData();

  return <div>user {user}</div>;
}
