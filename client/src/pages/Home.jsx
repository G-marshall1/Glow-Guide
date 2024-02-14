import Auth from '../utils/auth'
import { useEffect, useState } from 'react';

// import { get_chance } from '../utils/api'
import { GET_ME } from '../utils/queries'
import { useQuery } from '@apollo/client'

const Home = () => {  
  const { loading, data } = useQuery(GET_ME)
  const [userData, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const user = await data?.me || {}
      setUser(user)
    }
    fetchUser()
  }, [])

  if (loading) {
    return <h2>LOADING...</h2>; 
  }
  return (
    <div>
      <header>
        <h1>Welcome to Glow Guide</h1>
      </header>
      <section>
        <p>
          Discover the magic of the Northern Lights with Glow Guide. Plan your
          next aurora borealis adventure and explore the best viewing spots
          around the world.
        </p>
        <p>
          Ready to witness the breathtaking beauty of the Northern Lights?
          Sign up now to unlock additional features!
        </p>
        {/* Add a link or button to navigate to the SignUp page */}
        {!Auth.loggedIn() && (
          <a href="/sign-up">Not a member? Sign Up Here!</a>
        )}
      </section>
      <section>
        {Auth.loggedIn() && (
          <div>
            <section>
              <div>
                <h2>Forecast Lookup</h2>
              </div>
              <div>
                <h2>Top Locations</h2>
                <h3>{userData.username}</h3>
                {/* {
                  userData.location.map((location) => {
                    return (
                      <li key={location.name}>{location.city} : {get_chance(location.name)}%</li>
                    )
                  })
                } */}

              </div>
            </section>
            <section>
              <h2>Tonights Chance</h2>
              <ol>
              </ol>
            </section>     
            <section>
              <h2>Glow Trackers</h2>
            </section>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;

