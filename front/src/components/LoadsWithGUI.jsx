import Load from "./Load";
import { useLoaderData } from "react-router";
import { config } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Timeline from "./Timeline";
import Density from "./Density";

export default function LoadsWithGUI({ user }) {
  const [loads, setLoads] = useState([]);
  const [after, setAfter] = useState(
    DateTime.now().minus({ months: 3 }).toFormat("yyyy-MM-dd'T'HH:mm")
  );
  const [before, setBefore] = useState(
    DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm")
  );
  const [tags, setTags] = useState([]);

  async function fetchLoads() {
    let params = {};
    if (user) params.user = user.user;
    if (after) params.after = DateTime.fromISO(after).toISO();
    if (before) params.before = DateTime.fromISO(before).toISO();
    if (tags && tags.length > 0) params.tags = tags;

    console.log("params:", params);
    const response = await axios.get(`${config.API_URL}/loads`, {
      params: params,
      paramsSerializer: { indexes: null },
    });

    const data = response.data;

    console.log("data: ", data);

    setLoads(data);
  }

  useEffect(() => {
    fetchLoads();
  }, [after, before]);

  return (
    <div>
      <h2>{user.username}</h2>
      <Timeline filteredLoads={loads} />
      <Load filteredLoads={loads} />
      <Density filteredLoads={loads} />

      <input
        type="datetime-local"
        id="after"
        name="after"
        value={after}
        onChange={(e) => setAfter(e.target.value)}
      />
      <input
        type="datetime-local"
        id="before"
        name="before"
        value={before}
        onChange={(e) => setBefore(e.target.value)}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchLoads();
        }}
      >
        <input
          type="text"
          id="tags"
          name="tags"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(
              e.target.value.length > 0
                ? e.target.value.split(",").map((tag) => tag.trim())
                : []
            )
          }
        />
      </form>
    </div>
  );
}
