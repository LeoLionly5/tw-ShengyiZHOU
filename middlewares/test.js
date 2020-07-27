module.exports = (req, res, next) => {
    console.log('Test middle ware');
    next();
}