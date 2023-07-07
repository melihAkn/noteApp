function errorHandler(err, req, res, next) {
  console.log(err);
  res.json({
    hatakodu:err.statusCode,
    mesaj : err.message
})
}
module.exports = errorHandler;

