import Load from "./Load";
import { useLoaderData } from "react-router";
import { config } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";

export default function LoadsWithGUI({ user }) {
  const [loads, setLoads] = useState([]);
  const [after, setAfter] = useState(
    DateTime.now().minus({ months: 3 }).toFormat("yyyy-MM-dd'T'hh:mm")
  );
  const [before, setBefore] = useState(
    DateTime.now().toFormat("yyyy-MM-dd'T'hh:mm")
  );

  useEffect(() => {
    async function fetchLoads() {
      let params = { user: user.user };
      if (after) params.after = DateTime.fromISO(after).toISO();
      if (before) params.before = DateTime.fromISO(before).toISO();
      console.log(params);
      const response = await axios.get(`${config.API_URL}/loads`, {
        params: params,
      });

      const data = response.data;

      setLoads(data);
    }
    fetchLoads();
  }, [after, before]);

  console.log("data", loads);
  return (
    <div>
      <Load filteredLoads={loads} />
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
    </div>
  );
}
