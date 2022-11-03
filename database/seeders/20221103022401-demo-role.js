'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Add seed commands here.
    
     //Example:
     await queryInterface.bulkInsert('Roles', [{
       name: 'Administrator',
       description: 'all priviliges granted',
       createdAt:"2022-05-06",
       updatedAt:"2022-05-06"
       
     },
     {
      name: 'Client',
      description: 'personal wallet access',
      createdAt:"2022-05-06",
      updatedAt:"2022-05-06"
     
    },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
