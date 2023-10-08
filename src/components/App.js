import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      });
  }, []);

  function handleQuestionSubmit(questionForm){
    console.log(questionForm);
    console.log(questions);
    debugger;
    setQuestions([...questions, questionForm]);
  }

  function handleDelete(item){
    setQuestions(questions.filter((question) => question.id !== item.id))
  }

  function handlePatch(item){
    //the item must contain 'fixed' question
    setQuestions(questions.map((question) => {
      if(question.id === item.id){
        return item;
      }
      return question;
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleQuestionSubmit={handleQuestionSubmit} /> : <QuestionList questions={questions} handleDelete={handleDelete} handlePatch={handlePatch}/>}
    </main>
  );
}

export default App;
