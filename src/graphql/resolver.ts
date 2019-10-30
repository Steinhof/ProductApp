// import { promisify } from 'util';
// import redisClient from '../database/database';
//
// export default {
//     async setValue(): Promise<void> {
//         await redisClient.set('some-key', '69', err => {
//             if (err) throw err;
//         });
//     },
//
//     getValue(): Promise<void | string> {
//         const getAsync = promisify(redisClient.get).bind(redisClient);
//         return getAsync('some-key').then(result => {
//             return result;
//         });
//     },
// };
