const User = require('../database/models/User');
//createUser
const createUser = async (email, userName, password) => {
    return await User.create({ email, userName, password });
};
// Get a User by ID
const getUser = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
}

// Update a User
const updateUser = async (userId, userName) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { userName, updatedAt: Date.now() },
        { new: true }
    );
    if (!user) throw new Error('User not found');
    return user;
}

// Delete a User
const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error('User not found');
    return { success: true };
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
