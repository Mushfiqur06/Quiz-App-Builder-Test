import React from "react";
import HeroBg from "../../../assets/images/hero_bg.jpeg";
import World from "../../../assets/images/world.png";
import "styled-components/macro";

export default function Slider() {
  return (
    <div className=''>
      <div className='relative'>
        <img src={HeroBg} alt='' />
        <div className='absolute bottom-0 right-16'>
          <img
            src={World}
            alt=''
            css={`
              width: 500px;
            `}
          />
        </div>

        <div
          className='absolute top-2/4 left-32'
          css={`
            margin-bottom: -50%;
          `}
        >
          <h2
            className='text-white font-bold'
            css={`
              font-size: 50px;
            `}
          >
            Grasp the World of <br /> Knowledge{" "}
          </h2>
          <p className='text-white'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />{" "}
            Dolore, illo unde harum recusandae{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
