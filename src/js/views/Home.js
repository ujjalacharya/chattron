import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import ViewTitle from "../components/shared/ViewTitle";

import { fetchChats } from "../actions/chats";

export default function Home() {
  const dispatch = useDispatch();

  const chats = useSelector(({chats}) => {
    return chats.items
  })

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="content-wrapper">
      <Navbar />
      <div className="row no-gutters fh">
        <div className="col-3 fh">
        {console.log(chats)}
          <JoinedChats />
        </div>
        <div className="col-9 fh">
          <ViewTitle />
          <AvailableChats />
        </div>
      </div>
    </div>
  );
}
