import { useSearchParams } from "react-router-dom";

export function useTags() {
  const [searchParams] = useSearchParams();
  const tags = searchParams.get("tags");
  return { tags };
}
