import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = "" }) => {
  return (
    <section className={`bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-8 ${className}`}>
      <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b-2 border-blue-100 pb-2 inline-block">
        {title}
      </h2>
      <div className="text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
};

export default Section;