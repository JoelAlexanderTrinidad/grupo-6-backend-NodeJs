'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', [{
      firstName: 'juan',
      lastName: 'oro',
      email: 'juan@gmail.com',
      createdAt:"2022-05-06",
      updatedAt:"2022-05-06"
      
    },
    {
      firstName: 'carlos',
      lastName: 'oro',
      email: 'carlos@gmail.com',
      createdAt:"2022-05-06",
      updatedAt:"2022-05-06"
    
   },
   {
    firstName: 'pedro',
    lastName: 'oro',
    email: 'pedro@gmail.com',
    createdAt:"2022-05-06",
    updatedAt:"2022-05-06"
  
 },
 {
  firstName: 'ramon',
  lastName: 'oro',
  email: 'ramon@gmail.com',
  createdAt:"2022-05-06",
  updatedAt:"2022-05-06"

},
{
  firstName: 'carlos',
  lastName: 'oro',
  email: 'carlos@gmail.com',
  createdAt:"2022-05-06",
  updatedAt:"2022-05-06"

},
{
firstName: 'pedro',
lastName: 'oro',
email: 'pedro@gmail.com',
createdAt:"2022-05-06",
updatedAt:"2022-05-06"

},
{
firstName: 'ramon',
lastName: 'oro',
email: 'ramon@gmail.com',
createdAt:"2022-05-06",
updatedAt:"2022-05-06"

},
   ], {});
   
 },

  down: async (queryInterface, Sequelize) => {
    
     //Add commands to revert seed here.
     //Example:
     //await queryInterface.bulkDelete('Users', {[Op.or]: [{name: 'Administrator'}, {name: 'Client'}]});
     
  }
};
