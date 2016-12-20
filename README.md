# chatwork-api
A JavaScript wrapper for [Chatwork APIs](http://developer.chatwork.com/ja/index.html).

##### Current Version: `v1.0 Preview`

### Install
```shell
$ npm i -S chatwork-api
```

### Usage
2 main functions:
 * [Message Builder](#message-builder): Utility for build chat message easier
 * [Chatwork API caller](#chatwork-apis): Call Chatwork API

#### Message Builder
Utility for build chat message easier.

##### Builder(message, roomId)
Create a new MessageBuilder instance with initial message and chat room id.

##### builder.toString()
Get current message.

##### builder.message
Get current messsge. Same as `toString()`

##### builder.message=
Set current message.

##### builder.n(number)
Append `number` of new lines. Default is 1 line.

##### builder.append(message)
Append `message`.

##### builder.prepend(message)
Prepend `message`.

##### builder.to(account_id)
Send message to `account_id`, then append to current message.

##### builder.reply(account_id, message_id, room_id)
Reply to `account_id` with message has id `message_id` in room `room_id`, then append to current message. Default of `room_id` is instance.`room_id`

##### builder.quote(account_id, message, timestamp)
Quote `message` of `account_id` at `timestamp`, then append to current message. `timestamp` is optional.

##### builder.info(message, title)
Wrap info for `message` with `title`, then append to current message. `title` is optional.

##### builder.hr()
Wrap `hr`, then append to current message.

##### builder.profileIcon(account_id, is_include_name)
Show profile icon for `account_id`, then append to current message. When `is_include_name` is `true`, this will show both of profile icon and profile name. The default is `false`.


#### Chatwork APIs
The wrapper for Chatwork APIs.

* The options for each request is same as Chatwork API options. This reduces the maintain of this lib.

##### API(token, options)
Create new API instance with token, and [request options](https://github.com/request/request#requestoptions-callback).

##### api.request
Get the current [request](https://github.com/request/request) object.

##### api.token
Get current Chatwork api token.

##### api.token=
Set Chatwork api token

##### api.set(token, options)
Set Chatwork api token, and [request options](https://github.com/request/request#requestoptions-callback).

##### api.me()
Get [my profile](http://developer.chatwork.com/ja/endpoint_me.html#GET-me).

##### api.myStatus()
Get [current status](http://developer.chatwork.com/ja/endpoint_my.html#GET-my-status).

##### api.myTasks(aid, status)
Get [my tasks](http://developer.chatwork.com/ja/endpoint_my.html#GET-my-tasks).

##### api.contacts()
Get [my contacts](http://developer.chatwork.com/ja/endpoint_contacts.html#GET-contacts).

##### api.rooms()
Get [my list chat rooms](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms).

##### api.createRoom(options)
Create a [new chat room](http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms).
```javascript
options: {
  description,         // room description
  icon_preset,         // room icon. Default is `group`
  name,                // room name
  members_admin_ids,   // list of admin member ids [Integer, String, Array]
  members_member_ids,  // list of normal member ids [Integer, String, Array]
  members_readonly_ids // list of readonly member ids [Integer, String, Array]
}
```

##### api.room(room_id)
Get [chat room detail](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id).

##### api.updateRoom(room_id, options)
Update [chat room information](http://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id).
```javascript
options: {
  description, // room description
  icon_preset, // room icon. Default is `group`
  name         // room name
}
```

##### api.exitRoom(room_id)
Leave [chat room](http://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id).

##### api.delRoom(room_id)
Delete [chat room](http://developer.chatwork.com/ja/endpoint_rooms.html#DELETE-rooms-room_id).

##### api.members(room_id)
Get [list members](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-members) of a chat room.

##### api.updateMembers(room_id, options)
Update list of [members](http://developer.chatwork.com/ja/endpoint_rooms.html#PUT-rooms-room_id-members) for a chat room.
```javascript
options: {
  members_admin_ids,   // list of admin member ids [Integer, String, Array]
  members_member_ids,  // list of normal member ids [Integer, String, Array]
  members_readonly_ids // list of readonly member ids [Integer, String, Array]
}
```

##### api.messages(room_id, force)
Get [list messages](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages).

##### api.message(room_id, message_id)
Get [message information](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-messages-message_id).

##### api.sendMessage(room_id, body)
Send a [new message](http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-messages).

##### api.tasks(room_id, options)
Get [list taks](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks).
```javascript
options: {
  account_id,              // owner account id
  assigned_by_account_id,  // assigned account id
  status                   // task content. Default is `open`
}
```

##### api.task (room_id, task_id)
Get [task information](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-tasks-task_id).

##### api.createTask(room_id, options)
Create a [new task](http://developer.chatwork.com/ja/endpoint_rooms.html#POST-rooms-room_id-tasks).

```javascript
options: {
  body,  // task content
  limit, // task expiration
  to_ids // assign to list of account_ids. [Integer, String, Array]
}
```

##### api.files(room_id, uploaded_account_id)
Get [list files](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-files).

##### api.file(room_id, file_id, doCreateDownloadUrl)
Get [file information](http://developer.chatwork.com/ja/endpoint_rooms.html#GET-rooms-room_id-files-file_id). Default of `doCreateDownloadUrl` is false.


### Examples
```javascript
const API = require('chatwork-api')
const MessageBuilder = API.MessageBuilder
const STATUS = API.CONST.STATUS

// create new API instance with api token
let api = new API('YOUR_TOKEN_HERE', {
  proxy: 'http://USER_NAME:USER_PASS@PROXY_URL:PROXY_PORT/'
})

// get my task
api.myTasks('ASSIGNED_BY_ACCOUNT_ID', STATUS.DONE)
  .then(console.log)
  .catch(console.error)

// create a new message with MessageBuilder
let builder = new MessageBuilder()
builder.to('ACCOUNT_ID')      // send to ACCOUNT_ID
  .append('Wellcome to this') // append message
  .append('世界')
builder.n(2)                       // add 2 new lines
  .append('Awesome ')
  .profileIcon('ACCOUNT_ID', true) // add profile icon with user name
// send message in ROOM_ID
api.sendMessage('ROOM_ID', builder.message)
  .then(console.log)
  .catch(console.error)
```
