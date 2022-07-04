import React, {useEffect, useState, useRef} from "react";
import {IListElem} from "./LkSessionsList";
import {AnimatePresence, motion} from "framer-motion";
import {FadeInMotionOpacity, FadeInMotion} from "../../motions/FadeMotion";
import axios from "axios";
import io from "socket.io-client";
import { back_url } from "../../vars";
import {IFeedBack} from "../../pages/lk/session/[:id]";

interface IAnonimForm {
  session: IListElem;
  socket: any;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const AnonimForm = ({session, socket}: IAnonimForm) => {
  const anonimId = useRef<number>(0)
  const index = useRef<number>(0)
  const [inputValue, setInputValue] = useState<string>("")
  const [inputNameValue, setInputNameValue] = useState<string>("")
  const [isNamePopupOpen, setNamePopupOpen] = useState<boolean>(false)
  const [isThanksPopupOpen, setThanksPopupOpen] = useState<boolean>(false)
  const [messages, setMessages] = useState<IFeedBack[]>([])

  const cancelClose = (e: any) => {
    e.stopPropagation()
  }

  const sendFeedback = async () => {


    try {
      let message;
      if (inputNameValue != "") {
        message = await axios.post(`${back_url}/message`, { value: inputValue, sessionId: session.id, anonimName: inputNameValue, anonim: anonimId.current })
      } else {
        message = await axios.post(`${back_url}/message`, { value: inputValue, sessionId: session.id, anonimName: "Anonim", anonim: anonimId.current })
      }
      socket.emit('message',
        { data: { anonimName: inputNameValue, anonim: anonimId.current, value: inputValue, sessionId: session.id, id: message.data.id, createdAt: new Date() } })

      // @ts-ignore
      setMessages(prevState => [...prevState, { anonim: anonimId.current, value: inputValue, anonimName: inputNameValue, id: 1 }])

      setNamePopupOpen(false)
      setThanksPopupOpen(true)
      setTimeout(() => {
        setThanksPopupOpen(false)
      }, 2000)
    } catch (e) {
      console.log(e)
    }
  }

  const firstSubmit = () => {
    if (inputValue) {
      setNamePopupOpen(true)
    }
  }

  const fastReactionHandler = (text: string) => {
    setInputValue(text)
    firstSubmit()
  }

  useEffect(() => {
    anonimId.current = getRandomInt(10000)
  }, [])

  useEffect(() => {
    socket.on('message', ({data}: any) => {
      console.log(data.anonim, anonimId.current, "test")
      if (data.anonim == anonimId.current && data.isProfessor) {
        index.current += 1
        setMessages(prevState => [...prevState, data])
      }
    })
  }, [])

  return (
    <section className="AnonimFormWrapper">
      <div className="AnonimForm">
        <div className="LeftSide">
          {/*<h2><span>Session:</span> {session.TitleSession}</h2>*/}
          {/*<h2><span>Course:</span>{session.TitleCourse}</h2>*/}
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type some comments on the class"
            type="text"
          />
          <button onClick={firstSubmit}>Submit</button>
          <span className="FastReactionsSpan">Fast reactions:</span>
          <ul className="FastReactions">
            <li onClick={() => fastReactionHandler("Cool!")}>Cool!</li>
            <li onClick={() => fastReactionHandler("Sound issues")}>Sound issues</li>
            <li onClick={() => fastReactionHandler("It's very stuffy here")}>It's very stuffy here</li>
            <li onClick={() => fastReactionHandler("Nice English!")}>Nice English!</li>
            <li onClick={() => fastReactionHandler("Boring")}>Boring</li>
            <li onClick={() => fastReactionHandler("Let’s have a break!")}>Let’s have a break!</li>
          </ul>
        </div>
        <div className="RightSide">
          <h2>
            <span>Session:</span>
            <span>{session.TitleSession}</span>
          </h2>
          <h2>
            <span>Course:</span>
            <span>{session.TitleCourse}</span>
          </h2>
          <div className="dateWrap">
            <p className="date">
              <span>Date:</span>
              <span>{session.createdAt?.split('T')[0]}</span>
            </p>
            <p className="time">
              <span>Time:</span>
              <span>{session.createdAt?.split('T')[1].split('.')[0]}</span>
            </p>
          </div>
          <p className="status">
            <span>Status:</span>
            {session.status} the session
          </p>
        </div>
      </div>

      <div className="MyMessages">
        <ul>
          {messages.map((message, index) => (
            <li className={message.isProfessor ? "professor" : ""} key={"anonimMessage" + index}>{message.value}</li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {isNamePopupOpen && <motion.div
          variants={FadeInMotionOpacity(0)}
          onClick={() => setNamePopupOpen(false)}
          className="NamePopupWrapper"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={FadeInMotion(1)}
            className="NamePopup"
            onClick={cancelClose}
          >
            <h2>Do you want to enter your name?</h2>
            <input
              value={inputNameValue}
              onChange={(e) => setInputNameValue(e.target.value)}
              type="text"
              placeholder="Your name"
            />
            <div className="ButtonsWrap">
              <button onClick={sendFeedback}>Submit</button>
              <button onClick={sendFeedback}>Stay anonymous</button>
            </div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence>
        {isThanksPopupOpen && <motion.div
          variants={FadeInMotionOpacity(0)}
          onClick={() => setThanksPopupOpen(false)}
          className="NamePopupWrapper PushPopup"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            variants={FadeInMotion(1)}
            className="NamePopup"
            onClick={cancelClose}
          >
            <h3>Your feedback has been sent successfully. Thanks!</h3>
          </motion.div>
        </motion.div>}
      </AnimatePresence>

    </section>
  );
};

export default AnonimForm;
