# Community chat Api (Discord clone)

This Api is for the client [community chat](https://github.com/Ivanricee/Community-chat).

It's made with the Node JavaScript framework Express, GraphQl & Apollo Server.

This api was created for educational purposes.

## API Reference

Address: [https://community-chat-api.vercel.app/graphql](https://community-chat-api.vercel.app/graphql)

#### Returns comments from a channel.

```http
  findComment 
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_server` | `ID!` | **Required**. Server id     |
| `id_channel` | `ID!` | **Required**. Channel id   |

#### Returns an emoji.

```http
  findEmojis
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `ID!` | **Required**. Emoji id               |

#### Returns a server with channels info.

```http
  findServer
```

#### Returns users and roles.

```http
  findUsersRoles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_server` | `ID!` | **Required**. Server id     |


#### Returns all users.

```http
  getUsers
```

#### Returns all servers

```http
  servers
```

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
