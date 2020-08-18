const fs = require('fs');
const express = require('express');
const morgan = require('morgan'); // convention to name the variable same as the origin

const app = express();

// 1) MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json()); // this is a middleware

app.use((req, res, next) => {
  console.log('hello from the middleware');
  next();
});

app.use((rew, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length, // only use whenever you are sending an array of data
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      }); // 201 stands for created
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'success',
      message: 'invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: 'updated tour here',
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'success',
      message: 'invalid ID',
    });
  }
  res.status(204).json({
    // 204 means no content
    status: 'success',
    data: 'null',
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours:id').get(getTour).patch(updateTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);

app
  .route('/api/v1/users/:id')
  .get(getUsers)
  .patch(updateUser)
  .delete(deleteUser);

// 4) START SERVER

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
