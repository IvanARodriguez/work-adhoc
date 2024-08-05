import './Loader.css' // We will create this CSS file next

const Loader = () => {
	return (
		<div className='loader-container'>
			<div className='circle circle1 bg-blue-500'></div>
			<div className='circle circle2 bg-purple-500'></div>
			<div className='circle circle3 bg-blue-700'></div>
			<div className='circle circle4 bg-purple-700'></div>
		</div>
	)
}

export default Loader
