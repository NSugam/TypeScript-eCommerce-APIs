function errorHandler(err:any, req:any, res:any, next:any) {
    console.error(err.stack);
    res.status(500).json({ message: err });
}

module.exports = errorHandler;
