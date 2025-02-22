const User = require('../database/models/User');
//createUser
const createUser = async (email, userName, password) => {
    return await User.create({ email, userName, password });
};
// Get a User by ID
const getUser = async (userId) => {
    const User = await User.findById(mongoose.Types.ObjectId(userId));
    if (!User) throw new Error('User not found');
    return User;
}

// Update a User
const updateUser = async (userId, userName) => {
    const User = await User.findByIdAndUpdate(
        mongoose.Types.ObjectId(userId),
        { userName, updatedAt: Date.now() },
        { new: true }
    );
    if (!User) throw new Error('User not found');
    return User;
}

// Delete a User
const deleteUser = async (UserId) => {
    const User = await User.findByIdAndDelete(mongoose.Types.ObjectId(UserId));
    if (!User) throw new Error('User not found');
    return { success: true };
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
};
