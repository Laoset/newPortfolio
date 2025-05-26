'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type projectsType = {
  title: string;
  description: string;
  techTitle: string;
  tech: string[];
  workingKeys: string[];
  company: string;
  time: string;
  country: string;
  workingTitle: string;
};

const WorkingExperience = () => {
  const t = useTranslations('Experience');
  const experienceList = t.raw('workingExperience');
  return (
    <motion.section
      id="workingexperience"
      className="section flex flex-col h-auto dark:text-[#bbb] mt-[80px] lg:mt-[160px]"
      initial={{ opacity: 0, y: 150 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="lg:text-4xl text-3xl font-bold mb-4 lg:mb-16 dark:text-[#ddd]">
        {t('title')}
      </h3>
      <p className="text-[18px] m:text-xl mb-[40px] lg:mb-16">
        {t('description')}
      </p>
      <div className="flex flex-col justify-between lg:gap-4">
        <div className="flex flex-col justify-between items-center gap-[2.25rem]">
          {experienceList.map((exp: projectsType, index: number) => {
            return (
              <motion.div
                key={index}
                className="rounded-lg bg-card text-card-foreground group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 card dark:bg-[#e7e6ece0] max-w-full w-full"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="flex flex-col space-y-1.5 p-6 pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h3 className="leading-none tracking-tight text-xl font-semibold text-gray-900 mb-2">
                            {exp.title}
                          </h3>

                          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                            <p className="text-lg font-semibold text-gray-700">
                              {exp.company}
                            </p>
                            <div className="flex items-center gap-1">
                              {exp.time}
                            </div>
                            <div className="flex items-center gap-1">
                              {exp.country}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {exp.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        {exp.techTitle}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, techIndex) => (
                          <div
                            key={techIndex}
                            className="px-2 py-1 bg-gray-200 rounded-full text-sm font-medium text-gray-700 cursor-default"
                          >
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>

                    {exp.workingKeys && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          {exp.workingTitle}
                        </h4>
                        <ul className="space-y-2">
                          {exp?.workingKeys.map((achievement, achIndex) => (
                            <li
                              key={achIndex}
                              className="flex items-start gap-3 text-gray-700"
                            >
                              <div className="w-2 h-2 bg-[#BB2649] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default WorkingExperience;
