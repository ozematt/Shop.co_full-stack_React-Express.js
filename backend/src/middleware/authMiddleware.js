// // middlewares/authMiddleware.js
// const authenticate = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ error: 'Brak tokenu autoryzacji' });
//     }
//     // Weryfikacja tokenu (np. JWT)
//     next();
// };

// module.exports = authenticate;
