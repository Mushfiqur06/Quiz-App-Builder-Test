/* eslint-disable */
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

export function SearchInput(props: any) {
	return (
		<input
			className="searchInput"
			type="text"
			placeholder="Search..."
			{...props}
		/>
	);
}
export function SearchButtonClear({ style, className, ...rest }: any) {
	return (
		<button className="close_btn" {...rest}>
			<MdClose size={30} color=" grey" />
		</button>
	);
}
export function SearchButtonSearch({ style, className, ...rest }: any) {
	return (
		<button {...rest} style={{ marginRight: '20px' }}>
			<FiSearch size={24} color=" grey" />
		</button>
	);
}
export function Searchbar({ renderInput, renderButton }: any) {
	return (
		<div className="search_container">
			{renderButton()}
			{renderInput()}
		</div>
	);
}
