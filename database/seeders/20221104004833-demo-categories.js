'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('Categories', [{
       name: 'International Transfer',
       description: 'transference to international bank account',
       createdAt:"2022-05-06",
       updatedAt:"2022-05-06"
       
     },
     {
      name: 'Local Transfer',
      description: 'transference to national bank account',
      createdAt:"2022-05-06",
      updatedAt:"2022-05-06"
     
    },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     //Add commands to revert seed here.
     //Example:
     await queryInterface.bulkDelete('Categories', {[Op.or]: [{name: 'International Transfer'}, {name: 'Local Transfer'}]});
     
  }
};
