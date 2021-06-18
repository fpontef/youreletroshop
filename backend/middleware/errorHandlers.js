// Wes version
/*
function asyncHandler(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
}
 */

//Versão ruim:
/*
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res);
    } catch (err) {
      next(err);
    }
  };
};
 */
// Versão ruim melhorada, agora tem await fn(req, res, next)  e funcional!
// /*
const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};
// */

// Versão do pacote npm express-async-handler
/*
const asyncHandler = (fn) =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args);
    const next = args[args.length - 1];
    return Promise.resolve(fnReturn).catch(next);
  };
 */

const notFound = (req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  return next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

const mongoValidationErrors = (err, req, res, next) => {
  if (err.name == 'CastError') {
    return res.status(404).json({
      message: 'id not found',
      stack: process.env.node_env === 'production' ? null : err.stack,
    });
  }

  if (err.name == 'ValidationError') {
    const errorMsg = Object.values(err.errors).map((error) => error.message);
    return res.status(422).json({
      message: errorMsg,
      stack: process.env.node_env === 'production' ? null : err.stack,
    });
  }

  if (!err.errors) return next(err);
};

// sem error handler:
export { asyncHandler, notFound, errorHandler, mongoValidationErrors };
