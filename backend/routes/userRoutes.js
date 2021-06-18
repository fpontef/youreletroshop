import express from 'express';
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserById,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
//router.post('/login', authUser);  // feito pelo brad, mas decidi padronizar
router.route('/login').post(authUser);
// usamos router.route().etc..
// neste aqui pois vamos fazer um get e post adiante
// To use middleware, just put the function after ".get("" like the "protect"
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);

export default router;
