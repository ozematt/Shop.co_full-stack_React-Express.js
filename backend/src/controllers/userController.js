////Kontrolery zawierają logikę biznesową i odpowiadają na żądania HTTP.

// controllers/userController.js
// const User = require('../models/User');

// const getAllUsers = (req, res) => {
//     User.findAll((err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Błąd serwera' });
//         }
//         res.json(results);
//     });
// };

// const createUser = (req, res) => {
//     const { username, password } = req.body;
//     User.create(username, password, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Błąd serwera' });
//         }
//         res.status(201).json({ id: result.insertId, username });
//     });
// };

// module.exports = { getAllUsers, createUser };
