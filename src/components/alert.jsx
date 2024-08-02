import React, { useContext, useEffect } from "react";
import { MdDoneOutline } from "react-icons/md";
import { MdOutlineDangerous } from "react-icons/md";
import { AlertContext } from "../App";
function Alert() {
  const { alert, setAlert } = useContext(AlertContext);
  let color = "bg-green-500";
  let Icon = MdDoneOutline;
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert();
      }, 3 * 1000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);
  if (!alert) {
    return <></>;
  }
  if (alert.type == "error") {
    Icon = MdOutlineDangerous;
    color = "bg-red-500";
  }
  return (
    <div className="bg-gray-100">
      <div className="bg-white mx-16 flex justify-between pr-4">
        <div className="flex gap-10">
          <Icon className={"text-5xl " + color} />
          <p className="my-auto text-xl">{alert.message}</p>
        </div>
        <button
          className="my-auto underline text-blue-500"
          onClick={() => setAlert()}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
export default Alert;
