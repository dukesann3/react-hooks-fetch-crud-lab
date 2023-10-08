import React from "react";

function QuestionItem({ question, onDelete, onPatch }) {
  const { id, prompt, answers, correctIndex } = question;

  async function deleteItem(item){
    await fetch(`http://localhost:4000/questions/${item.id}`, {
      method: 'DELETE'
    });
    
    onDelete(item);
  }

  async function patchItem(e){
    const newItem = {
      id: id,
      prompt: prompt,
      answers: answers,
      correctIndex: e.target.value
    }
    return await fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then((data) => {
      onPatch(data);
      console.log(data);
    })
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={(e) => patchItem(e)}>{options}</select>
      </label>
      <button onClick={() => deleteItem(question)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
