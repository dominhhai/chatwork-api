const API = require('../index')

const TOKEN = 'YOUR_TOKEN_HERE'
const OPTIONS = {
  proxy: 'http://USER_NAME:USER_PASS@PROXY_URL:PROXY_PORT/'
}

describe('Chatwork APIs', () => {
  context('setup', () => {
    it('should return default token', () => {
      let api = new API(TOKEN)
      api.token.should.equal(TOKEN)
    })

    it('should allow set new token', () => {
      let api = new API()
      let NEW_TOKEN = 'YOUR_OTHER_TOKEN_HERE'
      api.token = NEW_TOKEN
      api.token.should.equal(NEW_TOKEN)
    })

    it('should allow set options', () => {
      let api = new API(TOKEN, OPTIONS)
      api.token.should.equal(TOKEN)
      api.request.should.be.an.instanceOf(Object)
      api.request.should.have.property('get')
      api.request.should.have.property('post')
      api.request.should.have.property('del')
      api.request.should.have.property('defaults')
    })

    it('should return 200 response', () => {
      let api = new API(TOKEN, OPTIONS)
      return api.me().then(me => me.hasOwnProperty('account_id'))
        .should.be.fulfilledWith(true)
    })

    it('should return 401 response', () => {
      let WRONG_TOKEN = 'ajlj32lop2uagaaa'
      let api = new API(WRONG_TOKEN, OPTIONS)
      return api.me().should.be.rejectedWith({ statusCode: 401 })
    })
  })

  context('connect to endpoints', () => {
    let api

    before(() => api = new API(TOKEN, OPTIONS))

    // me
    it('should return account info', () => {
      return api.me().should.be.fulfilled().then(data => {
        return data.hasOwnProperty('account_id')
          && data.hasOwnProperty('room_id')
          && data.hasOwnProperty('name')
          && data.hasOwnProperty('chatwork_id')
          && data.hasOwnProperty('organization_id')
          && data.hasOwnProperty('mail')
          && data.hasOwnProperty('tel_mobile')
          && data.hasOwnProperty('twitter')
      }).should.be.fulfilledWith(true)
    })
    // my
    it('should return status info', () => {
      return api.myStatus().should.be.fulfilled().then(data => {
        return data.hasOwnProperty('unread_room_num')
          && data.hasOwnProperty('mention_room_num')
          && data.hasOwnProperty('mytask_room_num')
          && data.hasOwnProperty('unread_num')
          && data.hasOwnProperty('mention_num')
          && data.hasOwnProperty('mytask_num')
      }).should.be.fulfilledWith(true)
    })
    // contacts
    // rooms
  })
})
