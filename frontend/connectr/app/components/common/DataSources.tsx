import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AppRouting } from "~/utils/routes";

interface DataSourceListProps {
  endpointId: string;
}

export default function DataSources({ endpointId }: DataSourceListProps) {
  const fetcher = useFetcher();
  const [sources, setSources] = useState([]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data && fetcher.data.sources) {
      let newSources = [];

      fetcher.data.sources.forEach((v) => {
        newSources.push(v.source);
      });

      setSources([...new Set(newSources)]);
    }
  }, [fetcher]);

  useEffect(() => {
    if (endpointId && endpointId.length > 4)
      fetcher.load(AppRouting.API_FIELDS + "?endpoint=" + endpointId);
  }, []);

  return (
    <div className="flex flex-wrap">
      {sources && Array.isArray(sources) && sources.length > 0
        ? sources.map((value, index) => (
            <span
              key={"source-" + index}
              className="mr-1 mb-1 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/10"
            >
              {value}
            </span>
          ))
        : null}
    </div>
  );
}
