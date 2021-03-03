import md5 from 'crypto-js/md5';

const md5email = (email) => md5(email);

export default md5email;
