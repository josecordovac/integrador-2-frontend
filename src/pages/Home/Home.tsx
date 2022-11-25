import Header from '../../components/Header/Header';
import './home.scss'

const Home = () => {
  return (
    <>
      <Header/>
      <main className='home'>
        <h1 className='home__title'>Graphics PowerBI</h1>
        <div className='home__graphics'>
          <iframe
              title="Programate_PowerBI - Informe 1"
              width="1000"
              height="600"
              src="https://app.powerbi.com/view?r=eyJrIjoiMGVhOWNmZDAtZmVjZC00MTU3LTgwOWYtN2M0YTI0NDEyNjU0IiwidCI6ImM0YTY2YzM0LTJiYjctNDUxZi04YmUxLWIyYzI2YTQzMDE1OCIsImMiOjR9"
              allowFullScreen={true}
            ></iframe>
        </div>
      </main>
    </>
  )
}

export default Home