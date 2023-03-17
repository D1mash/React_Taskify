import React from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TodoItem = ({ ind, item, index, state, setState }) => {
	return (
		<Draggable key={item.id} draggableId={item.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={
						snapshot.isDragging ? "card m-1 border border-dark" : "card m-1 "
					}
				>
					<div className='card-body'>
						<span className='me-2'>{item.content}</span>
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => {
								const newState = [...state];
								newState[ind].splice(index, 1);
								setState(newState.filter(group => group.length));
							}}
						>
							delete
						</button>
					</div>
				</div>
			)}
		</Draggable>
	);
};

export default TodoItem;
