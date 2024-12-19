// تعريف الأسئلة والإجابات الصحيحة
const questions = [
    {
        question: "ما هي لغة البرمجة التي تُستخدم لتطوير الويب؟",
        options: {
            A: "Java",
            B: "C",
            C: "JavaScript"
        },
        correctAnswer: "C"
    },
    {
        question: "ما هي الخاصية المستخدمة لتغيير اللون في CSS؟",
        options: {
            A: "color",
            B: "background-color",
            C: "font-color"
        },
        correctAnswer: "A"
    },
    {
        question: "ما هي هيكلية البيانات المناسبة لتخزين قيم متعددة مرتبطة؟",
        options: {
            A: "Array",
            B: "Integer",
            C: "String"
        },
        correctAnswer: "A"
    },
    {
        question: "ما هي الكلمة المفتاحية في JavaScript لتعريف المتغير؟",
        options: {
            A: "var",
            B: "let",
            C: "const"
        },
        correctAnswer: "B"
    },
    {
        question: "كيف يتم تعليق كود في JavaScript؟",
        options: {
            A: "// تعليق",
            B: "/* تعليق */",
            C: "//"
        },
        correctAnswer: "A"
    },
    {
        question: "ما هو الـ DOM في JavaScript؟",
        options: {
            A: "Document Object Model",
            B: "Data Object Model",
            C: "Document Operation Method"
        },
        correctAnswer: "A"
    },
    {
        question: "ما هي الطريقة المناسبة لتحويل نص إلى أرقام في JavaScript؟",
        options: {
            A: "parseInt()",
            B: "parseFloat()",
            C: "toString()"
        },
        correctAnswer: "A"
    },
    {
        question: "ما هو اسم أداة إدارة الحزم في Node.js؟",
        options: {
            A: "npm",
            B: "yarn",
            C: "npm install"
        },
        correctAnswer: "A"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = [];

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-title").textContent = question.question;

    // إعداد الخيارات
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ""; // تنظيف الخيارات السابقة

    Object.keys(question.options).forEach(optionKey => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = question.options[optionKey];
        button.setAttribute("data-answer", optionKey); // وضع الخيار في البيانات
        button.onclick = function () { checkAnswer(optionKey); };
        optionsContainer.appendChild(button);
    });

    document.getElementById("next-button-container").classList.add("hidden");
}

function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    if (answer === question.correctAnswer) {
        correctAnswers++;
    } else {
        incorrectAnswers.push({
            question: question.question,
            selectedAnswer: question.options[answer],
            correctAnswer: question.options[question.correctAnswer]
        });
    }
    document.getElementById("next-button-container").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById("next-button-container").classList.add("hidden");
    } else {
        showResult();
    }
}

function showResult() {
    let resultMessage = "";
    if (correctAnswers === questions.length) {
        resultMessage = `ممتاز! إجابتك صحيحة 100%.`;
    } else if (correctAnswers >= questions.length / 2) {
        resultMessage = `جيد! أجبت بشكل جيد.`;
    } else {
        resultMessage = `حاول مجددًا! لديك فرصة أفضل في المرة القادمة.`;
    }

    // عرض النتيجة
    document.getElementById("final-result").textContent = `إجابات صحيحة: ${correctAnswers} من ${questions.length} إجابة.`;
    document.getElementById("result-container").classList.remove("hidden");

    // عرض الأخطاء
    const incorrectList = document.getElementById("incorrect-answers");
    incorrectList.innerHTML = ""; // تنظيف قائمة الأخطاء السابقة
    incorrectAnswers.forEach(incorrect => {
        const listItem = document.createElement("li");
        listItem.textContent = `سؤال: "${incorrect.question}" - إجابتك: "${incorrect.selectedAnswer}" - الإجابة الصحيحة: "${incorrect.correctAnswer}"`;
        incorrectList.appendChild(listItem);
    });
}

// إظهار السؤال الأول عند تحميل الصفحة
window.onload = function () {
    showQuestion();
};
