import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  // Tüm quizler, mevcut soru, soru indeksi, doğru cevap, seçilen cevap, toplam puan
  const [quizs, setQuizs] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [marks, setMarks] = useState(0);

  // Görünüm kontrol state'leri
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  // Backend'den veri çekme
 useEffect(() => {
  // İlk fetch: Soruları çekmek için
  fetch(`${process.env.REACT_APP_API_URL}/api/Question`, {
    method: "GET",
    headers: {
      "Connection": "keep-alive",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // Soruları rastgele karıştır ve ilk 20 tanesini al
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, 20);
      setQuizs(selectedQuestions);
    })
    .catch((error) => console.error("Veri çekme hatası:", error));

 
}, []);


  // Mevcut soruyu ayarlama
  useEffect(() => {
    if (quizs.length > questionIndex) {
      setQuestion(quizs[questionIndex]);
    }
  }, [quizs, questionIndex]);

  // Quiz'i başlat
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };
  const goToMain = () => {
    setShowStart(true);
    setShowQuiz(false);
    setShowResult(false);
     // Quiz verilerini sıfırla
    setQuestion({}); // Mevcut soruyu sıfırla
    setQuestionIndex(0); // Soru indeksini sıfırla
    setCorrectAnswer(""); // Doğru cevabı sıfırla
    setSelectedAnswer(""); // Seçilen cevabı sıfırla
    setMarks(0); // Puanı sıfırla
  
    // Yanlış ve doğru butonların rengini sıfırla
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    
  };
  // Cevabı kontrol et
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.correctAnswer);
      setSelectedAnswer(selected);

      if (selected === question.correctAnswer) {
        event.target.classList.add("bg-success");
        setMarks(marks + 5);
      } else {
        event.target.classList.add("bg-danger");
      }
    }
  };

  // Sonraki soru
  const nextQuestion = () => {
    setCorrectAnswer("");
    setSelectedAnswer("");
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
    setQuestionIndex(questionIndex + 1);
  };

  // Sonucu göster
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  };

  // Baştan başla
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setCorrectAnswer("");
    setSelectedAnswer("");
    setQuestionIndex(0);
    setMarks(0);
    const wrongBtn = document.querySelector("button.bg-danger");
    wrongBtn?.classList.remove("bg-danger");
    const rightBtn = document.querySelector("button.bg-success");
    rightBtn?.classList.remove("bg-success");
  };

  return (
    <DataContext.Provider
      value={{
        startQuiz,
        showStart,
        showQuiz,
        question,
        quizs,
        checkAnswer,
        correctAnswer,
        selectedAnswer,
        questionIndex,
        nextQuestion,
        showTheResult,
        showResult,
        marks,
        startOver,
        goToMain,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
