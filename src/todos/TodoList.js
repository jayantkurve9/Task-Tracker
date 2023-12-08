import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.css';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';
import { getTodos, getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';

const TodoList = ({ completedTodos, incompleteTodos, isLoading = false, onRemovedPressed, onCompletedPressed, startLoadingTodos }) => {
	const loadingMessage = <div>Loading todos...</div>
	const content=  (
		<div className='list-wrapper'>
			<NewTodoForm />
			<h2>Incompleted Todos</h2>
			{incompleteTodos.map((todo,i) => <TodoListItem  key={i} todo={todo} onRemovedPressed={onRemovedPressed} onCompletedPressed={onCompletedPressed}/>)}
			<h2>Completed Todos</h2>
			{completedTodos.map((todo,i) => <TodoListItem  key={i} todo={todo} onRemovedPressed={onRemovedPressed} onCompletedPressed={onCompletedPressed}/>)}
		</div>
	);

	useEffect(() => {
		startLoadingTodos();
	}, []);

	return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
	isLoading: getTodosLoading(state),
	completedTodos: getCompletedTodos(state),
	incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
	startLoadingTodos: () => dispatch(loadTodos()),
	onRemovedPressed: id => dispatch(removeTodoRequest(id)),
	onCompletedPressed: id => dispatch(completeTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);