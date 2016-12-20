class MessageBuilder {
  constructor (message = '', roomId) {
    this._message = message
    this.roomId = roomId
  }

  toString () {
    return this._message
  }

  get message () {
    return this._message
  }

  set message (message = '') {
    this._message = message
    return this
  }

  n (n = 1) {
    for (let i = 0; i < n; i++) {
      this._message += '\n'
    }
    return this
  }

  append (message = '') {
    this._message += message
    return this
  }

  prepend (message = '') {
    this._message = message + this._message
    return this
  }

  to (aid) {
    this._message += `[To:${aid}]`
    return this
  }

  reply (aid, messageId, roomId = this.roomId) {
    this._message += `[rp aid=${aid} to=${roomId}-${messageId}]`
    return this
  }

  quote (aid, message = '', timestamp) {
    this._message += `[qt][qtmeta aid=${aid} ${timestamp ? `time=${timestamp}` : ''}]${message}[/qt]`
    return this
  }

  info (message = '', title) {
    this._message += `[info]${title ? `[title]${title}[/title]` : ''}${message}[/info]`
    return this
  }

  hr () {
    this._message += '[hr]'
    return this
  }

  profileIcon (aid, hasName = false) {
    this._message += hasName ? `[piconname:${aid}]` : `[picon:${aid}]`
    return this
  }
}

module.exports = MessageBuilder
