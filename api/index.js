import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http"
import express from "express"
import cors from "cors"
import { EmojisAPI } from "./emojis-api.js";
import { ENV }  from './config.js'
import { videoToken } from "./tokens.js";

const app = express()
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};

app.use(cors())
app.use(express.json())
app.post("/video/token", cors(corsOptions), (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, ENV);
  sendTokenResponse(token, res);
});

const httpServer = http.createServer(app)

// 1
const typeDefs = gql`
  # Server - channel - summary queryable fields.
  type Summary {
    _id: ID!
    title: String
    to: String
    notification: String
  }

  type Channel {
    _id: ID!
    title: String
    summary: [Summary]
  }

  type Server {
    _id: ID!
    title: String
    img: String
    alt: String
    content: String
    path: String
    channels: [Channel]
  }
  # users queryable fields
  type Users {
    _id: ID
    role: String
    name: String
    hash: String
    state: Int
    img: String
  }
  type UsersRoles {
    _id: ID
    _id_server: ID
    name: String
    users: [Users]
  }
  # comments querysable fields
  type React {
    unicode: String
    count: Int
    emoji: String
  }
  type CommentReply {
    _id: ID
    role: String
    nombre: String
    texto: String
    url: String
    img: Boolean
  }
  type Comment {
    _id: ID
    texto: String
    img: String
    date: String
    url: String
    react: [React]
    _id_user: ID
    comment_reply: CommentReply
    user: Users
  }
  type CComment {
    _id_channel: ID
    title: String
    comments: [Comment]
  }
  # Emojis api
  type Emojis {
    id: Int
    emoji: String
    unicode: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  # // Entry points
  type Query {
    findUsersRoles(_id_server: ID!): [UsersRoles]
    servers: [Server]
    getUsers: [Users]
    findServer(_id: ID!): Server
    findComment(_id_server: ID!, _id_channel: ID!): CComment
    findEmojis(id: Int): Emojis
  }
`;
// 2 Data source
const cloudinaryFetch ="https://res.cloudinary.com/demo/image/fetch/q_auto/";
const servers = [
  {
    _id: "1",
    title: "Ivanrice",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
    alt: "server, Ivanrice",
    content: "61",
    path: "/1/1",
    channels: [
      {
        title: "------ welcome --------",
        _id: "1",
        summary: [
          {
            _id: "1",
            title: "Introduction",
            to: "/1/1",
            notification: "0",
          },
          {
            _id: "5",
            title: "General",
            to: "/1/5",
            notification: "0",
          },
        ],
      },
      {
        title: "------ music/art -------",
        _id: "2",
        summary: [
          {
            _id: "2",
            title: "art-general",
            to: "/1/2",
            notification: "2",
          },
          {
            _id: "3",
            title: "music-general",
            to: "/1/3",
            notification: "0",
          },
          {
            _id: "4",
            title: "recommendation",
            to: "/1/4",
            notification: "24",
          },
        ],
      },
      {
        title: "------- Gaming --------",
        _id: "3",
        summary: [
          {
            _id: "6",
            title: "gaming-general",
            to: "/1/6",
            notification: "0",
          },
          {
            _id: "7",
            title: "overwatch",
            to: "/1/7",
            notification: "250",
          },
          {
            _id: "8",
            title: "forza horizon",
            to: "/1/8",
            notification: "1",
          },
        ],
      },
    ],
  },
  {
    _id: "2",
    title: "Healthy Gamer",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/hg_logo_idpz31.png",
    alt: "server, Healthy Gamer GG",
    content: "8",
    path: "/2/1",
    channels: [
      {
        title: "- Welcome and rules",
        _id: "1",
        summary: [
          {
            _id: "1",
            title: "extra-roles",
            to: "/2/1",
            notification: "0",
          },
        ],
      },
      {
        title: "- important",
        _id: "2",
        summary: [
          {
            _id: "2",
            title: "announcements",
            to: "/2/2",
            notification: "0",
          },
          {
            _id: "3",
            title: "calendar",
            to: "/2/3",
            notification: "9",
          },
        ],
      },
      {
        title: "- resources",
        _id: "3",
        summary: [
          {
            _id: "4",
            title: "therapy_harassment",
            to: "/2/4",
            notification: "0",
          },
          {
            _id: "5",
            title: "calendar",
            to: "/2/5",
            notification: "0",
          },
        ],
      },
      {
        title: "- hg services",
        _id: "4",
        summary: [
          {
            _id: "6",
            title: "coaching_questions",
            to: "/2/6",
            notification: "789",
          },
          {
            _id: "7",
            title: "gu_ide_help-desk",
            to: "/2/7",
            notification: "0",
          },
          {
            _id: "8",
            title: "gu_ide_suggestions",
            to: "/2/8",
            notification: "24",
          },
          {
            _id: "9",
            title: "gu_ide_bug-reports",
            to: "/2/9",
            notification: "0",
          },
        ],
      },
      {
        title: "- hg content",
        _id: "5",
        summary: [
          {
            _id: "10",
            title: "gu_ide_discussion",
            to: "/2/10",
            notification: "0",
          },
          {
            _id: "11",
            title: "content_discussion",
            to: "/2/11",
            notification: "0",
          },
        ],
      },
      {
        title: "- growth",
        _id: "6",
        summary: [
          {
            _id: "12",
            title: "improvement_general",
            to: "/2/12",
            notification: "0",
          },
          {
            _id: "13",
            title: "pogchamp",
            to: "/2/13",
            notification: "0",
          },
          {
            _id: "14",
            title: "life_purpose_and_dharma",
            to: "/2/14",
            notification: "957",
          },
          {
            _id: "15",
            title: "study_of_self",
            to: "/2/15",
            notification: "0",
          },
          {
            _id: "16",
            title: "careers",
            to: "/2/16",
            notification: "0",
          },
          {
            _id: "17",
            title: "student_life",
            to: "/2/17",
            notification: "2",
          },
          {
            _id: "18",
            title: "meditation_and_yoga",
            to: "/2/18",
            notification: "1",
          },
          {
            _id: "19",
            title: "physical_health",
            to: "/2/19",
            notification: "15",
          },
        ],
      },
    ],
  },
];
const roles = [
  // Server 1
  {
    _id: "5",
    _id_server: "1",
    name: "IVANRICE",
  },
  {
    _id: "6",
    _id_server: "1",
    name: "ADMINISTRADORES",
  },
  {
    _id: "7",
    _id_server: "1",
    name: "VIP",
  },
  //server 2
  {
    _id: "1",
    _id_server: "2",
    name: "Admin",
  },
  {
    _id: "2",
    _id_server: "2",
    name: "Bot",
  },
  {
    _id: "3",
    _id_server: "2",
    name: "Moderators",
  },
  {
    _id: "4",
    _id_server: "2",
    name: "Subs",
  },
];
const users = [
  {
    _id: "1",
    role: "1",
    name: "Ivanrice_",
    hash: "1875",
    state: 1,
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
  },

  {
    _id: "2",
    role: "1",
    name: "Trinion",
    hash: "1876",
    state: 2,
    img: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    _id: "3",
    role: "2",
    name: "reindeernoun",
    hash: "1877",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/71.jpg",
  },
  {
    _id: "4",
    role: "3",
    name: "cometflight",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    _id: "5",
    role: "3",
    name: "tannenbaumsample",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    _id: "6",
    role: "3",
    name: "prancerbobsleigh",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    _id: "7",
    role: "4",
    name: "hymnvia",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    _id: "8",
    role: "4",
    name: "clausdevice",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  //
  {
    _id: "9",
    role: "4",
    name: "unwrapmutual",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    _id: "10",
    role: "4",
    name: "cidervegetables",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    _id: "11",
    role: "4",
    name: "krissweltering",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    _id: "12",
    role: "4",
    name: "iciclemean",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    _id: "13",
    role: "4",
    name: "wassailsock",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    _id: "14",
    role: "4",
    name: "fruitcakesailboat",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    _id: "15",
    role: "4",
    name: "gracesave",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    _id: "16",
    role: "4",
    name: "greetingsrequired",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/91.jpg",
  },
  {
    _id: "17",
    role: "4",
    name: "rudolphhop",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    _id: "18",
    role: "4",
    name: "evegrowl",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    _id: "19",
    role: "4",
    name: "wenceslaushomesick",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/87.jpg",
  },
  {
    _id: "20",
    role: "4",
    name: "yulerighteous",
    hash: "1878",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  //IVANRICE
  {
    _id: "21",
    role: "5",
    name: "Ivanrice",
    hash: "1873",
    state: 1,
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
  },
  {
    _id: "22",
    role: "6",
    name: "iciclecriteria",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/34.jpg",
  },
  {
    _id: "23",
    role: "6",
    name: "pageantryparent",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/84.jpg",
  },
  {
    _id: "24",
    role: "6",
    name: "generositytutor",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    _id: "25",
    role: "6",
    name: "yuletideepee",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    _id: "26",
    role: "6",
    name: "noelnoise",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/35.jpg",
  },
  {
    _id: "27",
    role: "7",
    name: "candlelightcoaming",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/79.jpg",
  },
  {
    _id: "28",
    role: "7",
    name: "xmaslutestring",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/55.jpg",
  },
  {
    _id: "29",
    role: "7",
    name: "blitzenfling",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    _id: "30",
    role: "7",
    name: "reindeerallow",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    _id: "31",
    role: "7",
    name: "frostyamend",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/70.jpg",
  },
  {
    _id: "32",
    role: "7",
    name: "togethernesscraft",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    _id: "33",
    role: "7",
    name: "ceremoniousjustify",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/85.jpg",
  },
  {
    _id: "34",
    role: "7",
    name: "yulesimplistic",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    _id: "35",
    role: "7",
    name: "graceshy",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/48.jpg",
  },
  {
    _id: "36",
    role: "7",
    name: "donnerhit",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    _id: "37",
    role: "7",
    name: "navidadcorpuscle",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/88.jpg",
  },
  {
    _id: "38",
    role: "7",
    name: "stockingpassion",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/58.jpg",
  },
  {
    _id: "39",
    role: "7",
    name: "tannenbaumthousand",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    _id: "40",
    role: "7",
    name: "krisminor",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/66.jpg",
  },
  {
    _id: "41",
    role: "7",
    name: "evergreenegyptian",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/men/58.jpg",
  },
  {
    _id: "42",
    role: "7",
    name: "wenceslauscheddar",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/60.jpg",
  },
  {
    _id: "43",
    role: "7",
    name: "toysaccept",
    hash: "1873",
    state: 1,
    img: "https://randomuser.me/api/portraits/women/33.jpg",
  },
];
const commentsChannel = [
  {
    _id_server: "1",
    channels: [
      {
        _id_channel: "1",
        title: "Introduction",
        comments: [
          {
            _id: "1",
            texto: "Welcome in yall, thank you for joining",
            img: "",
            date: "02/13/2019",
            url: "",
            react: [{ unicode: "1F605", count: 7, emoji: "😀" }],
            comment_reply: {},
            _id_user: "21",
          },
          {
            _id: "2",
            texto: "Bienvenidos a todos",
            img: `https://cdna.artstation.com/p/assets/images/images/044/565/274/large/ivan-bautista-christmas-snowman-psh.jpg`,
            date: "02/13/2019",
            url: "",
            react: [
              { unicode: "1F605", count: 7, emoji: "😀" },
              { unicode: "1F604", count: 29, emoji: "😁" },
            ],
            comment_reply: {},
            _id_user: "22",
          },

          {
            _id: "3",
            texto: "Hey all! Thanks for having me!",
            img: `https://cdna.artstation.com/p/assets/images/images/042/950/988/large/ivan-bautista-final-ghost.jpg`,
            date: "02/14/2019",
            url: "",
            react: [
              { unicode: "1F605", count: 11, emoji: "😂" },
              { unicode: "1F604", count: 13, emoji: "😁" },
            ],
            comment_reply: {},
            _id_user: "26",
          },
        ],
      },
      {
        _id_channel: "5",
        title: "video/audio",
        comments: [
          {
            _id: "",
            texto: "",
            img: "",
            date: "",
            url: "",
            react: [],
            comment_reply: {},
            _id_user: "21",
          }
        ],
      },
    ],
  },
  {
    _id_server: "2",
    channels: [
      {
        _id_channel: "1",
        title: "extra-roles",
        comments: [
          {
            _id: "1",
            texto:
              "@otro userdfgf @otro 4 dfgdfg @ivanrice Comentario  Comen   Comentario  Comentario  Comentario tario   Comentario  Comentario  Comentario Comentario Comentario @asdf @ivanrice @Dr kuno asd f d s d f sdfsdfsdfsdfsd sdfsdfsd werwefsd  sdfsdfsdfsdf sdfsdfsdf ssf dfsdfsdfsdf sdfwgfdghgy j grgf e fgerfg",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/044/565/274/large/ivan-bautista-christmas-snowman-psh.jpg`,
            date: "02/13/2019",
            url: "https://cdna.artstation.com/p/assets/images/images/044/565/274/large/ivan-bautista-christmas-snowman-psh.jpg",
            react: [
              { unicode: "1F601", count: 10, emoji: "😀" },
              { unicode: "1F602", count: 11, emoji: "😁" },
              { unicode: "1F603", count: 1, emoji: "👶" },
              { unicode: "1F604", count: 2, emoji: "😂" },
              { unicode: "1F605", count: 7, emoji: "🤣" },
            ],
            _id_user: "2",
            comment_reply: {},
          },
          {
            _id: "7",
            texto: "comentario SIETE extra roles",
            img: "",
            date: "02/13/2020",
            url: "",
            react: [
              { unicode: "1F603", count: 1, emoji: "👼" },
              { unicode: "1F604", count: 2, emoji: "🍼" },
              { unicode: "1F601", count: 10, emoji: "😈" },
            ],
            _id_comment_reply: "2",
            _id_user: "3",
            comment_reply: {
              _id: "1",
              role: "2",
              nombre: "Dr k",
              texto:
                "@otro userdfgf @otro 4 dfgdfg @ivanrice Comentario  Comen   Comentario  Comentario  Comentario tario   Comentario  Comentario  Comentario Comentario Comentario @asdf @ivanrice @Dr kuno asd f d s d f sdfsdfsdfsdfsd sdfsdfsd werwefsd  sdfsdfsdfsdf sdfsdfsdf ssf dfsdfsdfsdf sdfwgfdghgy j grgf e fgerfg",
              url: "https://cdna.artstation.com/p/assets/images/images/044/565/274/large/ivan-bautista-christmas-snowman-psh.jpg",
              img: true,
            },
          },
          {
            _id: "2",
            texto: "comentario dos extra roles",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/041/853/152/large/ivan-bautista-final-3.jpg`,
            date: "02/13/2020",
            url: "",
            react: [
              { unicode: "1F601", count: 10, emoji: "😈" },
              { unicode: "1F602", count: 11, emoji: "😺" },
              { unicode: "1F603", count: 1, emoji: "👼" },
              { unicode: "1F604", count: 2, emoji: "🍼" },
              { unicode: "1F605", count: 7, emoji: "😀" },
            ],
            _id_user: "1",
            comment_reply: {},
          },
          {
            _id: "3",
            texto: "comentario tres extra roles",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/042/950/988/large/ivan-bautista-final-ghost.jpg`,
            date: "02/14/2020",
            url: "",
            react: [
              { unicode: "1F601", count: 10, emoji: "😈" },
              { unicode: "1F603", count: 1, emoji: "👶" },
              { unicode: "1F604", count: 2, emoji: "😂" },
            ],
            _id_user: "4",
            comment_reply: {},
          },
          {
            _id: "4",
            texto: "comentario cuatro extra roles",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/042/838/042/large/ivan-bautista-mictlantecuhtli.jpg?1635570709`,
            date: "02/14/2020",
            url: "",
            react: [
              { unicode: "1F601", count: 10, emoji: "😈" },
              { unicode: "1F603", count: 1, emoji: "👶" },
              { unicode: "1F602", count: 1, emoji: "👼" },
              { unicode: "1F604", count: 2, emoji: "🍼" },
              { unicode: "1F608", count: 2, emoji: "😂" },
            ],
            _id_user: "3",
            comment_reply: {},
          },
          {
            _id: "5",
            texto: "comentario cinco extra roles",
            img: `${cloudinaryFetch}https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ghibli_Museum_06.jpg/220px-Ghibli_Museum_06.jpg`,
            date: "02/16/2020",
            url: "",
            react: [
              { unicode: "1F603", count: 1, emoji: "👼" },
              { unicode: "1F604", count: 2, emoji: "🍼" },
            ],
            _id_user: "1",
            comment_reply: {},
          },
          {
            _id: "6",
            texto: "comentario seis extra roles",
            img: `https://res.cloudinary.com/ivanrice-c/image/upload/c_fill,h_813,w_813/v1596740390/samples/food/dessert.jpg`,
            date: "02/17/2020",
            url: "",
            react: [
              { unicode: "1F604", count: 2, emoji: "🍼" },
              { unicode: "1F601", count: 10, emoji: "😈" },
            ],
            _id_user: "3",
            comment_reply: {},
          },
        ],
      },
    ],
  },
];
// 3
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    findUsersRoles: async (root, args) => {
      const { _id_server } = args;
      const usersRoles = await roles.filter((role) => {
        //console.log("idd ", _id_server);
        return role._id_server === _id_server;
      });
      return usersRoles;
    },
    servers: async () => await servers,
    getUsers: async () => await users,
    findServer: async (root, args) => {
      const { _id } = args;
      const servidor = await servers.find((server) => _id === server._id);
      return servidor;
    },
    findComment: async (root, args) => {
      const { _id_server, _id_channel } = args;

      const server = await commentsChannel.find((server) => {
        return server._id_server === _id_server;
      });

      const channels = await server.channels.find((comment) => {
        return comment._id_channel === _id_channel;
      });

      return channels;
    },
    findEmojis: async (_source, { id }, { dataSources }) => {
      return await dataSources.emojisAPI.getEmoji(id);
    },
  },
  Comment: {
    user: async (comments) => {
      const userf = await users.filter(
        (user) => user._id === comments._id_user
      );
      return userf[0];
    },
  },
  UsersRoles: {
    users: async(role) => {
      const usersinRole = await users.filter(user => user.role === role._id)
      return usersinRole;
    },
  },
};

// 4

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const startApolloServer = async(app, httpServer) =>{
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    dataSources: () =>{
      return {
        emojisAPI: new EmojisAPI(),
      };
    }
  });
  await server.start();
  server.applyMiddleware({ app });
  // The `listen` method launches a web server.
  app.listen({ port: ENV.port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${ENV.port}${server.graphqlPath}`
    )
  );
}
startApolloServer(app,httpServer)
export default httpServer

