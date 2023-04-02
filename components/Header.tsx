import React, { useState } from 'react'
import Image from 'next/legacy/image';
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  SearchIcon,
  UsersIcon,
} from '@heroicons/react/solid';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import UserIcon from '@heroicons/react/solid';

type Props = {}

export default function Header({placeholder}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState("");
  const [noOfGuests, setNoOfGuests] = useState(1);
  const router = useRouter();

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  function resetInput() {
    setSearchInput("");
  }

  function search() {
    if (!searchInput) return;

    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });

    setSearchInput("");
  }


  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md py-5 px-5 md:px-10">
      {/*left*/}
      <div onClick={()=>router.push("/")} 
      className="relative flex items-center h-10 my-auto cursor-pointer">
        <Image
        src="/../public/headerlogo.png"
        alt="logo"
        layout="fill"
        objectFit="contain"
        
        objectPosition="left"
        />
      </div>

      {/*middle*/}
      <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
        <input 
        value={searchInput}
        onChange={(e)=>setearchInput(e.target.value)}
        className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400" 
        type='next' 
        placeholder={placeholder || 'start your search'}/>
        <SearchIcon className=' hidden md:inline-flex h-8 bg-green-500 text-white rounded-full p2 cursor-pointer md:mx-2'/>
      </div>

      {/*Right*/}
      <div className='flex items-center space-x-4 justify-end'>
        <p className='hidden md:inline cursor-pointer'>become a host</p>
        <GlobeAltIcon className='h-6 cursor-pointer'/>
        
      <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
        <MenuIcon className='h-6'/>
        <UserCircleIcon className='h-6'/>
      </div> 
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto mt-0">
          <DateRangePicker
            minDate={new Date()}
            rangeColors={["#59F6F1"]}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UsersIcon className="h-5" />
            <input
              className="w-12 pl-2 text-lg outline-none text-black-400"
              type="number"
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
            />
          </div>
          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-black-500">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

