const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // this is a middleware

// app.get('/', (req, res) => {
//   res
//     .status(404)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET

// always specify the version of the API
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length, // only use whenever you are sending an array of data
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

// POST

app.post('/api/v1/tours', (req, res) => {
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
});

// PATCH update properties

// app.patch('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'success',
//       message: 'invalid ID',
//     });
//   }
// });

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'success',
      message: 'invalid ID',
    });
  }
  res.status(201).json({
    status: 'success',
    message: 'id',
  });
});

// PORT

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
