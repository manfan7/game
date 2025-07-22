// Мокированная функция fetch для тестирования
function fetch(url) {
    return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                jokes: [
                    {
                        id: 101,
                    setup: "Who is Santa's favorite singer?",
                    punchLine: "Elf-is Presley!"
                },
                {
                    id: 102,
                    setup: "What do you call a snowman with a six-pack?",
                    punchLine: "An abdominal snowman!"
                }
            ]
        })
    });
}

async function sayJoke(apiUrl, jokeId) {
    try {
        // 1. Делаем запрос к API
        const response = await fetch(apiUrl);

        // 2. Проверяем успешность запроса
        if (!response.ok) {
            throw new Error(`No jokes at url: ${apiUrl}`);
        }

        // 3. Парсим JSON данные
        const data = await response.json();

        // 4. Проверяем структуру данных
        if (!data?.jokes || !Array.isArray(data.jokes)) {
            throw new Error(`No jokes at url: ${apiUrl}`);
        }

        // 5. Ищем шутку по ID
        const joke = data.jokes.find(j => j.id === jokeId);
        if (!joke) {
            throw new Error(`No jokes found id: ${jokeId}`);
        }

        // 6. Возвращаем объект с методами
        return {
            saySetup: () => joke.setup,
            sayPunchLine: () => joke.punchLine
        };

    } catch (error) {
        // 7. Обрабатываем ошибки
        if (error.message.startsWith('No jokes found id')) {
            throw error;
        }
        throw new Error(`No jokes at url: ${apiUrl}`);
    }
}

// Тестирование функции
(async () => {
    try {
        // Успешный случай
        const joke1 = await sayJoke('http://great.jokes/christmas', 101);
        console.log(joke1.saySetup()); // "Who is Santa's favorite singer?"
        console.log(joke1.sayPunchLine()); // "Elf-is Presley!"

        // Шутка не найдена
        await sayJoke('http://great.jokes/christmas', 999);
    } catch (error) {
        console.error(error.message); // "No jokes found id: 999"
    }

    // Неверный URL
    try {
        await sayJoke('http://bad.url', 101);
    } catch (error) {
        console.error(error.message); // "No jokes at url: http://bad.url"
    }
})();
function mineLocation(field){
       let res = [0,0]
    for(let i=0;i<field.length;i++){
        for(let j=0;j<field[i].length;j++){
            if(field[i][j]===1){
                res[0] = i;
                res[1]=j;
            }
        }
    }
       return res // your code here
}
console.log(mineLocation([ [0, 0, 0], [0, 0, 0], [0, 1, 0] ]))