const express = require('express')
const router = express.Router()
const Apartment = require('../models/apartment')

// Getting all
router.get('/', async (req, res) => {
    const { price, rooms } = req.query
    try {
        let apartments = Apartment.find() 
        if (price) {
            apartments = apartments.sort({ price: price })
        }
        if (rooms) {
            apartments = apartments.where('rooms').equals(rooms)
        }     
        res.json(await apartments)
    } catch (err) {
        res.json({ message: err.message })
    }
})

// Getting one
router.get('/:id', getApartment, (req, res) => {
    res.json(res.apartment)
})

// Creating one
router.post('/', async (req, res) => {
    const apartment = new Apartment({
        rooms: req.body.rooms,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    try {
        const newApartment = await apartment.save()
        res.json(newApartment)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Upadation one
router.put('/:id', getApartment, async (req, res) => {
    res.apartment.rooms = req.body.rooms
    res.apartment.name = req.body.name
    res.apartment.price = req.body.price
    res.apartment.description = req.body.description
    try {
        const updatedApartment = await res.apartment.save()
        res.json(updatedApartment)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
})

// Deleting one
router.delete('/:id', getApartment, async (req, res) => {
    try {
        await res.apartment.remove()
        res.json({ message: `Apartment with id ${req.params.id} was deleted`})
    } catch (err) {
        res.json({ message: err.message })
    }
})

async function getApartment(req, res, next) {
    let apartment
    try {
        apartment = await Apartment.findById(req.params.id)
        if (apartment == null) {
            return res.json({ message: `Cannot find apartment with id ${req.params.id}`})
        }
    } catch (err) {
        return res.json({ message: err.message });
    }

    res.apartment = apartment
    next()
}

module.exports = router