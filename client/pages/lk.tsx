import Header from "../hoc/Header";
import LkCreateSession from "../components/Lk/LkCreateSession";

const Lk = () => {
  return (
    <Header>
      <div className="LkMainPage">
        <LkCreateSession />
      </div>
    </Header>
  );
};

export default Lk;
