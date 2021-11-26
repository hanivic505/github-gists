import React, { useEffect, useState } from "react";

interface IProps {
  forksUrl: string;
}

export default function ForkedBy({ forksUrl }: IProps) {
  const [forks, setForks] = useState([]);
  useEffect(() => {
    const load = async () => {
      const results = await fetch(forksUrl).then((data) => data.json());
      setForks(results);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ul className="flex">
      {Array.isArray(forks) &&
        forks.slice(0, 2).map((f: any) => (
          <li key={f.id} className="flex-column w-1/6 mr-5 text-center">
            <img
              src={f.owner.avatar_url}
              alt={f.owner.login}
              className="rounded-full"
            />
            {f.owner.login}
          </li>
        ))}
    </ul>
  );
}
