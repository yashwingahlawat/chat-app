import moment from "moment";

export const sampleChats = [
  {
    avatar: [
      "https://e0.pxfuel.com/wallpapers/907/658/desktop-wallpaper-monkey-d-luffy-finger-onepiece.jpg",
    ],
    name: "Luffy",
    _id: "1",
    groupChat: false,
    members: ["1", "4"],
  },
  {
    avatar: [
      "https://staticg.sportskeeda.com/editor/2022/09/e6fd1-16626714927177-1920.jpg?w=840",
    ],
    name: "Hancock",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/09/One-Piece-Nami.jpg",
    ],
    name: "Nami",
    _id: "3",
    groupChat: false,
    members: ["1", "3"],
  },
  {
    avatar: ["https://images4.alphacoders.com/122/1228259.png"],
    name: "Zoro",
    _id: "4",
    groupChat: false,
    members: [],
  },
  {
    avatar: [
      "https://preview.redd.it/how-strong-do-you-think-roger-is-v0-71hya1hc7hgb1.png?width=640&crop=smart&auto=webp&s=31d8e07d09ff0480342b48edfa8fcf13381a7ee5",
    ],
    name: "Roger",
    _id: "5",
    groupChat: false,
    members: ["7", "5"],
  },
  {
    avatar: [
      "https://64.media.tumblr.com/32bfc690704b8e2a6d58b31dbaa37869/ac7d2592b3aaa584-58/s1280x1920/d668037d59bd22bbd43843743d43b10b19f7d42a.png",
    ],
    name: "Robin",
    _id: "6",
    groupChat: false,
    members: ["8", "6"],
  },
  {
    avatar: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19F2EQ3nICeiJ_jhOhezRs-1yKG2_HsTp3uSrOH4UHf-_e6iEa4-nR1_BsmpBaZa14-A&usqp=CAU",
    ],
    name: "Sanji",
    _id: "7",
    groupChat: false,
    members: ["2", "7"],
  },
  {
    avatar: ["https://www.opgt.it/wp-content/uploads/2018/07/usop.jpg"],
    name: "Usopp",
    _id: "8",
    groupChat: false,
    members: ["1", "8"],
  },
  {
    avatar: [
      "https://www.toonsmag.com/wp-content/uploads/2023/09/naruto-1249229.jpg",

      "https://i.pinimg.com/474x/a5/fb/a9/a5fba945bd602a880076b5fb33e09f4c.jpg",
      "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/c42b9352-5f0d-45c8-9ac9-35cbf5cb0d4c/width=450/00101-2455810315.jpeg",
      "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Kakashi-Hatake.Naruto.webp",
    ],
    name: "Team 7",
    _id: "9",
    groupChat: true,
    members: ["6", "7", "8", "9"],
  },
];

export const sampleUsers = [
  {
    avatar: [
      "https://e0.pxfuel.com/wallpapers/907/658/desktop-wallpaper-monkey-d-luffy-finger-onepiece.jpg",
    ],
    name: "Luffy",
    _id: "1",
  },

  {
    avatar: [
      "https://staticg.sportskeeda.com/editor/2022/09/e6fd1-16626714927177-1920.jpg?w=840",
    ],
    name: "Hancock",
    _id: "2",
  },

  {
    avatar: [
      "https://64.media.tumblr.com/32bfc690704b8e2a6d58b31dbaa37869/ac7d2592b3aaa584-58/s1280x1920/d668037d59bd22bbd43843743d43b10b19f7d42a.png",
    ],
    name: "Robin",
    _id: "6",
  },
  {
    avatar: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19F2EQ3nICeiJ_jhOhezRs-1yKG2_HsTp3uSrOH4UHf-_e6iEa4-nR1_BsmpBaZa14-A&usqp=CAU",
    ],
    name: "Sanji",
    _id: "7",
  },
  {
    avatar: ["https://www.opgt.it/wp-content/uploads/2018/07/usop.jpg"],
    name: "Usopp",
    _id: "8",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: [
        "https://e0.pxfuel.com/wallpapers/907/658/desktop-wallpaper-monkey-d-luffy-finger-onepiece.jpg",
      ],
      name: "Luffy",
    },

    _id: "1",
  },

  {
    sender: {
      avatar: [
        "https://staticg.sportskeeda.com/editor/2022/09/e6fd1-16626714927177-1920.jpg?w=840",
      ],
      name: "Hancock",
    },
    _id: "2",
  },

  {
    sender: {
      avatar: [
        "https://64.media.tumblr.com/32bfc690704b8e2a6d58b31dbaa37869/ac7d2592b3aaa584-58/s1280x1920/d668037d59bd22bbd43843743d43b10b19f7d42a.png",
      ],
      name: "Robin",
    },
    _id: "6",
  },
  {
    sender: {
      avatar: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19F2EQ3nICeiJ_jhOhezRs-1yKG2_HsTp3uSrOH4UHf-_e6iEa4-nR1_BsmpBaZa14-A&usqp=CAU",
      ],
      name: "Sanji",
    },

    _id: "7",
  },
  {
    sender: {
      avatar: ["https://www.opgt.it/wp-content/uploads/2018/07/usop.jpg"],
      name: "Usopp",
    },

    _id: "8",
  },
];

