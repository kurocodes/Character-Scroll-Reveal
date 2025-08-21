import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { data } from "../assets/assets";
import "../styles/parallaxStyles.css";
import { useRef } from "react";

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default function ParallaxScroll() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="max-sm:ml-20">
      {data.map((character, idx) => (
        <Image key={idx} character={character} />
      ))}
      <motion.div
        className="fixed left-0 right-0 h-[5px] bg-[#8df0cc] bottom-[50px]"
        style={{ transform: "scaleX(0)", scaleX }}
      />
    </div>
  );
}

export function Image({ character }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen snap-start flex flex-col items-center justify-center relative">
      <div
        ref={ref}
        className="w-[200px] h-[333px] sm:w-[300px] sm:h-[500px] lg:m-5 overflow-hidden"
      >
        <motion.img
          src={character.image}
          alt={character.name}
          className="w-full h-full rounded-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </div>
      <motion.h2
        className={`m-0 text-[30px] sm:text-[50px] font-bold tracking-[-3px] leading-[0.8] absolute inline-block text-[#8df0cc] characterName ${
          character.name === "Son Goku" ? "w-25" : "w-[181px]"
        }`}
        style={{
          y,
        }}
      >
        {character.name}
      </motion.h2>
      <motion.p
        className={`absolute w-50 sm:w-75 text-white font-light text-sm sm:text-lg ${
          character.name === "Monkey D. Luffy" ? "sm:mt-14" : "mt-3"
        } characterDesc`}
        style={{
          y,
        }}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {character.description}
      </motion.p>
    </section>
  );
}
