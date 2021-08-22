const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { User } = require('./models');
const { Thought } = require('./models')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/userdb', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

app.post('/users', ({ body }, res) => {
  User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/users', ({ body }, res) => {
  User.find(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/users/:id', ({ params, body }, res) => {
  User.findOne({ _id: params.id }, body)
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post('/users/:id', ({ params, body }, res) => {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.delete('/users/:id', ({ params }, res) => {
  User.findOneAndDelete({ _id: params.id })
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post('/thoughts', ({ body }, res) => {
Thought.create(body)
    .then(({ _id }) =>
    User.findOneAndUpdate({}, { $push: { thoughts: _id } }, { new: true })
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});



app.get('/thoughts', ({ body }, res) => {
  Thought.find(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get('/thoughts/:id', ({ params, body }, res) => {
  Thought.findOne({ _id: params.id }, body)
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post('/thoughts/:id', ({ params, body }, res) => {
  Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbNote);
    })
    .catch(err => {
      res.json(err);
    });
});

app.delete('/thoughts/:id', ({ params }, res) => {
  Thought.findOneAndDelete({ _id: params.id })
    .then(dbUser => {
      if (!dbUser) {
        res.json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});