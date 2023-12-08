import React, {useState} from 'react';
import './NewTodoForm.css';
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import  { getTodos } from './selectors';

const NewTodoForm = ({ todos, onCreatePressed }) => {
	const [inputValue, setInputValue] = useState('');


	return (
		<div className='new-todo-form'>
			<input className='new-todo-input' type='text' placeholder='Type your new todo here' value={inputValue} onChange={e => setInputValue(e.target.value)} />
			<button
				onClick={() => {
					const isDuplicateTodo = todos.some(todo => todo === inputValue.trim());
					if (!isDuplicateTodo) {
						onCreatePressed(inputValue.trim());
						setInputValue('');
					} else {
						alert("You have provided duplicate todo. Please check!");
					}
				}}
				className='new-todo-button'>
				Create Todo
			</button>
		</div>
	);
};

const mapStateToProps = state => ({
	todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
	onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);