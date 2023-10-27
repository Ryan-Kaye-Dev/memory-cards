import logo from '../assets/logo.png'
export default function TopBar({score, highScore}) {

    return (
        <>
        <div className="topBar">
            <img 
            src={logo} 
            alt="Pokemon Logo"
            className="logo"
             />
            <h2>Score: {score}</h2>
            <h2>High Score: {highScore} </h2>
        </div>
        </>
    );
}