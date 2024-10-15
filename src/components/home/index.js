import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <div
        className="w-full h-screen bg-no-repeat bg-cover flex flex-col justify-between items-center gap-4 py-6 px-4 md:px-8"
        style={{
          backgroundImage: `url(/images/back.png)`,
        }}
      >
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-bold text-white uppercase">
            betavote 😎
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-2xl md:text-4xl text-teal-400 font-semibold capitalize">
            Make your voice count
          </p>
          <p className="mt-2 md:mt-4 text-base md:text-lg text-white capitalize">
            Join millions in shaping the future. Register, vote, and be heard in
            the upcoming elections.
          </p>
        </div>
        <div className="mt-4 flex justify-center w-full">
         <Link to={"final"} className="w-full h-full flex justify-center"> <button 
            className="w-full md:w-2/12 h-12 md:h-14 border-2 border-white shadow-md rounded-xl text-white font-semibold capitalize hover:bg-teal-500 hover:border-teal-500 transition duration-300"
            aria-label="Get started with BetaVote"
          >
            Get started
          </button></Link>
        </div>
      </div>
    </section>
  );
}
