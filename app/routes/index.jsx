
import React, { useRef, useEffect, useState } from 'react';

import { useLoaderData } from "@remix-run/react";
import { getDataFromStrapi } from "~/api/get-data-from-strapi.server";
// import { baseUrl } from "~/api/get-data-from-strapi.server";

import Rellax from 'rellax';

// const baseUrl = process.env.NODE_ENV === 'production'
//   ? "https://jules-frontend-dev.herokuapp.com"
//   : "http://127.0.0.1:1337";

let baseUrl = "https://jules-frontend-dev.herokuapp.com";

if (process.env.NODE_ENV !== 'production') {
  baseUrl = "http://127.0.0.1:1337";
  console.log("This is a local build");
} else {
  console.log("This is a production build");
}

 export async function loader() {
    const path = "art-collections/";
    const query = "populate=*";
   const response = await getDataFromStrapi(path, query);
   let data = response.data;
 
   if (!Array.isArray(data)) {
    data = [data]; // Wrap data in an array if it's not already an array
  }

  data.sort((a, b) => {
    const dateA = new Date(a.attributes.Date);
    const dateB = new Date(b.attributes.Date);
    return dateB - dateA; // Sort in descending order
  });
  console.log(data)
  return { info: data };
   
 }
 
 

// const data = {
//   info: [
//     {
//       id: 1,
//       image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
//       title: "Starry Night",
//       date: "06/06/2023",
//     },
//     {
//       id: 2,
//       image: "https://cdn.shopify.com/s/files/1/0047/4231/6066/files/The_Scream_by_Edvard_Munch_1893_800x.png",
//       title: "The Scream",
//       date: "05/03/23",
//     },
//     {
//       id: 3,
//       image: "/cover.jpg",
//       title: "title2",
//       date: "xx/yy/zz",
//     },
//   ],
// };



