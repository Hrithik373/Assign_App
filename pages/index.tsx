import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header';
import Banner from '../components/Banner';
import smallcard from '../components/SmallCard';
import SmallCard from '../components/SmallCard';
import MediumCard from '../components/MediumCard';
import LargeCard from '../components/LargeCard';
import Footer from '../components/Footer'

type Props = {
  exploreData: exploreData [];
}

const Home = ({ exploreData, cardsData }: Props) => {
  return (
    <div >
      <Head>
        <title>Beeuhhh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      
      <Header />
      <Banner />
      <main className="mx-auto px-8 sm:px-16 max-w-7xl">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData.map(({ img, distance, location }) => (
              <SmallCard
                key={img}
                img={img}
                distance={distance}
                location={location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className='text-4xl font-semibold py-8'>Live anywhere</h2>
            <div className='flex space-x-2 overflow-scroll scrollbar-hide p-3 -ml-3'>
            {cardsData?.map(({ img, title })=>(
            <MediumCard key={img} img={img} title ={title}/>
            ))}
            </div>
        </section>
        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
        <Footer />
      </main>
    </div>
  )
 
};


export default Home; 


export const getStaticProps: getStaticProps<Props> = async () => {

  const exploreData = await fetch("https://raw.githubusercontent.com/Hrithik373/seint/seint/public/api1.json").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://raw.githubusercontent.com/Hrithik373/seint/seint/public/api2.json").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData
    },
  };

};


