'use strict';

const transactions = [
  {
    description: 'This is a description of a transaction',
    amount: 50000,
    userId: 3,
    categoryId: 1,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: 'This is a description of a transaction',
    amount: 12000,
    userId: 1,
    categoryId: 2,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: 'This is a description of a transaction',
    amount: 8000,
    userId: 2,
    categoryId: 1,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: 'This is a description of a transaction',
    amount: 3200,
    userId: 5,
    categoryId: 1,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    description: 'This is a description of a transaction',
    amount: 90000,
    userId: 4,
    categoryId: 2,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Transactions', transactions, {});
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Transactions', null, {});
  }
};
