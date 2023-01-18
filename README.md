# Community chat Api (Discord clone)

This Api is for the client [community chat](https://github.com/Ivanricee/Community-chat).

It's made with the Node JavaScript framework Express, GraphQl & Apollo Server.

This api was created for educational purposes.

## Available queries: 

Address: [https://community-chat-api.vercel.app/graphql](https://community-chat-api.vercel.app/graphql)
- `findComment (id_server, id_channel)`: Returns comments from a channel.
- `findEmojis (id)`: Returns an emoji.
- `findServer`: Returns a server with channels info.
- `findUsersRoles (id_server)`: Returns users and roles.
- `getUsers`: Returns all users.
- `servers`: Returns all servers

## Technologies Used
- NodeJs
- Express
- Apollo Server
- GraphQl
- Twilio
- Nodemon

## Installation

Development
```bash
npm run dev
```

Production
```bash
npm run build
```