function ArtCard({ data, index }) {
  const path_medImage = data.attributes.ArtImage.data.attributes.formats.medium.url;
  
  const mediumImage=`${baseUrl}${path_medImage}`;
  
 
 


  const ref = useRef();

  useEffect(() => {
    new Rellax(ref.current, {
      speed: -2,
      xsSpeed: 0,
      mobileSpeed: 0,
      tabletSpeed: 0,
    });
  }, []);
  if (index > 3) {
    return null; // Skip rendering for items after the fourth index
  }
  return (
    <a
      href="/pages/project.html"
      data-rellax-speed="-2"
      data-rellax-xs-speed="0"
      data-rellax-mobile-speed="0"
      data-rellax-tablet-speed="0"
      className="rellax group col-span-2 lg:col-span-1"
    >
      <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}className="relative before:absolute before:inset-0 before:origin-top before:bg-gradient-to-t before:from-black/5 before:opacity-50 before:backdrop-grayscale before:transition before:duration-500 group-hover:before:origin-bottom group-hover:before:scale-y-0">
        <img
          className="transition duration-500"
          src={mediumImage}
          alt={data.attributes.Title}
          style={{ width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-2xl font-normal text-white">{data.attributes.Title}</h3>
        <span className="h-max rounded-full border border-white/30 px-2 py-1 text-xs tracking-wider text-white">
          {data.attributes.Date}
        </span>
      </div>
    </a>
  );
  
}

export default function HomeRoute() {
const { info } = useLoaderData();
const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const sectionRef = useRef(null);

  const handlePrevious = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
      scrollToSection();
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < info.length) {
      setStartIndex(startIndex + itemsPerPage);
      scrollToSection();
    }
  };

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const displayedItems = info.slice(startIndex, startIndex + itemsPerPage);

  const isFirstPage = startIndex === 0;
  const isLastPage = startIndex + itemsPerPage >= info.length;

  return (
    <div className="bg-black">
    <main className="background relative">
      <header className="fixed top-0 z-20 w-full">
            <nav className="2lg:px-12 mx-auto max-w-7xl px-6 py-12 lg:px-12 xl:px-6 2xl:px-0">
                <div className="flex items-center justify-between">
                    <a href="/" className="text-2xl font-light tracking-widest text-white -mt-10">
                        <i className="fa fa-home fa-1x" aria-hidden="true"></i>
                    </a>
                    <a href="#work" className="relative py-1.5 text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10 -mt-10">
                        <span className="relative">Portfolio</span>
                    </a>
                    <a href="#services" className="relative py-1.5 text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10 -mt-10">
                        <span className="relative">Services</span>
                    </a>
                    <a href="#about" className="relative py-1.5 text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10 -mt-10">
                        <span className="relative">About</span>
                    </a>
                    <a href="#contact" className="relative py-1.5 text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10 -mt-10">
                        <span className="relative">Contact</span>
                    </a>
                </div>
            </nav>
      </header>
    <section id="home" className="relative flex min-h-screen items-center">
        <div aria-hidden="true" className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-black/20 to-black"></div>
        <img src="/cover2.jpg" className="fixed inset-0 h-full w-full object-cover" alt="woman in dark" width="4160" height="6240" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-30 lg:px-12 xl:px-6 2xl:px-0">
            <div className="pb-12 media-h:md:pb-32 media-h:lg:pb-12 xl:pb-12">
                <h1 data-rellax-speed="-3" data-rellax-xs-speed="0" data-rellax-mobile-speed="0" className="rellax text-6xl font-bold text-white sm:text-8xl md:text-9xl xl:leading-tight sm:mt-40 md:mt-66 lg:mt-54 xl:mt-0 2xl:mt-0">JULIE JPG</h1>
            </div>
            <div>
                <div className="ml-auto md:w-2/3 md:pt-12 lg:w-1/2">
                    <p className="mb-20 text-lg font-light text-white sm:text-2xl xl:leading-normal">On an endless journey to create experiences that inspire others. Always motived by design that's honest, aesthetic and natural. Probably the only designer you’ll ever need.</p>
                    <a data-rellax-speed="1" data-rellax-xs-speed="0" data-rellax-mobile-speed="0" href="#work" className="rellax relative inline-block py-1.5 text-white before:absolute before:inset-0 before:origin-bottom before:scale-y-[.03] before:bg-white/60 before:transition before:duration-300 hover:before:scale-y-100 hover:before:scale-x-125 hover:before:bg-white/10">
                        <span className="relative">See my work</span>
                    </a>
                </div>
            </div>
            <div data-rellax-speed="-5" data-rellax-xs-speed="0" data-rellax-mobile-speed="0" className="rellax relative mt-16 ml-auto w-max md:mt-32 md:ml-0 xl:-mt-16">
                <span className="text-xs font-light uppercase tracking-widest text-white">Follow me</span>
                <ul className="relative z-20 mt-4 space-y-2 text-sm font-light text-white">
                    <li>
                    <a href="https://www.instagram.com/juulie.jpg/" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section ref={sectionRef} id="work" className="relative bg-black pb-20 pt-32 md:pb-0 lg:pb-32 xl:pt-96">          
    <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-6 xl:pb-96 2xl:px-0">
            <div
              data-rellax-speed="-1"
              data-rellax-xs-speed="0"
              data-rellax-mobile-speed="0"
              className="rellax flex flex-wrap items-center gap-6"
            >
              <h2 className="text-7xl font-bold text-white xl:text-8xl">
                My work
              </h2>
              <span className="h-max rounded-full border border-white/40 px-2 py-1 text-xs tracking-wider text-white">
                {info.length} Projects
              </span>
            </div>
            <div className="relative mt-20 gap-20 gap-x-6 space-y-20 sm:grid sm:grid-cols-2 sm:space-y-0 md:mt-72 lg:mt-60">
          {displayedItems.map((item, index) => (
            <ArtCard key={item.id} data={item} index={index} />
          ))}
        </div>
      </div>
      {info.length > itemsPerPage && (
        <div className="flex justify-center mt-10 space-x-4">
            {!isFirstPage && (
          <button className="text-white text-3xl underline" onClick={handlePrevious}>
            Previous
          </button>)}
          {!isLastPage && (
          <button className="text-white text-3xl underline" onClick={handleNext}>
            More
          </button>)}
        </div>
      )}
    </section>
    <section id="services" className="relative bg-black pb-0 pt-32 md:pb-0 lg:pb-32 xl:pt-96">
                <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-6 2xl:px-0">
                    <div className="flex flex-wrap items-center gap-6">
                        <h2 className="text-7xl font-bold text-white xl:text-8xl">My services</h2>
                        <span className="h-max rounded-full border border-white/40 px-2 py-1 text-xs tracking-wider text-white">03 services</span>
                    </div>
                    <div className="mt-24">
                        <div className="">
                            <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3">
                                <div>
                                    <div className="group border-b border-white/30 pb-8">
                                        <div className="flex flex-col gap-4 divide-y divide-white/30">
                                            <span className="inline-block text-white/60">001</span>
                                            <h3 className="bg-black pt-6 text-3xl text-white">Artwork</h3>
                                        </div>
                                        <div className="mt-0 overflow-hidden transition-all duration-500 group-hover:mt-8">
                                            <p className="max-h-0 font-light text-white/70 transition-all duration-500 group-hover:max-h-24 md:text-xl">Sapiente, rem debitis obcaecati facilis earum repudiandae enim ratione nihil iusto ea. Officia sint perspiciatis ad ducimus qui.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="group border-b border-white/30 pb-8">
                                        <div className="flex flex-col gap-4 divide-y divide-white/30">
                                            <span className="inline-block text-white/60">002</span>
                                            <h3 className="bg-black pt-6 text-3xl text-white">Paintings</h3>
                                        </div>
                                        <div className="mt-0 overflow-hidden transition-all duration-500 group-hover:mt-8">
                                            <p className="max-h-0 font-light text-white/70 transition-all duration-500 group-hover:max-h-24 md:text-xl">Sapiente, rem debitis obcaecati facilis earum repudiandae enim ratione nihil iusto ea. Officia sint perspiciatis ad ducimus qui.</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="group border-b border-white/30 pb-8">
                                        <div className="flex flex-col gap-4 divide-y divide-white/30">
                                            <span className="inline-block text-white/60">003</span>
                                            <h3 className="bg-black pt-6 text-3xl text-white">Sketches</h3>
                                        </div>
                                        <div className="mt-0 overflow-hidden transition-all duration-500 group-hover:mt-8">
                                            <p className="max-h-0 font-light text-white/70 transition-all duration-500 group-hover:max-h-24 md:text-xl">Sapiente, rem debitis obcaecati facilis earum repudiandae enim ratione nihil iusto ea. Officia sint perspiciatis ad ducimus qui.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </section>
    <section id="about" className="relative z-10 bg-black pb-0 pt-12 md:pb-0 md:pt-0 lg:pb-0 xl:pt-96">
                <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-6 2xl:px-0">
                    <div data-rellax-speed="-0.4" data-rellax-xs-speed="0" data-rellax-mobile-speed="0" className="rellax flex flex-wrap items-center gap-6">
                        <h2 className="text-7xl font-bold text-white xl:text-8xl">About me</h2>
                    </div>
                    <div className="mt-24 md:mt-72">
                    <div className="grid gap-6">
    <div className="grid md:grid-cols-3">
        <div className="overflow-hidden md:col-span-2 flex items-center" data-rellax-speed="1" data-rellax-xs-speed="0" data-rellax-mobile-speed="0" data-rellax-tablet-speed="0.5">
            <img src="/cover3.jpg" alt="unnamed duo photo" width="1500" height="1000" />
        </div>
        <div className="ml-auto flex items-center bg-white">
            <div>
                <p className="text-6xl font-light text-black ml-4">Hello, I'm Julie, a Toronto-based artist.</p>
                <hr className="border-black my-4" />
                <p className="text-2xl font-light text-black ml-4">Passionate about painting and drawing, I express myself creatively through vibrant colors and intricate details. Inspired by the streets of Toronto, I infuse my unique perspective into each artwork. Join me on this artistic journey as I invite you to experience the power of art through my lens.</p> 
            </div>
        </div>
    </div>
</div>

                    </div>
                </div>
    </section>
    <section id="contact" className="relative z-10 bg-gradient-to-b from-black via-black/80 to-black pt-32 backdrop-blur-3xl lg:pb-32 lg:pt-0">
                <div className="mx-auto max-w-7xl px-6 lg:px-12 xl:px-6 2xl:px-0">
                    <div className="flex flex-wrap items-center gap-6">
                        <h2 className="text-7xl font-bold text-white xl:text-8xl sm:mt-8 md:mt-16 lg:mt-24 xl:mt-0 2xl:mt-0">Let's work together</h2>
                    </div>
                    <div className="mt-4">
                        <div className="grid gap-6 border-t border-white/30 pt-24 lg:grid-cols-3 lg:gap-24">
                            <div className="lg:col-span-2">
                                <form action="" className="mx-auto space-y-8 md:w-3/4">
                                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-4">
                                        <div>
                                            <label htmlFor="firstname" className="tracking-wide text-white">Fistname</label>
                                            <input type="text" id="fistname" name="fistname" autoComplete="name" placeholder="Your fistname" className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary" />
                                        </div>
                                        <div>
                                            <label htmlFor="lastname" className="tracking-wide text-white">Last name</label>
                                            <input type="text" id="lastname" name="lastname" autoComplete="family-name" placeholder="Your last name" className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="tracking-wide text-white">Mail address</label>
                                        <input type="email" id="email" name="email" placeholder="Your mail address" className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="tracking-wide text-white">Your message</label>
                                        <textarea name="message" id="message" cols="30" rows="6" placeholder="Your message" className="mt-3 w-full border border-white/20 bg-transparent px-4 py-3 text-white/70 outline-none focus:ring-1 focus:ring-primary"></textarea>
                                    </div>
                                    <button type="submit" className="group ml-auto flex h-12 w-auto items-center overflow-hidden bg-white px-5 transition-all duration-300 hover:bg-primary">
                                        <span className="relative uppercase tracking-wide text-black group-hover:text-white"> Send message </span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
    </section>

    </main>
        <footer className="relative bg-black pt-32 backdrop-opacity-0">
        <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-12 xl:px-6 2xl:px-0">
            <div>
                <div className="flex flex-wrap items-center gap-6">
                    <h2 className="text-3xl text-white xl:text-6xl">Instagram</h2>
                    <a href="https://www.instagram.com/juulie.jpg/" target="_blank" className="h-max rounded-full border border-white/40 px-2 py-1 text-xs tracking-wider text-white">@juulie.jpg</a>
                </div>
                <div className="mt-12 grid grid-cols-3 md:mt-16 lg:mt-24">
                    <a href="https://www.instagram.com/p/CUc-KEklghs/" target="_blank" className="relative before:absolute before:inset-0 before:origin-top before:bg-gradient-to-t before:from-black/5 before:opacity-50 before:backdrop-grayscale before:transition before:duration-500 hover:before:origin-bottom hover:before:scale-y-0">
                        <span className="sr-only">Instagram feed</span>
                        <img className="transition duration-500" src="/ig1.jpg" alt="insta feed cover" width="2000" height="1333" />
                    </a>
                    <a href="https://www.instagram.com/p/CNst7BmBp63/" target="_blank" className="relative before:absolute before:inset-0 before:origin-top before:bg-gradient-to-t before:from-black/5 before:opacity-50 before:backdrop-grayscale before:transition before:duration-500 hover:before:origin-bottom hover:before:scale-y-0">
                        <span className="sr-only">Instagram feed</span>
                        <img className="transition duration-500" src="/ig2.jpg" alt="insta feed cover" width="2000" height="1334" />
                    </a>
                    <a href="https://www.instagram.com/p/CdbkYJdJ4BJ/" target="_blank" className="relative before:absolute before:inset-0 before:origin-top before:bg-gradient-to-t before:from-black/5 before:opacity-50 before:backdrop-grayscale before:transition before:duration-500 hover:before:origin-bottom hover:before:scale-y-0">
                        <span className="sr-only">Instagram feed</span>
                        <img className="transition duration-500" src="/ig3.jpg" alt="insta feed cover" width="1800" height="1200" />
                    </a>
                </div>
            </div>
            <div className="mt-12 md:mt-16 lg:mt-24">
                <div className="space-y-8 md:space-y-12">
                    <a href="/" className="text-2xl font-light tracking-widest text-white">
                        <img className="h-8 w-auto brightness-200" src="/empresspaint.png" alt="logo mark" width="100" height="100" />
                    </a>
                    <div className="flex flex-wrap justify-between gap-3">
                        <span className="text-sm text-white/50">&copy; Radiant 2021 - Present</span>
                        <span className="text-sm text-white/50"><a href="pmdaybreak.com" className="text-white">PM Daybreak Designs</a> via Tailus in Lubumbashi </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossOrigin="anonymous"></script>
    </div>
  );
}
