# /chatroom/join

Join a room if exists, creand and join if it does not exist.

Also creates the player

## Method

POST

## Request

```
{
  "player": { "name": "Yamcha", "avatar": "img.png" },
  "chatroom": { "name": "Dragon Ball Z" }
}
```

## Response

```
{
  "playerid":  3,
  "chatroomid": 12
}

```