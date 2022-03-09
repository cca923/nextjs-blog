export default (req, res) => {
  if (req.method === 'POST') {
    // get message
    const message = req.body

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit('message', message)

    // return message
    res.status(201).json(message)
    // 如果 comment 掉上面這一行...
    // Warning: API resolved without sending a response for /api/chat, this may result in stalled requests.
  }
}
