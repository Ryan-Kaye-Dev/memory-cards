export default function Card({ image, text, handleCardClick }) {
  return (
    <>
        <div className="card" onClick={() => handleCardClick(text)}>
          <img src={image} alt="Pokemon" />
          <p>{text}</p>
        </div>
    </>
  );
}
