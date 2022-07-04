import Link from "next/link";
import { fixNumbs } from "./../../services/DataGenerator"
import { IListElem } from "./LkSessionsList";
import axios from "axios";
import { back_url } from "../../vars";

const LkListElem = ({
  TitleCourse,
  TitleSession,
  day,
  id,
  month,
  year,
  fetchSessions,
}: IListElem) => {
  const dellHandler = async (e: any) => {
    e.stopPropagation()
    await axios.delete(`${back_url}/session/${id}`)
    fetchSessions()
  }

  return (
    <div className="ListElemWrapper">
      <div className="LeftSide">
        <div className="LeftSideWrapper">
          <h3>{TitleCourse}</h3>
          <span>{fixNumbs(month)}/{fixNumbs(day)}/{year}</span>
        </div>
        <h4>{TitleSession}</h4>
        <ul className="FastReactions">

        </ul>
      </div>
      <div className="RightSide">
        <button onClick={dellHandler} style={{marginRight: "10px"}}>Delete</button>
        <Link href={`/lk/session/${id}`}>
          <a>
            <button>View Details</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default LkListElem;
