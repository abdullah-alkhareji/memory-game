import React, { useState } from "react";
import flipIcon from "../assets/671472_edit_flip_horizontal_mirror_object_icon.png";

const icon = flipIcon;

const Card = ({ card, handleChoice, flipped }) => {
	const handleClick = () => {
		handleChoice(card);
	};

	return (
		<div className='card'>
			<div className={`card-body ${flipped ? "flipped" : ""}`}>
				<div onClick={handleClick} className='card-back'>
					<img src={icon} width={100} height={100} alt='flipIcon' />
				</div>
				<div className='card-front'>
					<h1 className='card-content'>{card.number}</h1>
				</div>
			</div>
		</div>
	);
};

export default Card;
