import React from 'react';
import Layout from '../../common/Layout';
import Header from '../../core/Header';
import Slider from '../../slider/container';
import Movies from '../components/Movies';

export default function Dashboard() {
	return (
		<>
			<Layout>
				<Slider />
				<Movies />
			</Layout>
		</>
	);
}