export const sampleMessage = [
  {
    attachments: [
      {
        publicId: "erdfe",
        url: "https://i.redd.it/9g9139v90ihb1.jpg",
      },
    ],
    content: "This is a sample message",
    _id: "dededdeqadq",
    sender: {
      _id: "user._id",
      name: "chaman",
    },

    chat: "chatId",
    createdAt: Date.now(),
  },

  {
    attachments: [
      {
        publicId: "erdfe2",
        url: "https://i.redd.it/9g9139v90ihb1.jpg",
      },
    ],
    content: "This is a sample message 2",
    _id: "dededdeqadq2",
    sender: {
      _id: "dada",
      name: "chaman2",
    },

    chat: "chatId",
    createdAt: new Date(),
  },

  {
    attachments: [
      {
        publicId: "erdfe2",
        url: "https://i.redd.it/9g9139v90ihb1.jpg",
      },
    ],
    content: "This is a sample message 2",
    _id: "dededdeqadq2",
    sender: {
      _id: "dada",
      name: "chaman2",
    },

    chat: "chatId",
    createdAt: new Date(),
  },

  {
    attachments: [
      {
        publicId: "erdfe2",
        url: "https://i.redd.it/9g9139v90ihb1.jpg",
      },
    ],
    content: "This is a sample message 2",
    _id: "dededdeqadq2",
    sender: {
      _id: "dada",
      name: "chaman2",
    },

    chat: "chatId",
    createdAt: new Date(),
  },

  {
    attachments: [
      {
        publicId: "erdfe2",
        url: "https://i.redd.it/9g9139v90ihb1.jpg",
      },
    ],
    content: "This is a sample message 2",
    _id: "dededdeqadq2",
    sender: {
      _id: "dada",
      name: "chaman2",
    },

    chat: "chatId",
    createdAt: new Date(),
  },
];

export const themeBlue = "#ea7070";
export const black = "#333333";

export const dashboardData = {
  users: [
    {
      _id: "1",
      name: "Luffy",
      avatar:
        "https://e0.pxfuel.com/wallpapers/907/658/desktop-wallpaper-monkey-d-luffy-finger-onepiece.jpg",
      userName: "luffy",
      role: "user",
      friends: 900,
      groups: 12,
      joinedOn: moment.now(),
    },
    {
      _id: "2",
      name: "Boa Hancock",
      avatar:
        "https://staticg.sportskeeda.com/editor/2022/09/e6fd1-16626714927177-1920.jpg?w=840",
      userName: "boaHancock",
      role: "user",
      friends: 90,
      groups: 8,
      joinedOn: moment.now(),
    },
  ],

  chats: [
    {
      name: "Straw Hats Trio",

      _id: "10",
      groupChat: true,
      avatar:
        "https://ih1.redbubble.net/image.3631691855.0788/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
      members: [
        {
          _id: "1",
          avatar:
            "https://e0.pxfuel.com/wallpapers/907/658/desktop-wallpaper-monkey-d-luffy-finger-onepiece.jpg",
        },
        {
          _id: "7",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT19F2EQ3nICeiJ_jhOhezRs-1yKG2_HsTp3uSrOH4UHf-_e6iEa4-nR1_BsmpBaZa14-A&usqp=CAU",
        },
        {
          _id: "4",
          avatar: "https://images4.alphacoders.com/122/1228259.png",
        },
      ],
      totalMembers: 3,
      totalMessages: 300,
      creator: {
        name: "Luffy",
        avatar:
          "https://e0.pxfuel.com/wallpapers/907/658/desktop-wallpaper-monkey-d-luffy-finger-onepiece.jpg",
      },
    },
  ],
  messages: [
    {
      attachments: [
        {
          publicId: "erdfe",
          url: "https://i.redd.it/9g9139v90ihb1.jpg",
        },
      ],
      content: "This is a sample message",
      _id: "dededdeqadq",
      sender: {
        _id: "user._id",
        name: "Robin",
        avatar:
          "https://64.media.tumblr.com/32bfc690704b8e2a6d58b31dbaa37869/ac7d2592b3aaa584-58/s1280x1920/d668037d59bd22bbd43843743d43b10b19f7d42a.png",
      },
      groupChat: false,
      chat: "chatId",

      createdAt: Date.now(),
    },
  ],
};
