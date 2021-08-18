import React from 'react';
import Footer from '../core/Footer';
import Header from '../core/Header';

export default function Layout(props: any) {
	return (
		<>
			<div>
				<Header />
				{props.children}
				<Footer />
			</div>
		</>
	);
}
