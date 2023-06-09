import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TodoList from "../components/TodoList";

// fake data generator
const getItems = (count, offset = 0) =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k + offset}-${new Date().getTime()}`,
		content: `item ${k + offset}`,
	}));

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
	const sourceClone = Array.from(source);
	const destClone = Array.from(destination);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = {};
	result[droppableSource.droppableId] = sourceClone;
	result[droppableDestination.droppableId] = destClone;

	return result;
};

const Board = () => {
	const [state, setState] = useState([getItems(10), getItems(5, 10)]);

	function onDragEnd(result) {
		const { source, destination } = result;

		// dropped outside the list
		if (!destination) {
			return;
		}
		const sInd = +source.droppableId;
		const dInd = +destination.droppableId;

		if (sInd === dInd) {
			const items = reorder(state[sInd], source.index, destination.index);
			const newState = [...state];
			newState[sInd] = items;
			setState(newState);
		} else {
			const result = move(state[sInd], state[dInd], source, destination);
			console.log(result);
			const newState = [...state];
			newState[sInd] = result[sInd];
			newState[dInd] = result[dInd];

			setState(newState.filter(group => group.length));
		}
	}

	return (
		<div>
			<nav className='navbar  navbar-dark bg-dark mb-2 py-2'>
				<div className='d-flex justify-content-start'>
					<div className='container'>
						<a class='navbar-brand fw-bold' href='#'>
							Taskify
						</a>
						<button
							type='button'
							className='btn btn-primary mx-1'
							onClick={() => {
								setState([...state, []]);
							}}
						>
							+ Group
						</button>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => {
								setState([...state, getItems(1)]);
							}}
						>
							+ item
						</button>
					</div>
				</div>
			</nav>
			<div className='d-flex justify-content-start'>
				<DragDropContext onDragEnd={onDragEnd}>
					{state.map((el, ind) => (
						<TodoList el={el} ind={ind} state={state} setState={setState} />
					))}
				</DragDropContext>
			</div>
		</div>
	);
};

export default Board;
