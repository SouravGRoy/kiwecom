import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-black text-white pt-10">
      <div className="flex gap-5 w-full px-10 md:px-20 font-bold font-founders">
        <div className="w-11/12 flex flex-col h-full justify-between">
          <div className="heading">
            <h1 className="md:text-8xl text-6xl font-semibold leading-none uppercase -mb-5">
              Eye-
            </h1>
            <h1 className="text-[8vw] font-semibold leading-none uppercase -mb-10">
              Opening
            </h1>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <h1 className="md:text-8xl text-end text-5xl font-semibold leading-none uppercase -mb-5">
            WEBSITES
          </h1>
          <div className="text-start px-14 font-['NeueMontreal-Regular'] font-thin md:px-32 mt-20">
            <div className="mb-4 font-thin">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <a
              href="https://www.instagram.com/kiwe_media/?hl=en"
              className="block text-md underline leading-6 font-thin"
            >
              Instagram
            </a>
            <a
              href="https://x.com/SouravGRoy"
              className="block text-md underline leading-6 font-thin"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/sourob-guha-roy-0a2ba621a/"
              className="block text-md underline leading-6 font-thin"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col md:flex-row md:pl-32 px-14 md:px-0 justify-center md:justify-center gap-8 md:gap-20">
            <div className="dets font-['NeueMontreal-Regular'] text-start mt-8">
              <h1 className="mb-4 text-md font-thin">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </h1>
              <div className="block text-md underline leading-6 font-thin">
                Pradhan Nagar
              </div>
              <div className="block text-md underline leading-6 font-thin">
                Siliguri, West Bengal
              </div>
              <div className="block text-md underline leading-6 font-thin">
                734001
              </div>
            </div>
            <div className="dets font-['NeueMontreal-Regular'] text-start">
              <h1 className="mb-4 text-md font-thin">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm14 18a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h4ZM5 11a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H5Zm14 2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4Z" />
                </svg>
              </h1>
              <Link
                href="/"
                className="block text-md underline leading-6 font-thin"
              >
                Home
              </Link>
              <Link
                href="/work"
                className="block text-md underline leading-6 font-thin"
              >
                Our Work
              </Link>
              <Link
                href="/services"
                className="block text-md underline leading-6 font-thin"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block text-md underline leading-6 font-thin"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-md underline leading-6 font-thin"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="dets font-['NeueMontreal-Regular'] pl-14 text-start md:px-32 mt-8">
            <h1 className="mb-4 text-md font-thin">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 6h-2V5h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2h-.541A5.965 5.965 0 0 1 14 10v4a1 1 0 1 1-2 0v-4c0-2.206-1.794-4-4-4-.075 0-.148.012-.22.028C7.686 6.022 7.596 6 7.5 6A4.505 4.505 0 0 0 3 10.5V16a1 1 0 0 0 1 1h7v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3h5a1 1 0 0 0 1-1v-6c0-2.206-1.794-4-4-4Zm-9 8.5H7a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2Z" />
              </svg>
            </h1>
            <a
              href="mailto:kiwe@gmail.com"
              className="block text-md underline leading-6 font-thin"
            >
              kiwe@gmail.com
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col items-start md:flex-row md:items-center md:px-14 px-6 mb-4">
        <Link href="/">
          <h1 className="font-['NeueMontreal-Regular'] mb-4 font-semibold text-4xl">
            kíwë
          </h1>
        </Link>
        <div>
          <h1 className="font-['NeueMontreal-Regular'] font-thin text-md">
            © kíwë design 2024.
          </h1>
        </div>
        <div>
          <h1 className='font-["NeueMontreal-Regular"] font-thin text-md'>
            Website by Sourav & Ankan
          </h1>
        </div>
      </div>
    </div>
  );
}
