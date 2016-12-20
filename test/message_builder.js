const MessageBuilder = require('../index').MessageBuilder

const EMPTY = ''

describe('Message Builder', () => {
  context('without default room id', () => {
    let builder

    before(() => builder = new MessageBuilder())
    afterEach(() => builder.message = EMPTY)

    it('should return empty message', () => {
      builder.message.should.equal(EMPTY)
    })

    it('should return setted message', () => {
      let MSG = 'Hello　チャットワーク'
      builder.message = MSG
      builder.message.should.equal(MSG)
    })

    it('should allow append message', () => {
      let MSG = 'Hello'
      let APPEND1 = ' 世界'
      let APPEND2 = '!'
      builder.message = MSG
      builder.append(APPEND1).append(APPEND2)
      builder.message.should.equal(`${MSG}${APPEND1}${APPEND2}`)
    })

    it('should allow prepend message', () => {
      let MSG = 'Hello'
      let PREPEND = ' 世界'
      let APPEND = '!'
      builder.message = MSG
      builder.prepend(PREPEND).append(APPEND)
      builder.message.should.equal(`${PREPEND}${MSG}${APPEND}`)
    })

    it('should allow add new lines', () => {
      let MSG = 'Hello'
      let APPEND1 = ' 世界'
      let APPEND2 = '!'
      builder.message = MSG
      builder.append(APPEND1).n(4).append(APPEND2)
      builder.message.should.equal(`${MSG}${APPEND1}\n\n\n\n${APPEND2}`)
    })

    it('should allow send-to', () => {
      let MSG = 'Hello '
      let TO = '1234541'
      builder.append(MSG).to(TO)
      builder.message.should.equal(`${MSG}[To:${TO}]`)
    })

    it('should allow reply-to', () => {
      let MSG = 'OK '
      let TO = '1234541'
      let MSG_ID = '942252'
      let ROOM_ID = '629225'
      builder.append(MSG).reply(TO, MSG_ID, ROOM_ID)
      builder.message.should.equal(`${MSG}[rp aid=${TO} to=${ROOM_ID}-${MSG_ID}]`)
    })

    it('should allow quote without timestamp', () => {
      let MSG = 'OK '
      let AID = '1234541'
      let QUOTE_MSG = 'Can you send me list of Chatwork\'API?'
      builder.append(MSG).quote(AID, QUOTE_MSG)
      builder.message.should.equal(`${MSG}[qt][qtmeta aid=${AID} ]${QUOTE_MSG}[/qt]`)
    })

    it('should allow quote with timestamp', () => {
      let MSG = 'OK '
      let AID = '1234541'
      let QUOTE_MSG = 'Can you send me list of Chatwork\'API?'
      let TIME = new Date().getTime()
      builder.append(MSG).n().quote(AID, QUOTE_MSG, TIME)
      builder.message.should.equal(`${MSG}\n[qt][qtmeta aid=${AID} time=${TIME}]${QUOTE_MSG}[/qt]`)
    })

    it('should allow add message info without title', () => {
      let MSG = 'OK '
      let INFO_MSG = 'Oh, check it also'
      builder.append(MSG).n().info(INFO_MSG)
      builder.message.should.equal(`${MSG}\n[info]${INFO_MSG}[/info]`)
    })

    it('should allow add message info with title', () => {
      let MSG = 'OK '
      let INFO_MSG = 'Oh, check it also'
      let INFO_TITLE = 'Uploaded File'
      builder.append(MSG).n().info(INFO_MSG, INFO_TITLE)
      builder.message.should.equal(`${MSG}\n[info][title]${INFO_TITLE}[/title]${INFO_MSG}[/info]`)
    })

    it('should allow add hr', () => {
      let MSG = 'OK '
      let INFO_MSG = 'Oh, check it also'
      let INFO_TITLE = 'Uploaded File'
      builder.append(MSG).n().info(INFO_MSG, INFO_TITLE).hr()
      builder.message.should.equal(`${MSG}\n[info][title]${INFO_TITLE}[/title]${INFO_MSG}[/info][hr]`)
    })

    it('should allow profile icon', () => {
      let MSG = 'OK '
      let INFO_MSG = 'Oh, who?'
      let AID = 2985222
      builder.append(MSG).n().info(INFO_MSG).profileIcon(AID)
      builder.message.should.equal(`${MSG}\n[info]${INFO_MSG}[/info][picon:${AID}]`)
    })

    it('should allow profile icon&name', () => {
      let MSG = 'OK '
      let INFO_MSG = 'Oh, who?'
      let AID = 2985222
      builder.append(MSG).n().info(INFO_MSG).profileIcon(AID, true)
      builder.message.should.equal(`${MSG}\n[info]${INFO_MSG}[/info][piconname:${AID}]`)
    })
  })

  context('with default room id', () => {
    let builder
    let ROOM_ID = 492022

    before(() => builder = new MessageBuilder(EMPTY, ROOM_ID))
    afterEach(() => builder.message = EMPTY)

    it('should allow reply-to default room', () => {
      let MSG = 'OK '
      let TO = '1234541'
      let MSG_ID = '942252'
      builder.append(MSG).reply(TO, MSG_ID)
      builder.message.should.equal(`${MSG}[rp aid=${TO} to=${ROOM_ID}-${MSG_ID}]`)
    })

    it('should allow reply-to specific room', () => {
      let MSG = 'OK '
      let TO = '1234541'
      let MSG_ID = '942252'
      let S_ROOM_ID = '629225'
      builder.append(MSG).reply(TO, MSG_ID, S_ROOM_ID)
      builder.message.should.equal(`${MSG}[rp aid=${TO} to=${S_ROOM_ID}-${MSG_ID}]`)
    })
  })
})
