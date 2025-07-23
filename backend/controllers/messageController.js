const Message = require("../models/Message");
const User = require("../models/User");
const mongoose = require("mongoose");

// Envoyer un message
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    const senderId = req.user.id;

    if (!receiverId || !content) {
      return res.status(400).json({
        success: false,
        message: "ID du destinataire et contenu requis",
      });
    }

    // Vérifier que le destinataire existe
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Destinataire non trouvé",
      });
    }

    // Générer l'ID de conversation
    const conversationId = Message.generateConversationId(senderId, receiverId);

    // Créer le message
    const message = new Message({
      senderId,
      receiverId,
      content: content.trim(),
      conversationId,
    });

    await message.save();

    // Populer les informations utilisateur
    await message.populate([
      {
        path: "senderId",
        select: "email userType firstName lastName companyName",
      },
      {
        path: "receiverId",
        select: "email userType firstName lastName companyName",
      },
    ]);

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (err) {
    console.error("Erreur sendMessage:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de l'envoi du message",
    });
  }
};

// Récupérer les conversations d'un utilisateur
exports.getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    // Récupérer les derniers messages de chaque conversation
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: mongoose.Types.ObjectId(userId) },
            { receiverId: mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: "$conversationId",
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiverId", mongoose.Types.ObjectId(userId)] },
                    { $eq: ["$read", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "lastMessage.senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "lastMessage.receiverId",
          foreignField: "_id",
          as: "receiver",
        },
      },
      {
        $addFields: {
          otherUser: {
            $cond: [
              {
                $eq: ["$lastMessage.senderId", mongoose.Types.ObjectId(userId)],
              },
              { $arrayElemAt: ["$receiver", 0] },
              { $arrayElemAt: ["$sender", 0] },
            ],
          },
        },
      },
      {
        $project: {
          conversationId: "$_id",
          lastMessage: {
            content: "$lastMessage.content",
            createdAt: "$lastMessage.createdAt",
            senderId: "$lastMessage.senderId",
          },
          unreadCount: 1,
          otherUser: {
            _id: 1,
            email: 1,
            userType: 1,
            firstName: 1,
            lastName: 1,
            companyName: 1,
          },
        },
      },
      {
        $sort: { "lastMessage.createdAt": -1 },
      },
    ]);

    res.json({
      success: true,
      data: conversations,
    });
  } catch (err) {
    console.error("Erreur getConversations:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des conversations",
    });
  }
};

// Récupérer les messages d'une conversation
exports.getMessages = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.user.id;

    // Générer l'ID de conversation
    const conversationId = Message.generateConversationId(userId, otherUserId);

    // Récupérer les messages
    const messages = await Message.find({ conversationId })
      .populate("senderId", "email userType firstName lastName companyName")
      .populate("receiverId", "email userType firstName lastName companyName")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      data: messages,
    });
  } catch (err) {
    console.error("Erreur getMessages:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des messages",
    });
  }
};

// Marquer les messages comme lus
exports.markAsRead = async (req, res) => {
  try {
    const { otherUserId } = req.params;
    const userId = req.user.id;

    const conversationId = Message.generateConversationId(userId, otherUserId);

    await Message.updateMany(
      {
        conversationId,
        receiverId: userId,
        read: false,
      },
      { read: true },
    );

    res.json({
      success: true,
      message: "Messages marqués comme lus",
    });
  } catch (err) {
    console.error("Erreur markAsRead:", err);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la mise à jour",
    });
  }
};
