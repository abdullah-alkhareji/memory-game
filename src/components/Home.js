import React, { useEffect, useState } from "react";
import cardsData from "../data/cards";
import Card from "./Card";

const Home = () => {
	const [cards, setCards] = useState([]);
	const [turn, setTurn] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [score, setScore] = useState(0);

	const shuffleCards = () => {
		const shuffledCards = [...cardsData, ...cardsData]
			.sort(() => Math.random() - 0.5)
			.map(card => ({ ...card, id: Math.random() }));
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurn(0);
		setScore(0);
	};

	const handleChoice = card => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.number === choiceTwo.number) {
				setCards(prevCard => {
					return prevCard.map(card => {
						if (card.number === choiceOne.number) {
							return { ...card, match: true };
						} else {
							return card;
						}
					});
				});
				setScore(((8 / turn) * 100).toPrecision(3));
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	useEffect(() => {
		shuffleCards();
	}, []);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurn(turn + 1);
	};

	console.log(cards, turn);

	return (
		<div className='container'>
			<h1>Memory Game</h1>
			<div className='turn-score'>
				<h4>Turn: {turn}</h4>
				<button onClick={shuffleCards}>New Game</button>
				<h4>Score: {score}</h4>
			</div>
			<div className='grid'>
				{cards.map(card => (
					<Card
						card={card}
						key={card.id}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.match}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
