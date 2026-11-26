// Задание 1
// function hello() {
//   console.log('Skill');
// }

// try {
//   helo();
// } catch (error) {
//   console.error('Произошла ошибка:', error);
// }

// console.log('complete');

// Задание 2
// function greeting() {
//   const username = prompt('Введите имя пользователя');
//   if (!username) {
//     throw new Error('Введите имя пользователя');
//   }
//   return username;
// }

// try {
//   greeting();
// } catch (error) {
//   alert(error.message);
// }

// Задание 3
// function globalError() {
//   const error = Error('Глобальная ошибка')
//   error.name = 'GlobalError'
//   throw error
// }

// function localError() {
//   const error = Error('Локальная ошибка')
//   error.name = 'LocalError'
//   throw error
// }

// function testErrorScope(fn) {
//   try {
//     try {
//       fn()
//     } catch (error) {
//       if (error.name === 'GlobalError') throw error

//       console.log('Обнаружена локальная ошибка')
//       console.error(error)
//     }
//   } catch (error) {
//     console.log('Обнаружена глобальная ошибка')
//     console.error(error)
//   }
// }
// testErrorScope(localError)
// testErrorScope(globalError)
