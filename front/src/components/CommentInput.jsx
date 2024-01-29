import { config } from "../config";
import { useState } from "react";

export default function CommentInput({ load_id, handle_submit }) {
  const [comment, setComment] = useState("");

  return (
    <form onSubmit={handle_submit}>
      <input
        id="comment_text"
        type="text"
        name="comment"
        defaultValue={comment}
        placeholder="Lisää tarkempi kommentti"
      />
      <button type="submit">Lähetä</button>
    </form>
  );
}
