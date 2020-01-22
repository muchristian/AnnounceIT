export default (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.header('Access-Control-Expose-Header', 'X-Total-Count');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,PATCH,DELETE');
    return res.status(200).json({});
  }
  next();
};
 