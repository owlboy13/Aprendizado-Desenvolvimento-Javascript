import './App.css';

function App() {
  window.addEventListener("mousemove", (event) => {
    const localiza = document.getElementById("position");
    let posicaoX = document.getElementById("posicaoX");
    let posicaoY = document.getElementById("posicaoY");
    localiza.style.top = event.clientY + "px";
    localiza.style.left = event.clientX + 5 + "px";
    posicaoY.innerText = event.clientY + "px";
    posicaoX.innerText = event.clientX + "px";
  });
    return (
      <div className="App">
        <header className="App-header">
          <br />
          <div id="position">
            <p>
              x: <span id="posicaoX"></span>
            </p>
            <p>
              y: <span id="posicaoY"></span>
            </p>
          </div>
        </header>
      </div>
    );
}
export default App;
