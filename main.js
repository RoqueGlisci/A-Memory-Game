let number = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

//desordena el array de numeros. Math.random genera numero aleatorios entre 0 y 1
number = number.sort(() => { return Math.random() - 0.5 });
