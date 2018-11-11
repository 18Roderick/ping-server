module.exports = (defaults, session) => {
  return {
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId
  }
}