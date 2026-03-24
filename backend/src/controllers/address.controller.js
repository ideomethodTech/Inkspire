import User from '../models/mongo/user.model.js';

export class AddressController {
  // Get all addresses
  static async getAddresses(req, res) {
    try {
      const user = await User.findById(req.user.userId).select('addresses');
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      
      return res.json({ success: true, addresses: user.addresses || [] });
    } catch (error) {
      console.error('Get Addresses Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // Add new address
  static async addAddress(req, res) {
    try {
      const { name, phone, addressLine, city, state, zip, country, isDefault } = req.body;

      if (!name || !phone || !addressLine || !city || !state || !zip) {
        return res.status(400).json({ success: false, message: 'All address fields are required' });
      }

      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const newAddress = {
        name,
        phone,
        addressLine,
        city,
        state,
        zip,
        country: country || 'India',
        isDefault: isDefault || false
      };

      // If set as default, unset others
      if (newAddress.isDefault && user.addresses.length > 0) {
        user.addresses.forEach(addr => addr.isDefault = false);
      } else if (user.addresses.length === 0) {
        // First address is always default
        newAddress.isDefault = true;
      }

      user.addresses.push(newAddress);
      await user.save();

      return res.status(201).json({ success: true, message: 'Address added successfully', addresses: user.addresses });
    } catch (error) {
      console.error('Add Address Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // Update address
  static async updateAddress(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const address = user.addresses.id(id);
      if (!address) return res.status(404).json({ success: false, message: 'Address not found' });

      // If setting as default, unset others
      if (updates.isDefault === true) {
        user.addresses.forEach(addr => addr.isDefault = false);
      }

      // Apply updates
      Object.keys(updates).forEach(key => {
        if (key !== '_id') address[key] = updates[key];
      });

      await user.save();

      return res.json({ success: true, message: 'Address updated successfully', addresses: user.addresses });
    } catch (error) {
      console.error('Update Address Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  // Delete address
  static async deleteAddress(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findById(req.user.userId);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === id);
      if (addressIndex === -1) return res.status(404).json({ success: false, message: 'Address not found' });

      const wasDefault = user.addresses[addressIndex].isDefault;
      user.addresses.splice(addressIndex, 1);

      // If we deleted the default address and there are others, make the first one default
      if (wasDefault && user.addresses.length > 0) {
        user.addresses[0].isDefault = true;
      }

      await user.save();

      return res.json({ success: true, message: 'Address deleted successfully', addresses: user.addresses });
    } catch (error) {
      console.error('Delete Address Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
}
