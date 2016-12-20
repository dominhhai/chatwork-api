const rq = require('request-promise-native')
const CONST = require('./const')

class API {
  /**
   * token: API token
   * options: request lib options.
   *          See more here: https://github.com/request/request#requestoptions-callback
   */
  constructor (token, options = {}) {
    this._token = token
    this._request = rq.defaults(Object.assign({
      baseUrl: 'https://api.chatwork.com/v1/',
      headers: {
        'X-ChatWorkToken': token
      },
      json: true
    }, options))
  }

  get request () {
    return this._request
  }

  get token () {
    return this._token
  }

  set token (token) {
    this._token = token
    this._request = this._request.defaults({
      headers: {
        'X-ChatWorkToken': token
      }
    })
  }

  set (token, options = {}) {
    this._token = token
    this._request = this._request.defaults(Object.assign({
      headers: {
        'X-ChatWorkToken': token
      }
    }, options))
  }

  // me
  me () {
    return this._request({
      uri: 'me'
    })
  }

  // my
  myStatus () {
    return this._request({
      uri: 'my/status'
    })
  }

  myTasks (aid, status = CONST.STATUS.OPEN) {
    return this._request({ // undefined or array
      uri: 'my/tasks',
      qs: {
        assigned_by_account_id: aid,
        status
      }
    })
  }

  // contacts
  contacts () {
    return this._request({
      uri: 'contacts'
    })
  }

  // rooms
  rooms () {
    return this._request({
      uri: 'rooms'
    })
  }

  createRoom ({
    description,
    icon_preset,
    members_admin_ids,
    members_member_ids,
    members_readonly_ids,
    name
  } = { icon_preset: CONST.ICON_PRESET.GROUP }) {
    let qs = {
      description,
      icon_preset,
      members_admin_ids,
      members_member_ids,
      members_readonly_ids,
      name
    }

    for (let prop of ['members_admin_ids', 'members_member_ids', 'members_readonly_ids']) {
      if (Array.isArray(qs[prop])) {
        qs[prop] = qs[prop].join(',')
      }
    }

    return this._request.post({
      uri: 'rooms',
      qs
    })
  }

  room (roomId) {
    return this._request({
      uri: `/rooms/${roomId}`
    })
  }

  updateRoom (roomId, { description, icon_preset, name } = { icon_preset: CONST.ICON_PRESET.GROUP }) {
    let qs = {
      description,
      icon_preset,
      name
    }

    return this._request.put({
      uri: `/rooms/${roomId}`,
      qs
    })
  }

  exitRoom (roomId) {
    return this._request.del({
      uri: `/rooms/${roomId}`,
      qs: {
        action_type: CONST.ROOM_ACTION_TYPE.LEAVE
      }
    })
  }

  delRoom (roomId) {
    return this._request.del({
      uri: `/rooms/${roomId}`,
      qs: {
        action_type: CONST.ROOM_ACTION_TYPE.DELETE
      }
    })
  }

  members (roomId) {
    return this._request({
      uri: `/rooms/${roomId}/members`
    })
  }

  updateMembers (roomId, { members_admin_ids, members_member_ids, members_readonly_ids } = {}) {
    let qs = {
      members_admin_ids,
      members_member_ids,
      members_readonly_ids
    }
    for (let prop of ['members_admin_ids', 'members_member_ids', 'members_readonly_ids']) {
      if (Array.isArray(qs[prop])) {
        qs[prop] = qs[prop].join(',')
      }
    }

    return this._request.put({
      uri: `/rooms/${roomId}/members`,
      qs
    })
  }

  messages (roomId, force = false) {
    return this._request({
      uri: `/rooms/${roomId}/messages`,
      qs: {
        force: force ? 1 : 0
      }
    })
  }

  message (roomId, messageId) {
    return this._request({
      uri: `/rooms/${roomId}/messages/${messageId}`
    })
  }

  sendMessage (roomId, body) {
    return this._request.post({
      uri: `/rooms/${roomId}/messages`,
      qs: {
        body
      }
    })
  }

  delMessage (roomId, messageId) {
    return this._request.del({
      uri: `/rooms/${roomId}/messages`,
      qs: {
        message_id: messageId
      }
    })
  }

  tasks (roomId, { account_id, assigned_by_account_id, status } = { status: CONST.STATUS.OPEN }) {
    let qs = {
      account_id,
      assigned_by_account_id,
      status
    }
    return this._request({
      uri: `/rooms/${roomId}/tasks`,
      qs
    })
  }

  task (roomId, taskId) {
    return this._request({
      uri: `/rooms/${roomId}/tasks/${taskId}`
    })
  }

  createTask (roomId, { body, limit, to_ids } = {}) {
    let qs = {
      body,
      limit,
      to_ids
    }
    qs.limit = new Date(qs.limit).getTime()
    if (Array.isArray(qs.to_ids)) {
      qs.to_ids = qs.to_ids.join(',')
    }

    return this._request.post({
      uri: `/rooms/${roomId}/tasks`,
      qs
    })
  }

  files (roomId, uploadedAid) {
    return this._request({
      uri: `/rooms/${roomId}/files`,
      qs: {
        account_id: uploadedAid
      }
    })
  }

  file (roomId, fileId, createDownloadUrl = false) {
    return this._request({
      uri: `/rooms/${roomId}/files/${fileId}`,
      qs: {
        create_download_url: createDownloadUrl ? 1 : 0
      }
    })
  }
}

module.exports = API
