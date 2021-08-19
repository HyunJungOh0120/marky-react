import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useMain } from '../../MainProvider';
import axiosInstance from '../../utils/axios';
import DeleteButton from './DeleteButton';

const Memo = ({ onhandleChange, onhandleSaveMemo, memo }) => {
	const queryClient = useQueryClient();
	const blurHandler = (e) => {
		const { id } = e.target;
		onhandleSaveMemo(e, id);
	};

	const deleteMutation = useMutation(
		(id) => {
			return axiosInstance.delete(`/memo/${id}`);
		},
		{
			onSuccess: async () => {
				console.log('im first!');
				queryClient.invalidateQueries('memo');
			},
		},
	);

	// () => deleteMutation.mute(memo.id)

	return (
		<div className="relative bg-white mb-2">
			<DeleteButton
				onClick={() => {
					deleteMutation.mutate(memo.id);
				}}
			/>
			<div className="p-1">
				<textarea
					onChange={(e) => onhandleChange(e)}
					onBlur={(e) => blurHandler(e)}
					name="memo"
					cols="28"
					rows="7"
					defaultValue={memo && memo.text}
					id={memo && memo.id}
				/>
			</div>
		</div>
	);
};

const MemoBoard = ({ className }) => {
	const { mainState } = useMain();
	const { userId } = mainState; // userId
	const { articleId } = useParams();
	const [text, setText] = useState('');
	const queryClient = useQueryClient();

	// Get all memo
	//eslint-disable-next-line
	const { status, data, error, isLoading } = useQuery('memo', async () => {
		const { data: response } = await axiosInstance.get(`/memo/?article=${articleId}`);
		return response;
	});
	console.log(text);

	// POST memo
	const addMutation = useMutation(
		() => {
			setText('');
			return axiosInstance.post(`/memo/`, { article: articleId, user: userId, text: text });
		},
		{
			onSuccess: async () => {
				console.log('im first!');

				queryClient.invalidateQueries('memo');
			},
		},
	);

	// PUT memo how to get memo id?
	const editMutation = useMutation((id) => {
		return axiosInstance.put(`/memo/${id}`, { article: articleId, user: userId, text: text });
	});

	//eslint-disable-next-line
	const handleAddClick = (e) => {
		// add memo => create memo no text // post
		addMutation.mutate();
	};

	const handleBlur = (e, id) => {
		// edit memo
		console.log(e.target.value, id);
		editMutation.mutate(id);
		setText('');
	};

	const handleChange = (e) => {
		// get memotext
		setText(e.target.value);
	};

	return (
		<div className={`${className}`}>
			<button type="button" className="mb-2 self-center" onClick={handleAddClick}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</button>
			<div className="memo-board ">
				{data &&
					data.map((memo) => (
						<Memo
							key={memo.id}
							onhandleSaveMemo={handleBlur}
							memo={memo}
							onhandleChange={handleChange}
						/>
					))}
			</div>
		</div>
	);
};

export default MemoBoard;

Memo.propTypes = {
	onhandleSaveMemo: PropTypes.func,
	onhandleChange: PropTypes.func,
	memo: PropTypes.shape({
		id: PropTypes.number,
		user: PropTypes.number,
		text: PropTypes.string,
		article: PropTypes.number,
		created_at: PropTypes.string,
	}),
};

MemoBoard.propTypes = {
	className: PropTypes.string,
};
