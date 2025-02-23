const grpc = require('@grpc/grpc-js');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const authUser = (call, callback, next) => {
    const metadata = call.metadata ? call.metadata.get('authorization') : [];
    const token = metadata.length ? metadata[0] : null;
    if (!token) {
        return callback({
            code: grpc.status.UNAUTHENTICATED,
            message: 'No token provided. Please log in.',
        });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return callback({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Invalid token. Please log in again.',
            });
        }
        call.user = decoded; 
        next(call, callback);;
    });
};

const authAdmin = (call, callback, next) => {
    const metadata = call.metadata ? call.metadata.get('authorization') : [];
    const token = metadata.length ? metadata[0] : null;
    if (!token) {
        callback({
            code: grpc.status.UNAUTHENTICATED,
            message: 'No token provided. Please log in.',
        });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            callback({
                code: grpc.status.UNAUTHENTICATED,
                message: 'Invalid token. Please log in again.',
            });
        }
        if (!decoded.isAdmin) {
            callback({
                code: grpc.status.PERMISSION_DENIED,
                message: 'Access denied. Admins only.',
            });
        }
        call.user = decoded; 
        next(call, callback);;
    });
};


// const checkUser = async (call, callback, next) => {
//     const metadata = call.metadata ? call.metadata.get('authorization') : [];
//     const token = metadata.length ? metadata[0] : null;
//     if (!token) {
//         call.user = null;
//         return  next(call, callback);
//     }
//     jwt.verify(token, process.env.SECRET, async (err, decoded) => {
//         if (err) {
//             call.user = null;
//             return  next(call, callback);;
//         }
//         try {
//             const user = await User.findById(decoded.id);
//             call.user = user || null; 
//         } catch (error) {
//             call.user = null;
//             console.log('Error fetching user:', error);
//         }
//         next(call, callback);
//     });
// };

module.exports = {
    authUser,
    authAdmin,
    //checkUser
};
