
const wrongPathController = (req, res) => {
  res.status(404).json({ message: 'this is not a valid endpoint or method is not allowed' })
}

module.exports = wrongPathController
