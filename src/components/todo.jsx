import React from "react";

export default function TodoCard({ data, style, onUpdateStatus }) {
  const { id, title, status } = data;

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    onUpdateStatus(id, newStatus);
  };

  return (
    <li className={`${style} card`}>
      <p>{title}</p>
      <select name="status" value={status} onChange={handleStatusChange}>
        <option value="not_started">Not started</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
        <option className="delete" value="delete">
          Delete
        </option>
      </select>
    </li>
  );
}
