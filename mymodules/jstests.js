/**
 * Created by Maxim on 08.02.2017.
 */
//**Callback function examples*/

var func_multiply = new Function("arg1", "arg2", "return arg1 * arg2;");
var func_plus = new Function("arg1", "arg2", "return arg1 + arg2;");


function f1(arg1, arg2){
    return arg1 * arg2;
}

console.log("Calculation is: %s", func_multiply(1, 2, f1));

console.log(f1(5, 10));

// определяем нашу функцию с аргументом callback
function some_function(arg1, arg2, callback) {
    // переменная, генерирующая случайное число в интервале между arg1 и arg2
    var my_number = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
    // теперь всё готово и  мы вызываем callback, куда передаём наш результат
    callback(my_number);
}

function printArray(callback) {
    var myarr = [];
    myarr.push(3);
    myarr.push("Help!");
    myarr.push(5);
    myarr.push(6);
    callback(myarr);
}

printArray(function (arr) {
    var l = arr.length;
    for (var i = 0; i < l; i++) {
        console.log("arr data: %s", arr[i]);
    }
});

func_multiply(5, 10); // => 50
console.log(func_multiply(5, 10));
console.log(func_plus(2, 2));

// вызываем функцию
some_function(5, 15, function (num) {
    // эта анонимная функция выполнится после вызова callback-функции
    console.log("callback called! " + num);
});

some_function(5, 15, function (num) {

    console.log("callback *2 called! " + num);
});