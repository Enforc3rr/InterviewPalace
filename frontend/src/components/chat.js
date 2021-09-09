import React from 'react'
import sock from '..';
import { useEffect, useState , useRef} from 'react';
import "./chat.css"
import { TextField } from '@material-ui/core';
import { useParams } from 'react-router';


const Chat = () => {
    const [ state, setState ] = useState({ message: ""})
	const [ chat, setChat ] = useState([])
    const [socket, setsocket] = useState()
    const {id: chatID} = useParams()
    // getting socket connection 

    useEffect(() => {
        const s = sock ; 
        setsocket(s)
        return () => {
          s.disconnect()
        }
    }, [])

    useEffect(() => {
        if(socket == null )return ; 
        socket.emit('chat-room', chatID); 
    }, [socket])
    
    
    useEffect(
		() => {
		    if(socket == null) return ; 
            socket.on("recieve-message", ({message }) => {
				setChat([ ...chat, { message } ])
			})
			return () => socket.disconnect()
		},
		[ chat ]
	)

	
    const onTextChange = (e) => {
		setState({ ...state, [e.target.value] : e.target.value })
	}

	const onMessageSubmit = (e) => {
        e.preventDefault()
        const { message } = state
		socket.emit('NEW_MESSAGE', { message})
		setState({ message: ""})
	}

	const renderChat = () => {
		return chat.map(({ message }, index) => (
			<div key={index}>
				<h3>
				  <span>{message}</span>
				</h3>
			</div>
		))
	}
 

	return (
		<div className="card">   
				{renderChat()}
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
                        // value={""}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>

		</div>
	)
}

export default Chat ; 