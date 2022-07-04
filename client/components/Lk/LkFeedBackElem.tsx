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
  anonimId?: number;
}

const LkFeedBackElem = ({
  id,
  messages,
  name,
  rate,
  isChatOpen,
  setWhatMessageOpen,
  setIsChatOpen,
  anonimId
}: ILkFeedBackElem) => {
  const clickHandler = () => {
    setIsChatOpen(true)
    setWhatMessageOpen(anonimId || 100)
  }

  return (
    <div>
      <div className="LeftSide">
        <div className="LeftSideWrapper">
          <h3>{name}</h3>
          <span>05/30/2022</span>
          <span>14:00</span>
        </div>
        <h4>
          {messages?.length
            ? `${messages}...`
            : null}
        </h4>
      </div>
      <div className="RightSide">
        <button onClick={clickHandler}>Open</button>
      </div>
    </div>
  );
};

export default LkFeedBackElem;
