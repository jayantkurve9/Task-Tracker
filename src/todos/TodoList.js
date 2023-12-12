import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { loadTodos, removeTodoRequest, completeTodoRequest } from './thunks';
import { getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';

const ListWrapper = styled.div`
	max-width: 700px;
	margin: auto;
`;

const TodoList = ({ completedTodos, incompleteTodos, isLoading = false, onRemovedPressed, onCompletedPressed, startLoadingTodos }) => {
	const loadingMessage = <div>Loading todos...</div>
	const content=  (
		<ListWrapper>
			<NewTodoForm />
			<h2>Incompleted Todos</h2>
			{incompleteTodos.map((todo,i) => <TodoListItem  key={i} todo={todo} onRemovedPressed={onRemovedPressed} onCompletedPressed={onCompletedPressed}/>)}
			<h2>Completed Todos</h2>
			{completedTodos.map((todo,i) => <TodoListItem  key={i} todo={todo} onRemovedPressed={onRemovedPressed} onCompletedPressed={onCompletedPressed}/>)}
		</ListWrapper>
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