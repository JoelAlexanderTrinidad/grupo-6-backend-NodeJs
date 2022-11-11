'use strict';

const bcrypt = require('bcrypt');

const users = [
  {
    firstName : 'Rick',
    lastName : 'Novak',
    password : bcrypt.hashSync('passTest', 10),
    email : 'test_01@gmail.com',
    avatar : 'avatar_01.jpg',
    roleId : 1,
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    firstName : 'Susan',
    lastName : 'Connor',
    password : bcrypt.hashSync('passTest', 10),
    email : 'test_02@gmail.com',
    avatar : 'avatar_02.jpg',
    roleId : 2,
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    firstName : 'Roger',
    lastName : 'Barr',
    password : bcrypt.hashSync('passTest', 10),
    email : 'test_03@gmail.com',
    avatar : 'avatar_03.jpg',
    roleId : 2,
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    firstName : 'Marie',
    lastName : 'Adelman',
    password : bcrypt.hashSync('passTest', 10),
    email : 'test_04@gmail.com',
    avatar : 'avatar_04.jpg',
    roleId : 1,
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', users, {});
  },
  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
  }
};