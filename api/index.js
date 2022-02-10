import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

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
    name: String
    role: String
    img: String
  }
  # comments querysable fields
  type Comment {
    _id: ID
    texto: String
    img: String
    date: String
    url: String
    react: [String]
    _id_comment_reply: ID
    _id_user: ID
    user: Users
  }
  type CComment {
    _id_channel: ID
    title: String
    comments: [Comment]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  # // Entry points
  type Query {
    servers: [Server]
    findServer(_id: ID!): Server
    findComment(_id_server: ID!, _id_channel: ID!): CComment
  }
`;
// 2 Data source
const cloudinaryFetch ="https://res.cloudinary.com/demo/image/fetch/q_auto/";
const servers = [
  {
    _id: "1",
    title: "Ivanrice",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
    alt: "server, ivanrice",
    content: "8",
    path: "/1",
    channels: [
      {
        title: "- Welcome and rules",
        _id: "1",
        summary: [
          {
            _id: "1",
            title: "extra-roles",
            to: "/1/1",
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
            to: "/1/2",
            notification: "0",
          },
          {
            _id: "3",
            title: "calendar",
            to: "/1/3",
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
            to: "/1/4",
            notification: "0",
          },
          {
            _id: "5",
            title: "calendar",
            to: "/1/5",
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
            to: "/1/6",
            notification: "789",
          },
          {
            _id: "7",
            title: "gu_ide_help-desk",
            to: "/1/7",
            notification: "0",
          },
          {
            _id: "8",
            title: "gu_ide_suggestions",
            to: "/1/8",
            notification: "24",
          },
          {
            _id: "9",
            title: "gu_ide_bug-reports",
            to: "/1/9",
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
            to: "/1/10",
            notification: "0",
          },
          {
            _id: "11",
            title: "content_discussion",
            to: "/1/11",
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
            to: "/1/12",
            notification: "0",
          },
          {
            _id: "13",
            title: "pogchamp",
            to: "/1/13",
            notification: "0",
          },
          {
            _id: "14",
            title: "life_purpose_and_dharma",
            to: "/1/14",
            notification: "957",
          },
          {
            _id: "15",
            title: "study_of_self",
            to: "/1/15",
            notification: "0",
          },
          {
            _id: "16",
            title: "careers",
            to: "/1/16",
            notification: "0",
          },
          {
            _id: "17",
            title: "student_life",
            to: "/1/17",
            notification: "2",
          },
          {
            _id: "18",
            title: "meditation_and_yoga",
            to: "/1/18",
            notification: "1",
          },
          {
            _id: "19",
            title: "physical_health",
            to: "/1/19",
            notification: "15",
          },
        ],
      },
    ],
  },
  {
    _id: "2",
    title: "Healthy Gamer",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/hg_logo_idpz31.png",
    alt: "server, healthy gamer gg",
    content: "61",
    path: "/2",
    channels: [
      {
        title: "- Welcome and rules",
        _id: "1",
        summary: [
          {
            _id: "1",
            title: "announcements",
            to: "/2/1",
            notification: "0",
          },
          {
            _id: "2",
            title: "calendar",
            to: "/2/2",
            notification: "9",
          },
        ],
      },
    ],
  },
];
const users = [
  {
    _id: "1",
    name: "ivanrice",
    role: "1",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
  },
  {
    _id: "2",
    name: "Dr k",
    role: "2",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
  },
  {
    _id: "3",
    name: "otro user",
    role: "3",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
  },
  {
    _id: "4",
    name: "otro 4",
    role: "4",
    img: "https://res.cloudinary.com/ivanrice-c/image/upload/f_auto,q_auto:good/v1642023517/discord-clone/server/ivnrice_logo_grzmki.png",
  },
];
const commentsChannel = [
  {
    _id_server: "1",
    channels: [
      {
        _id_channel: "1",
        title: "extra-roles",
        comments: [
          {
            _id: "1",
            texto:
              "Comentario uno asd f d s d f sdfsdfsdfsdfsd sdfsdfsd werwefsd  sdfsdfsdfsdf sdfsdfsdf ssf dfsdfsdfsdf sdfwgfdghgy j grgf e fgerfg",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/044/565/274/large/ivan-bautista-christmas-snowman-psh.jpg`,
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji2", "emoji3", "emoji4", "emoji5"],
            _id_comment_reply: "",
            _id_user: "2",
          },
          {
            _id: "2",
            texto: "comentario dos extra roles",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/041/853/152/large/ivan-bautista-final-3.jpg`,
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "1",
          },
          {
            _id: "3",
            texto: "comentario tres extra roles",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/042/950/988/large/ivan-bautista-final-ghost.jpg`,
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "4",
          },
          {
            _id: "4",
            texto: "comentario cuatro extra roles",
            img: `${cloudinaryFetch}https://cdna.artstation.com/p/assets/images/images/042/838/042/large/ivan-bautista-mictlantecuhtli.jpg?1635570709`,
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "3",
          },
          {
            _id: "5",
            texto: "comentario cinco extra roles",
            img: `${cloudinaryFetch}https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ghibli_Museum_06.jpg/220px-Ghibli_Museum_06.jpg`,
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "1",
          },
          {
            _id: "6",
            texto: "comentario seis extra roles",
            img: `https://res.cloudinary.com/ivanrice-c/image/upload/c_fill,h_813,w_813/v1596740390/samples/food/dessert.jpg`,
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "3",
          },
        ],
      },
    ],
  },
  {
    _id_server: "2",
    channels: [
      {
        _id_channel: "1",
        title: "announcements",
        comments: [
          {
            _id: "1",
            texto: "comentario uno announcements",
            img: "",
            date: "28/01/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "2",
          },
          {
            _id: "2",
            texto:
              "comentario dos announcements sdkfjsjkdf d df df sdf sdfdsf f f sdfsdfsdf sdd",
            img: "",
            date: "01/02/2022",
            url: "",
            react: ["emoji1", "emoji5", "emoji4", "emoji2", "emoji3"],
            _id_comment_reply: "",
            _id_user: "1",
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
    servers: () => servers,
    findServer: (root, args) => {
      const { _id } = args;
      const servidor = servers.find((server) => _id === server._id);
      return servidor;
    },
    findComment: (root, args) => {
      const { _id_server, _id_channel } = args;

      const server = commentsChannel.find((server) => {
        return server._id_server === _id_server;
      });

      const channels = server.channels.find((comment) => {
        return comment._id_channel === _id_channel;
      });

      return channels;
    },
  },
  Comment: {
     user: (comments) => {
       const userf = users.filter((user) => user._id === comments._id_user);
        return userf[0]
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
  });
  await server.start();
  server.applyMiddleware({ app });
  // The `listen` method launches a web server.
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}
startApolloServer(app,httpServer)
export default httpServer

