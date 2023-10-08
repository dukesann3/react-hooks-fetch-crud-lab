import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, handleDelete, handlePatch}) {

  function displayQuestions() {
    if (!questions) {
      return <h2>Loading...</h2>
    }

    return questions.map((question) => {
      return <QuestionItem question={question} key={question.id} onDelete={handleDelete} onPatch={handlePatch}/>
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {displayQuestions()}
      </ul>
    </section>
  );
}

export default QuestionList;
