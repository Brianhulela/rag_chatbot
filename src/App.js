import React from "react";

function App() {

  const [count, setCount] = React.useState(0);
  const [negativeCount, setNegativeCount] = React.useState(0); 

  const addCount = () => {
    setCount(count + 1);
  }

  React.useEffect(() => {
    setNegativeCount(-count);
  }, [count]);

  return (
    <div>
      <h1>React App</h1>
      <p>This is a React app created using Vite and ESBuild.</p>
      <input type="text" placeholder="Enter your prompt" />
      <button>negative: {negativeCount}</button>
      <button onClick={addCount}>counter: {count}</button>
    </div>
  );
}

export default App;
