const ChatRoom = require("../models/ChatRoomModel");

exports.createRoom = async (req, res) => {
    try {
        const { name, Admin } = req.body;

        if (!name || !Admin) {
            return res.status(400).json({
                status: false,
                message: "Either name or Admin is missing"
            });
        }

        // Create the room
        let room = await ChatRoom.create({ name, Admin });

        return res.status(200).json({
            status: true,
            data: room,
            message: "Room created successfully"
        });
    } catch (err) {
        console.error("Error in creating room:", err);
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Error in creating room"
        });
    }
};

exports.findChatRoom = async (req, res) => {
    try {
        const { name, Admin } = req.body;
        console.log(name,Admin)

        if (!name || !Admin) {
            return res.status(400).json({
                status: false,
                message: "Either name or Admin is missing"
            });
        }

        // Create the room
        let room = await ChatRoom.findOne({name, Admin });

        return res.status(200).json({
            status: true,
            data: room,
            message: "Room created successfully"
        });
    } catch (err) {
        console.error("Error in creating room:", err);
        return res.status(500).json({
            status: false,
            error: err.message,
            message: "Error in creating room"
        });
    }
};
