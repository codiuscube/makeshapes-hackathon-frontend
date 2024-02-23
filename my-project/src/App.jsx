import { useState } from "react";
import "./App.css";

export default function App() {
  const initialQuestions = [
    {
      id: 1,
      content:
        "What happens if unconscious bias is not addressed within a team?",
      votes: 0,
      responses: [],
    },
    {
      id: 2,
      content:
        "Tell me more about how unconscious bias affects decision-making?",
      votes: 0,
      responses: [
        {
          text: "Unconscious bias can skew our perception, leading to decisions that may not be based on objective criteria but on preconceived notions or stereotypes. This can impact hiring, promotions, and daily interactions, limiting opportunities for diverse talents.",
          avatar: `https://source.unsplash.com/random/40x40/?face&sig=${Date.now()}${Math.random()}`,
        },
        {
          text: "It can cause us to make assumptions or draw conclusions quickly without considering all the facts or perspectives. Recognizing and challenging these biases can lead to more deliberate, fair, and inclusive decision-making processes.",
          avatar: `https://source.unsplash.com/random/40x40/?face&sig=${Date.now()}${Math.random()}`,
        },
      ],
    },
    {
      id: 3,
      content: "How can we create safe spaces for discussing unconscious bias?",
      votes: 0,
      responses: [
        {
          text: "Creating safe spaces starts with fostering an environment of trust and openness, where team members feel comfortable sharing their experiences and perspectives without fear of judgment or retribution. Active listening and empathy are key.",
          avatar: `https://source.unsplash.com/random/40x40/?face&sig=${Date.now()}${Math.random()}`,
        },
      ],
    },
    {
      id: 4,
      content: "What role does leadership play in addressing unconscious bias?",
      votes: 0,
      responses: [
        {
          text: "Leadership is crucial in setting the tone for an inclusive culture. By acknowledging their own biases and leading by example, leaders can inspire their teams to do the same and implement strategies to mitigate bias across the organization.",
          avatar: `https://source.unsplash.com/random/40x40/?face&sig=${Date.now()}${Math.random()}`,
        },
        {
          text: "Leaders must actively support diversity and inclusion initiatives, provide resources for continuous learning, and ensure that policies and procedures are in place to address bias and foster an environment of equality and respect.",
          avatar: `https://source.unsplash.com/random/40x40/?face&sig=${Date.now()}${Math.random()}`,
        },
      ],
    },
    {
      id: 5,
      content: "Can unconscious bias training really make a difference?",
      votes: 0,
      responses: [],
    },
    // Additional questions...
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [visibleResponses, setVisibleResponses] = useState({});
  const [responseText, setResponseText] = useState({});
  const [upvotedQuestions, setUpvotedQuestions] = useState(new Set());
  const [showResponseInput, setShowResponseInput] = useState({});

  const toggleResponseInput = (id) => {
    setShowResponseInput((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleUpvote = (id) => {
    if (upvotedQuestions.has(id)) return;
    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, votes: question.votes + 1 } : question
    );
    setQuestions(updatedQuestions);
    setUpvotedQuestions(new Set(upvotedQuestions.add(id)));
  };

  const toggleResponses = (id) => {
    setVisibleResponses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitResponse = (id) => {
    alert(`Response for question ${id}: "${responseText[id] || ""}"`);
    setResponseText((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-4 text-left">
        Leaning in: Unconscious Bias
      </h1>
      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-white shadow-md rounded-lg flex items-start"
            style={{ width: "600px", maxWidth: "100%" }}
          >
            <div className="p-4">
              <button
                className={`inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  upvotedQuestions.has(question.id)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleUpvote(question.id)}
                disabled={upvotedQuestions.has(question.id)}
              >
                ↑ <span className="ml-2">{question.votes}</span>
              </button>
            </div>
            <div className="p-4 flex-1 text-left min-w-0">
              <p className="text-left font-bold">{question.content}</p>
              <div className="flex justify-end items-center mt-2 space-x-2">
                <button
                  className="text-sm text-blue-500"
                  onClick={() => toggleResponseInput(question.id)}
                >
                  Respond
                </button>
                <button
                  className="text-sm text-blue-500 disabled:text-gray-400"
                  onClick={() => toggleResponses(question.id)}
                  disabled={question.responses.length === 0}
                >
                  {visibleResponses[question.id]
                    ? `Hide Responses (${question.responses.length})`
                    : `Show Responses (${question.responses.length})`}
                </button>
              </div>

              {visibleResponses[question.id] && (
                <div className="mt-2 space-y-2">
                  {question.responses.map((response, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <img
                        src={response.avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <p className="text-gray-600 text-sm flex-1">
                        {response.text}
                      </p>
                    </div>
                  ))}
                  {showResponseInput[question.id] && (
                    <div className="mt-2 flex">
                      <input
                        type="text"
                        className="border rounded p-2 flex-1"
                        placeholder="Write a response..."
                        value={responseText[question.id] || ""}
                        onChange={(e) =>
                          setResponseText({
                            ...responseText,
                            [question.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleSubmitResponse(question.id)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              )}
              {!visibleResponses[question.id] &&
                showResponseInput[question.id] && (
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      className="border rounded p-2 flex-1"
                      placeholder="Write a response..."
                      value={responseText[question.id] || ""}
                      onChange={(e) =>
                        setResponseText({
                          ...responseText,
                          [question.id]: e.target.value,
                        })
                      }
                    />
                    <button
                      className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleSubmitResponse(question.id)}
                    >
                      Submit
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => alert("Feature to ask a new question coming soon!")}
      >
        Ask a Question
      </button>
    </div>
  );
}
