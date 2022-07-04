import React, { Dispatch, SetStateAction } from "react";
import { IFeedBack } from "../../pages/lk/session/[:id]";

interface ILkFeedBackElem {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  setWhatMessageOpen: Dispatch<SetStateAction<number>>;
  id: number;
  name: string;
  messages?: string;
  rate?: number;
  createdAt?: string;
  anonimId?: number;
  isProfessor?: boolean;
}

const LkFeedBackElem = ({
  id,
  messages,
  name,
  rate,
  isChatOpen,
  setWhatMessageOpen,
  setIsChatOpen,
  anonimId,
  isProfessor,
  createdAt,
}: ILkFeedBackElem) => {
  const clickHandler = () => {
    setIsChatOpen(true)
    setWhatMessageOpen(anonimId || 100)
  }

  console.log(createdAt)

  return (
    <div className={isProfessor || anonimId == 100 ? "ProfessorColor" : ""}>
      <div className="LeftSide">
        <div className="LeftSideWrapper">
          <h3>{isProfessor || anonimId == 100 ? "Professor" : name}</h3>
          <span>{createdAt?.split('T')[0]}</span>
          <span>{createdAt?.split('T')[1].split('.')[0]}</span>
        </div>
        <h4>
          {messages?.length
            ? `${messages}`
            : null}
        </h4>
      </div>
      {isProfessor || anonimId == 100
        ? null
        : <div className="RightSide">
            <button onClick={clickHandler}>Open</button>
          </div>}

    </div>
  );
};

export default LkFeedBackElem;
