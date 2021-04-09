const Seneca = require('seneca')
const Entities = require('seneca-entity')
const SenecaPromisify = require('seneca-promisify')
const GetPoll = require('./actions/get_poll')
const OpenPoll = require('./actions/open_poll')

const app = Seneca()

app.quiet()

app.use(Entities)

app.use(SenecaPromisify)

app.use(OpenPoll)

app.use(GetPoll)

// dbg...
//
app.act({ sys: 'vote', open: 'poll', fields: { title: 'Lorem Ipsum' } },
  (err, response) => {
    console.log(err, response)

    app.act({ sys: 'vote', get: 'poll', poll_id: response.poll.id },
      (err, response) => {
        console.log(err, response)
      })
  })

