import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import JoinedChats from "../components/JoinedChats";
import AvailableChats from "../components/AvailableChats";
import ViewTitle from "../components/shared/ViewTitle";
import { fetchChats } from "../api/chats";

export default function Home() {
  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div className="content-wrapper">
      <Navbar />
      <div className="row no-gutters fh">
        <div className="col-3 fh">
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
