import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import TodoCard from "./components/todo";
import Header from "./components/header";
export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("todoData"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  const newInputNotStarted = useRef(null);
  const newInputDoing = useRef(null);
  const newInputDone = useRef(null);

  const handleNewCard = (status, inputRef) => {
    if (inputRef.current.value !== "") {
      const newCardData = {
        id: data.length + 1,
        title: inputRef.current.value,
        status: status,
      };
      setData([...data, newCardData]);
      inputRef.current.value = "";
    } else {
      return;
    }
  };

  const handleUpdateStatus = (id, updatedStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: updatedStatus } : item,
    );
    setData(updatedData);
  };
  useEffect(() => {
    if (data.length !== 0) {
      localStorage.setItem("todoData", JSON.stringify(data));
    }
  }, [data]);
  return (
    <div>
      <Header />
      <div className="container">
        {/* not-started-Todo Container */}
        <div className="not-started">
          <h4>Not started 🙅</h4>
          <ul>
            {data
              .filter((item) => item.status === "not_started")
              .map((item, i) => (
                <TodoCard
                  key={i}
                  data={item}
                  style="a"
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
          </ul>
          <div className="input">
            <button
              onClick={() => handleNewCard("not_started", newInputNotStarted)}
            >
              {" "}
              + New Card
            </button>
            <input
              className="a"
              ref={newInputNotStarted}
              placeholder="Add new card"
            />{" "}
          </div>
        </div>
        <div className="doing">
          <h4>Doing 💪</h4>
          <ul>
            {data
              .filter((item) => item.status === "doing")
              .map((item, i) => (
                <TodoCard
                  key={i}
                  data={item}
                  style="b"
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
          </ul>
          <div className="input">
            <button onClick={() => handleNewCard("doing", newInputDoing)}>
              {" "}
              + New Card
            </button>
            <input
              className="b"
              ref={newInputDoing}
              placeholder="Add new card"
            />{" "}
          </div>
        </div>
        {/* Done-Todo Container */}
        <div className="done">
          <h4>Done 😎</h4>
          <ul>
            {data
              .filter((item) => item.status === "done")
              .map((item, i) => (
                <TodoCard
                  key={i}
                  data={item}
                  style="c"
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
          </ul>
          <div className="input">
            <button onClick={() => handleNewCard("done", newInputDone)}>
              {" "}
              + New Card
            </button>
            <input
              className="c"
              ref={newInputDone}
              placeholder="Add new card"
            />{" "}
          </div>
        </div>
      </div>
      <h3 className="footer">Made with 💗 by Gaurav</h3>
    </div>
  );
}
