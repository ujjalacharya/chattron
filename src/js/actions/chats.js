import * as api from "../api/chats";
import db from "../db/firestore";

export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({ type: "CHATS_FETCH_INIT" });
  const chats = await api.fetchChats();

  chats.forEach(
    (chat) => (chat.joinedUsers = chat.joinedUsers.map((user) => user.id))
  );

  const sortedChats = chats.reduce(
    (accuChats, chat) => {
      accuChats[
        chat.joinedUsers.includes(user.uid) ? "joined" : "available"
      ].push(chat);
      return accuChats;
    },
    { joined: [], available: [] }
  );

  dispatch({
    type: "CHATS_FETCH_SUCCESS",
    ...sortedChats,
  });

  return sortedChats;
};

export const joinChat = (chat, uid) => (dispatch) =>
  api.joinChat(uid, chat.id).then((_) => {
    dispatch({ type: "CHATS_JOIN_SUCCESS", chat });
  });

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = db.doc(`profiles/${userId}`);

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_JOIN_SUCCESS", chat: { ...newChat, id: chatId } });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS" });
  return chatId;
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, (chat) => {
    dispatch({ type: "CHATS_SET_ACTIVE_CHAT", chat });
  });
