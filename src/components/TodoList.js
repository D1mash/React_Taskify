import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";

const TodoList = ({ el, ind, state, setState }) => {
	return (
		<Droppable key={ind} droppableId={`${ind}`}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
					className={
						snapshot.isDraggingOver
							? "p-3 mx-2 bg-warning bg-gradient"
							: "p-3 mx-2 bg-info bg-gradient"
					}
				>
					{el.map((item, index) => (
						<TodoItem
							ind={ind}
							item={item}
							index={index}
							state={state}
							setState={setState}
						/>
					))}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default TodoList;
