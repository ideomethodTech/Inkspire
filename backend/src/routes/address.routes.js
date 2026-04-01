import express from 'express';
import { AddressController } from '../controllers/address.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { validateAddress, handleValidationErrors } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', AddressController.getAddresses);
router.post('/', validateAddress, handleValidationErrors, AddressController.addAddress);
router.put('/:id', AddressController.updateAddress);
router.delete('/:id', AddressController.deleteAddress);

export default router;