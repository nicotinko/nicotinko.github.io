let inputValue = document.getElementById('in'); // Получаем элемент ввода данных
let outputValue = document.getElementById('out'); // Получаем элемент вывода данных

button.onclick = function () {
    navigator.clipboard.readText()
        .then(text => {
            inputValue.value = text;
            outputValue.value = parseLink();
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })

    
};

inputValue.oninput = function () { // При вводе данных в поле вызываем функцию.
    outputValue.value = parseLink();
};



function parseLink() {
    s = inputValue.value;
    s = s.replace(/\n/g, ' ');
    s = s.replace(/\s+/g, ' ').trim()

    //название
    var index1 = s.indexOf("(54)") + 5;
    var index2 = s.indexOf("(57)");
    var name = s.slice(index1, index2);
    function ucFirst(str) {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
    name = ucFirst(name);


    //номер
    index1 = s.indexOf("(11)") + 5;
    index2 = s.indexOf("(13)");
    var number = s.slice(index1, index2);
    var number = number.replace(/\s+/g, '');

    //МПК 
    index1 = s.indexOf("МПК");
    index2 = s.indexOf("(52)");
    if (index2 < 0) index2 = s.indexOf("(12)");
    var MPK = s.slice(index1, index2);

    //авторы
    index1 = s.indexOf("Автор(ы):") + 10;
    index2 = s.indexOf("(73)") - 1;
    var authors = s.slice(index1, index2);

    authors = authors.replace(/\ \(RU\)/g, "");

    var authorsList = authors.split(", ");
    for (let i = 0; i < authorsList.length; i++) {
        authorsList[i] = initials(authorsList[i]);
    }
    authors = authorsList.join(", ");

    //заявка номер
    index1 = s.indexOf("Заявка: ") + 8;
    index2 = s.indexOf(",", index1);
    var zayavkaNumber = s.slice(index1, index2).replace(/\n/g, ' ');

    //заявка дата
    index1 = s.indexOf("Заявка: ") + 8;
    index2 = s.indexOf(",", index1);
    var zayavkaDate = s.slice(index2 + 2, index2 + 10).replace(/\n/g, ' ');

    //опубликовано
    index1 = s.indexOf("Опубликовано:") + 14;
    index2 = index1 + 10;
    var published = s.slice(index1, index2);

    //бюлллетель
    index1 = index2;
    index3 = s.indexOf("(", index2);
    var bulletin = s.slice(index2, index3);
    bulletin = bulletin.replace("No", "№");
    s1 = name.trim() + ": пат. " + number + " Российская Федерация. " + MPK + "/ " + authors + "; № "
        + zayavkaNumber + "; заявл. " + zayavkaDate + "; опубл. " + published + "," + bulletin;

    navigator.clipboard.writeText(s1)
        .then(() => {
            // Получилось!
        })
        .catch(err => {
            console.log('Something went wrong', err);
        });

    return s1;
}


function initials(str) {
    return str.split(/\s+/).map((w, i) => i ? w.substring(0, 1).toUpperCase() + '.' : w).join(' ');
}

