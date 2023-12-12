import React, {useState} from 'react';
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import  { getTodos } from './selectors';
import styled from 'styled-components';

const FormContainer = styled.div`
	border-radius: 8px;
	padding: 16px;
	text-align: center;
	box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
	font-size: 16px;
	padding: 8px;
	border: none;
	border-bottom: 2px solid #ddd;
	border-radius: 8px;
	width: 70%;
	outline: none;
`;

const NewTodoButton = styled.button`
	font-size: 16px;
	padding: 8px;
	border: 1px black;
	border-radius: 8px;
	outline: none;
	cursor: pointer;
	margin-left: 8px;
	width: 20%;
	background-color: #87cefa;
`;

const NewTodoForm = ({ todos, onCreatePressed }) => {
	const [inputValue, setInputValue] = useState('');

	return (
		<FormContainer>
			<NewTodoInput type='text' placeholder='Type your new todo here' value={inputValue} onChange={e => setInputValue(e.target.value)} />
			<NewTodoButton
				onClick={() => {
					const isDuplicateTodo = todos.some(todo => todo === inputValue.trim());
					if (!isDuplicateTodo) {
						onCreatePressed(inputValue.trim());
						setInputValue('');
					} else {
						alert("You have provided duplicate todo. Please check!");
					}
				}}
				>
				Create Todo
			</NewTodoButton>
		</FormContainer>
	);
};

const mapStateToProps = state => ({
	todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
	onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);