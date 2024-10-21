const Player = require('./../models/playerModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Player.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const players = await features.query;

  res.status(200).json({
    status: 'success',
    results: players.length,
    data: {
      players
    }
  });
});

exports.getPlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findById(req.params.id);

  if (!player) {
    return next(new AppError('No player found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
        player
    }
  });
});

exports.createPlayer = catchAsync(async (req, res, next) => {
  const newPlayer = await Player.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      player: newPlayer
    }
  });
});

exports.updatePlayer = catchAsync(async (req, res, next) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!player) {
    return next(new AppError('No player found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
        player
    }
  });
});





