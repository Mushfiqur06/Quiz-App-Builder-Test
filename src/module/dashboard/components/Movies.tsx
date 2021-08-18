import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchMovies } from '../../../actions';
import { Imovie } from '../constants/interface';

function Movies(props: any) {
	const history = useHistory();
	React.useEffect(() => {
		props.fetchMovies();
	}, []);
	return (
		<>
			<div className="movies">
				<div className="container">
					<div className="movies_title">
						<div className="movies_title__left">
							<h2>Movies</h2>
						</div>
						<div className="movies_title__right">
							<p onClick={() => history.push('/movies')}>See All</p>
						</div>
					</div>
					<div className="movies_row">
						{props.movies[0] &&
							props.movies[0].Search.slice(0, 6).map(
								(item: Imovie, index: number) => {
									return (
										<div key={index} className="movies_row__col">
											<img src={item.Poster} />
										</div>
									);
								}
							)}
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state: any) => {
	return {
		movies: state.movies,
	};
};

export default connect(mapStateToProps, { fetchMovies })(Movies);
