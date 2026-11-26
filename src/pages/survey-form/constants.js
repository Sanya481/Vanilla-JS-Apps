export const DOM = {
  gameSurvey: document.querySelector('[data-game-survey]'),
  surveyProgressText: document.querySelector('[data-survey-progress-text]'),
  surveyProgressBar: document.querySelector('[data-survey-progress-bar]'),
  levelValue: document.querySelector('[data-level-value]')
};

export const state = {
  currentStep: 0,
  progress: 0
}
// *VS
// export let currentStep = 0
// export let progress = 0
/*
*Примитивные типы (копируются по значению):
Number, String, Boolean, null, undefined, Symbol, BigInt
При присвоении или передаче в функцию создаётся новая копия значения 

?Для примитивов:
javascript
*constants.js
export let count = 0;

*module1.js
import { count } from './constants';
count = 5; // Изменение только в этом модуле

*module2.js
import { count } from './constants';
console.log(count); // 0 (не увидит изменения из module1)

*Объектные типы (передаются по ссылке):
Object, Array, Function, Date и др.
При присвоении или передаче копируется ссылка на объект

?Для объектов:
javascript
*constants.js
export const state = { count: 0 };

*module1.js
import { state } from './constants';
state.count = 5; // Меняем свойство объекта

*module2.js
import { state } from './constants';
console.log(state.count); // 5 (увидит изменение)

🎯 Аналогия с модулями (почему state сработал, а let — нет)
Ситуация:

*У тебя есть записная книжка (объект state).
Ты даёшь её друзьям (модулям) и говоришь: "Пишите сюда общие дела".
Все друзья видят одни и те же записи, потому что книжка одна.
*А если бы это был let (примитив):
Ты раздал бы друзьям листочки с копиями текста.
Если один друг исправит свой листок, у других ничего не изменится.
*/