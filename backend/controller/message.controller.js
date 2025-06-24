import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';
import { errorHandler } from '../utilities/errorHandler.utility.js';
import { asyncHandler } from '../utilities/asyncHandler.utility.js';
import { getSocketId, io } from '../socket/socket.js';


export const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.user._id;
    const recieverId = req.params.recieverId;
    const message = req.body.message;

    if (!senderId || !recieverId || !message) {
        return next(new errorHandler('please provide all fields', 400));
    }

    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, recieverId]
        })
    }

    const newMessage = await Message.create({
        senderId,
        recieverId,
        message
    });

    if (newMessage) {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    //socket.io 
    const socketId = getSocketId(recieverId)
    console.log("reciever socket id" + socketId)
    io.to(socketId).emit("newMessage", newMessage)

    return res.status(200).json({
        success: true,
        responseData: newMessage,
    })
});
export const getMessages = asyncHandler(async (req, res) => {
    const myId = req.user._id;
    const otherParticipantId = req.params.otherParticipantId;

    if (!myId || !otherParticipantId) {
        return next(new errorHandler('please provide all fields', 400));
    }

    let conversation = await Conversation.findOne({
        participants: { $all: [myId, otherParticipantId] },
    }).populate("messages");

    return res.status(200).json({
        success: true,
        responseData: conversation,
    });
})