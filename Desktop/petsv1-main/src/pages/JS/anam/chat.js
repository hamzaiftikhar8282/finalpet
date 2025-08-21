// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const backendURL = 'http://localhost:5000';

// const UserListWithChat = ({ user }) => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');

//   useEffect(() => {
//     axios.get(`${backendURL}/api/users`).then(res => setUsers(res.data));
//   }, []);

//   useEffect(() => {
//     if (selectedUser) {
//       axios.get(`${backendURL}/api/messages/${user.id}/${selectedUser._id}`)
//         .then(res => setMessages(res.data));
//     }
//   }, [selectedUser]);

//   // ✅ Send Message
//   const sendMessage = async () => {
//     if (!inputMessage.trim()) return;

//     const msg = {
//       senderId: user.id,
//       receiverId: selectedUser._id,
//       content: inputMessage,
//     };

//     const res = await axios.post(`${backendURL}/api/messages`, msg);
//     setMessages([...messages, res.data]);
//     setInputMessage('');
//   };

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* User List */}
//       <div style={{ width: '200px', borderRight: '1px solid gray' }}>
//         <h3>Users</h3>
//         {users.filter(u => u._id !== user.id).map(u => (
//           <div key={u._id} onClick={() => setSelectedUser(u)}
//             style={{
//               padding: '10px',
//               cursor: 'pointer',
//               background: selectedUser?._id === u._id ? '#ddd' : '#fff'
//             }}>
//             {u.name}
//           </div>
//         ))}
//       </div>

//       {/* Chat Section */}
//       <div style={{ flex: 1, padding: '10px' }}>
//         {selectedUser ? (
//           <>
//             <h3>Chat with {selectedUser.name}</h3>
//             <div style={{ height: '300px', overflowY: 'auto', border: '1px solid gray', padding: '5px' }}>
//               {messages.map(m => (
//                 <div key={m._id} style={{ margin: '5px 0' }}>
//                   <strong>{m.senderId === user.id ? 'You' : selectedUser.name}:</strong> {m.content}
//                 </div>
//               ))}
//             </div>
//             <div>
//               <input value={inputMessage} onChange={e => setInputMessage(e.target.value)} />
//               <button onClick={sendMessage}>Send</button>
//             </div>
//           </>
//         ) : <p>Select a user to start chatting</p>}
//       </div>
//     </div>
//   );
// };

// export default UserListWithChat;
