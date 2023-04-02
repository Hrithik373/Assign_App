import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from 'next/router';
import { format } from "date-fns";


function search({placeholder}) {
  const router = useRouter();

  // es6 destructuring
  const { location, startDate, endDate, noOfGuests } = router.query;

  const formattedstartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedendDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedstartDate} - ${formattedendDate}`;

  return (
    <div>
        <Header placeholder = {`${location}|${range}|${noOfGuests} guests`}/>

        <main className='flex'>
            <section className='flex-grow pt-14 px-6'>
                <p className='text-xs'>300+ stays -{range} -for {noOfGuests} dogos</p>

                <h1 className='text-3xl font-semiboldmt-2 mb-5'>stay in {location} </h1>

               
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>
            </section>
        </main>
    <Footer/>
    </div>
  )
}

export default search


export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}