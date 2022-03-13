import rooms from 'data/rooms.json'
import nc from 'next-connect'
import Room from 'models/Room'
import dbConnect from 'config/dbConnect'
import onError from 'middlewares/errors'

const handler = nc({ onError })

dbConnect()

handler.get(async (req, res) => {
    try {
        await Room.deleteMany()
        await Room.insertMany(rooms);
        res.send({ message: 'seeded successfully' })
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: 'seeding failed' })
    }
})

export default handler
