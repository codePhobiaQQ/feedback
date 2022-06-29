import {Dispatch, SetStateAction, useState} from "react";
import Close from "../svg/Close";
import { AnimatePresence, motion } from "framer-motion";
import { FadeInMotionOpacity, ChatUp } from "../../motions/FadeMotion";
import {IListElem} from "./LkSessionsList";
import axios from "axios";
import {back_url} from "../../vars";

interface IChat {
  isChatOpen: boolean;
  setIsChatOpen: Dispatch<SetStateAction<boolean>>;
  socket: any;
  session: IListElem;
  anonimId: number;
}

const Chat = ({ isChatOpen, setIsChatOpen, socket, session, anonimId }: IChat) => {
  const [answerValue, setAnswerValue] = useState<string>("")

  const sendFeedback = async () => {
    try {
      let message;
      message = await axios.post(`${back_url}/message`, { value: answerValue, sessionId: session.id })
      socket.emit('message',
        { data: { value: answerValue, sessionId: session.id, id: message.data.id, anonim: anonimId, isProfessor: true } })

      setIsChatOpen(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          variants={FadeInMotionOpacity()}
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={0}
          className={"ChatPopup"}
        >
          <motion.div
            variants={ChatUp(0)}
            className={isChatOpen ? "ChatPopupInner active" : "ChatPopupInner"}
          >
            <Close onClick={setIsChatOpen} value={false} />
            <div className={"TopLineWrapper"}>
              {/*<span>23/07/2020</span>*/}
              {/*<span>14:00</span>*/}
            </div>
            {/*<div className="Stars">stars</div>*/}

            <textarea
              placeholder="Type the answer..."
              className="MessageField"
              value={answerValue}
              onChange={(e) => setAnswerValue(e.target.value)}
            />
            <button onClick={sendFeedback}>Answer</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chat;
