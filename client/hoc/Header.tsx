import Link from "next/link";
import React, {useEffect} from "react";
import { PropsWithChildren } from "react";
import face from "./../assets/face.png";
import BackSvg from "./../components/svg/BackSvg";
import useTypedSelector from "../hooks/useTypedSelector";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {setLoading} from "./../redux/slices/AppSlice"
import {clearUser, setUser} from "./../redux/slices/UserSlice"
import axios from "axios";
import {back_url} from "../vars";

interface HeaderI {
  children?: React.ReactNode;
}

const Header: React.FC<PropsWithChildren<HeaderI>> = ({ children }) => {

  const router = useRouter()

  const isAuth = useTypedSelector(state => state.user.isAuth)

  const dispatch = useDispatch()

  useEffect(() => {
    async function entering() {
      try {
        dispatch(setLoading(true))
        const token = localStorage.getItem('token')
        if (isAuth == false && !token) {
          router.push('/')
        }
        if (token) {
          const {data} = await axios.get(`${back_url}/auth/check`, { headers: { Authorization: `Bearer ${token}` }})
          if (!data.isAuth) {
            dispatch(clearUser(null))
            router.push('/')
          } else {
            dispatch(setUser(token))
          }
        }
        dispatch(setLoading(false))
      } catch (e) {
        dispatch(setLoading(false))
        console.log(e)
      }
    }
    entering()
  }, [])

  const clickExitHandler = () => {
    dispatch(clearUser(null))
    router.push('/')
  };

  return (
    <>
      <header className="Header">
        <div className="ExitWrapper">
          <div onClick={clickExitHandler}>
            <BackSvg />
            <span>Exit</span>
          </div>
        </div>
        <div className="data">
          <span>Nursultan Askarbekuly</span>
          <img src={face.src} alt="face" />
        </div>
      </header>
      {children}
    </>
  );
};

export default Header;
