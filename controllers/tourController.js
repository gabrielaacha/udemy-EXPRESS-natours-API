const Tour = require('./../models/tourModel');
// const { runInNewContext } = require('vm');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      results: tours.length, // only use whenever you are sending an array of data
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tours: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
//   if (id > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'invalid ID' });
//   }

exports.createTour = async (req, res) => {
  try {
    //   const newTour = new Tour({});
    // newTour.save();

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      // data: {
      //   tour: newTour,
      // },
    }); // 201 stands for created
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'invalid data sent!',
    });
  }
};

exports.updateTour = (req, res) => {
  //   if (req.params.id * 1 > tours.length) {
  //     return res.status(404).json({
  //       status: 'success',
  //       message: 'invalid ID',
  //     });
  //   }
  res.status(200).json({
    status: 'success',
    data: 'updated tour here',
  });
};

exports.deleteTour = (req, res) => {
  //   if (req.params.id * 1 > tours.length) {
  //     return res.status(404).json({
  //       status: 'success',
  //       message: 'invalid ID',
  //     });
  //   }
  res.status(204).json({
    // 204 means no content
    status: 'success',
    data: 'null',
  });
};
