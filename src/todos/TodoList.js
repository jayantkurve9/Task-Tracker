import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';

const TodoList = ({ todos = [], isLoading = false, onRemovedPressed, onCompletedPressed, startLoadingTodos }) => {
	const loadingMessage = <div>Loading todos...</div>
	const content=  (
		<div className='list-wrapper'>
			<NewTodoForm />
			{todos.map((todo,i) => <TodoListItem  key={i} todo={todo} onRemovedPressed={onRemovedPressed} onCompletedPressed={onCompletedPressed}/>)}
		</div>
	);

	useEffect(() => {
		startLoadingTodos();
	}, []);

	return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
	todos: state.todos,
	isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
	startLoadingTodos: () => dispatch(loadTodos()),
	onRemovedPressed: id => dispatch(removeTodoRequest(id)),
	onCompletedPressed: id => dispatch(completeTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);