import Link from "next/link";
import LkListElem from "./LkListElem";

const LkSessionsList = () => {
  return (
    <section className="LkSessionList">
      <div className="container">
        <h2>Active sessions:</h2>
        <ul>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
          <li className="LkSessionListElem">
            <LkListElem />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LkSessionsList;
