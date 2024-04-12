import { Button } from "./ui/button";

function App() {
  return (
    <div data-testid="app-component" className="bg-zinc-600 h-full">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
