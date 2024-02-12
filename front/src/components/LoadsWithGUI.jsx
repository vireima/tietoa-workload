import Load from "./Load";
import { useLoaderData } from "react-router";
import { config } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Timeline from "./Timeline";
import Density from "./Density";
import { Link } from "react-router-dom";
import StatisticWidget from "./StatisticWidget";

export default function LoadsWithGUI({ user }) {
  const [data, setData] = useState([]);
  const [after, setAfter] = useState(
    DateTime.now().minus({ months: 3 }).toFormat("yyyy-MM-dd'T'HH:mm")
  );
  const [before, setBefore] = useState(
    DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm")
  );
  const [tags, setTags] = useState([]);

  async function fetchLoads() {
    let params = {};
    if (user) params.users = user.user;
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

    setData(data);
  }

  useEffect(() => {
    fetchLoads();
  }, [after, before]);

  return (
    <div>
      <div>
        {user ? (
          <>
            <h2>{user.username}</h2>
            <Link to={`/i/${user.user}`}>Kiireen merkintä</Link>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="dashboard-charts">
        <Timeline filteredLoads={data.data} />
        <Load filteredLoads={data.data} />
        <Density filteredLoads={data.data} />
        <StatisticWidget
          description="Kiireen tuntu"
          name="mentalload"
          value={data?.summary?.latest?.mean_mentalload ?? 0}
          reference_value={data?.summary?.weekly?.mean_mentalload ?? 0}
          percentage={true}
        />
        <StatisticWidget
          description="Kiireen määrä"
          name="workload"
          value={data?.summary?.latest?.mean_mentalload ?? 0}
          reference_value={data?.summary?.weekly?.mean_mentalload ?? 0}
          percentage={true}
        />
        <StatisticWidget
          description="Kysylyvastausten määrä"
          name="count"
          value={data?.summary?.latest?.mean_count ?? 0}
          reference_value={data?.summary?.weekly?.mean_count ?? 0}
        />
      </div>
      <div className="dashboard-filters">
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
        {user ? (
          ""
        ) : (
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
              placeholder="Filtteröi litteroiden perusteella"
              onChange={(e) =>
                setTags(
                  e.target.value.length > 0
                    ? e.target.value.split(",").map((tag) => tag.trim())
                    : []
                )
              }
            />
          </form>
        )}
      </div>
    </div>
  );
}
