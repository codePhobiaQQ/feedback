import React, { useEffect, useState } from "react";
import Header from "../../../hoc/Header";
import Link from "next/link";
import BackSvg from "../../../components/svg/BackSvg";
import LkListElem from "../../../components/Lk/LkListElem";
import LkFeedBackElem from "../../../components/Lk/LkFeedBackElem";
import Chat from "../../../components/Lk/Chat";
import copy from "./../../../assets/copy.svg";
import axios from "axios";
// @ts-ignore
import io from "socket.io-client";
import { back_url, front_url } from "../../../vars";
import { IListElem } from "../../../components/Lk/LkSessionsList";
import { useRouter } from "next/router";
import AnonimForm from "../../../components/Lk/AnonimForm";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useTypedSelector from "../../../hooks/useTypedSelector";

export interface IFeedBack {
  id: number;
  name: string;
  value?: string;
  rate?: number;
  anonimName?: string;
  anonim?: number;
  createdAt?: string;
  isProfessor?: boolean;
}

const SessionPage = () => {
  const [session, setSession] = useState<IListElem>({} as IListElem);
  const [feedback, setFeedback] = useState<IFeedBack[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const userId = useTypedSelector((state) => state.user.user.id);
  const [isCopy, setIsCopy] = useState<string>("");
  const [isCopyFlag, setIsCopyFlag] = useState<boolean>(false);
  const [rateProf, setRate] = useState<number>(5);
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const route = useRouter();

  async function fetchSessions() {
    try {
      if (route.isReady) {
        setIsCopy(front_url + route.asPath);
        const id = route.asPath.split("/")[3];
        const { data } = await axios.get(`${back_url}/session/${id}`);
        const feedbackResponse = await axios.get(`${back_url}/message/${id}`);
        setFeedback(feedbackResponse.data);
        setSession(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function play() {
    const audio = document.getElementById("a1");
    // @ts-ignore
    audio.currentTime = 0;
    // @ts-ignore
    audio?.play();
    // setTimeout(() => {
    //   // @ts-ignore
    //   audio?.pause();
    // }, 3000);
  }

  useEffect(() => {
    fetchSessions();
  }, [route.isReady]);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [whatMessageOpen, setWhatMessageOpen] = useState<number>(0);

  const chatOpenHandler = () => {
    setIsChatOpen(true);
  };

  const socket = io(back_url, { transports: ["websocket"] });

  useEffect(() => {
    socket.on("message", ({ data }) => {
      if (!data.isProfessor) {
        console.log("here");
        play();
      }
      console.log(data);
      setFeedback((prevState) => [...prevState, data]);
    });
  }, []);

  useEffect(() => {
    let sum = 0;
    let howRates = 0;
    feedback.forEach((el) => {
      if (el.rate) {
        sum += Number(el.rate);
        howRates += 1;
      }
    });
    if (howRates != 0) {
      sum /= howRates;
    }
    setRate(sum);
  }, [feedback]);

  const copyHandler = () => {
    setIsCopyFlag(true);
    setIsCopy(front_url + "/lk/session/" + route.asPath.split("/")[3]);
  };

  return (
    <Header>
      {userId == session.userId ? (
        <>
          <section className="SessionPage">
            <audio
              src={
                "https://zvukitop.com/wp-content/uploads/2021/03/zvuk-uvedomleniya-imassage-iph.mp3"
              }
              id="a1"
            ></audio>
            <div className="container">
              <Link href="/lk">
                <a className={"BackLink"}>
                  Back
                  <BackSvg />
                </a>
              </Link>
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
                  <span>{session.createdAt?.split("T")[0]}</span>
                </p>
                <p className="time">
                  <span>Time:</span>
                  <span>{session.createdAt?.split("T")[1].split(".")[0]}</span>
                </p>
              </div>
              <p className="status">
                <span>Status:</span>
                {session.status} the session
              </p>
              {/*<button className="CloseSession">Close Session</button>*/}
              <p className="status copy">
                <span>Copy Link:</span>
                <CopyToClipboard text={isCopy} onCopy={() => copyHandler()}>
                  <img src={copy.src} alt="copy" />
                </CopyToClipboard>
              </p>
              <p className="status copy StartsElem">Stars: {rateProf}</p>
              <h2 className="FeedbackTitle">Feedback List:</h2>
              <ul className="FeedbackListWrapper">
                {feedback.length != 0 ? (
                  feedback.map((feedbackElem, index) => (
                    <li
                      className={"LkSessionListElem"}
                      key={"LkListElem" + index}
                    >
                      <LkFeedBackElem
                        id={feedbackElem.id}
                        name={feedbackElem.anonimName || "Anonim"}
                        messages={feedbackElem.value}
                        anonimId={feedbackElem.anonim || 100}
                        rate={feedbackElem.rate}
                        createdAt={feedbackElem.createdAt}
                        setIsChatOpen={setIsChatOpen}
                        isChatOpen={isChatOpen}
                        isProfessor={feedbackElem.isProfessor}
                        setWhatMessageOpen={setWhatMessageOpen}
                      />
                    </li>
                  ))
                ) : (
                  <span className="NoMessages">No feedbacks yet.</span>
                )}
              </ul>
              {/*<h3>Send feedback</h3>*/}
              {/*<input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text"/>*/}
              {/*<button onClick={sendMessageHandler}>Send</button>*/}
            </div>
          </section>
          <Chat
            anonimId={whatMessageOpen}
            session={session}
            socket={socket}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
          />
        </>
      ) : (
        <AnonimForm socket={socket} session={session} />
      )}
    </Header>
  );
};

export default SessionPage;
