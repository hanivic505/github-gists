import { useState } from "react";
import cn from "classnames";
import s from "./App.module.scss";
import { FileTypes, ForkedBy } from "./components";

function App() {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const load = async (e: any) => {
    e.preventDefault();
    if (username === "") {
      setError("Please enter a valid username to start search");
      return;
    }
    setError("");
    const response = await fetch(
      `https://api.github.com/users/${username}/gists`
    ).then((data) => data.json());
    setResults(response);
  };

  return (
    <div className={s.wrapper}>
      <div className={cn("container mx-auto", s.wrapper)}>
        <h1>
          Searching for {username ? username : "[Enter username in search]"}
        </h1>
        <div className="flex-column my-2">
          <form onSubmit={load} className="flex my-2">
            <input
              className="mr-2"
              type="search"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button className="primary" type="submit">
              Search
            </button>
          </form>
          {error && <span className="text-red-500">{error}</span>}
        </div>
        <div>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Files</th>
                <th>Description</th>
                <th>Gist URL</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(results)
                ? results.map((u: any) => (
                    <tr key={u.id}>
                      <td>
                        <FileTypes files={u.files} />
                      </td>
                      <td>{u.description}</td>
                      <td>
                        <ForkedBy forksUrl={u.forks_url} />
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
