// import React from "react";
// import { portfolios } from "@/utils/ProyectsTorender";
// import { Swiper, SwiperSlide } from "swiper/react";
// import {
//   IconCode,
//   IconArrowRight,
//   IconArrowBigRight,
// } from "@tabler/icons-react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Pagination } from "swiper/modules";

// const Proyectos = ({ isEnglish }: { isEnglish: boolean }) => {
//   return (
//     <section className="flex flex-col justify-center h-screen dark:text-[#eeeeee]">
//       <div>
//         <h3 className="text-4xl font-bold mb-16">
//           <span className="text-3xl">{"<"} </span>
//           {isEnglish ? "Projects" : "Proyectos"}
//           <span className="text-3xl ml-1">{"/>"}</span>
//         </h3>
//         <div className="flex flex-col justify-between gap-10 ">
//           <p className="text-xl mb-4">
//             {isEnglish
//               ? "These are my completed projects, I look forward to your feedback!"
//               : "Estos son mis proyectos concluidos, ¡espero tu feedback!"}
//           </p>
//           <Swiper
//             slidesPerView={3}
//             spaceBetween={30}
//             pagination={{
//               clickable: true,
//             }}
//             modules={[Pagination]}
//             className="mySwiper"
//             style={{ width: "100%", height: "25.5rem" }}
//           >
//             {portfolios.map((item) => (
//               <SwiperSlide key={item.id} className="swiper-slide">
//                 <>
//                   <div className="flex flex-row justify-evenly">
//                     <a href={item.code} target="_blank">
//                       <IconCode
//                         size={24}
//                         className="hover:text-[#d36e70] transition-colors"
//                       />
//                     </a>
//                     <p className="text-lg font-bold cursor-default">
//                       {item.title}
//                     </p>
//                     <a href={item.href}>
//                       <IconArrowRight
//                         size={24}
//                         className="hover:text-[#d36e70] transition-colors"
//                       />
//                     </a>
//                   </div>
//                   <div className="relative mt-4">
//                     <img
//                       src={item.src}
//                       alt={item.title}
//                       className="w-full h-80 transition-opacity duration-300 group-hover:opacity-0"
//                     />
//                     <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-80 group-hover:bg-opacity-0">
//                       <p className="text-lg cursor-default">
//                         {isEnglish ? item.parrafoEng : item.parrafo}
//                       </p>
//                     </div>
//                   </div>
//                 </>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Proyectos;
