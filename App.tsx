import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Section from './components/Section';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl space-y-12">
        
        {/* Profile Summary */}
        <Section title="Profile Summary">
          <p className="text-lg">
            I am a driven and results-oriented marketing professional with a degree in <strong>Marketing Management</strong> from <strong>Addis Ababa University (AAU)</strong>. 
            With experience in sales and marketing at <strong>Enjoy General Trading</strong>, I have developed strong skills in communication, problem-solving, research, and collaboration. 
            I am passionate about leveraging my skills to contribute to innovative business solutions and drive growth in dynamic environments.
          </p>
        </Section>

         {/* AI Tool Showcase - Positioned high for visibility as a featured project */}
        <section className="animate-fade-in-up">
           <ImageEditor />
        </section>

        {/* Education */}
        <Section title="Education">
          <ul className="space-y-4">
            <li className="flex flex-col md:flex-row md:justify-between md:items-start border-l-4 border-blue-200 pl-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Bachelor’s Degree in Marketing Management</h3>
                <p className="text-slate-600">Addis Ababa University (AAU)</p>
                <p className="text-sm text-slate-500 mt-2 italic">Studied marketing strategies, consumer behavior, digital marketing, and market research</p>
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 md:mt-0 self-start">Graduated: [Year]</span>
            </li>
            <li className="flex flex-col md:flex-row md:justify-between md:items-start border-l-4 border-blue-200 pl-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Diploma in Broadcast Journalism</h3>
                <p className="text-slate-600">[Institution Name]</p>
                <p className="text-sm text-slate-500 mt-2 italic">Focused on media production, news reporting, and communication ethics</p>
              </div>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mt-2 md:mt-0 self-start">Graduated: [Year]</span>
            </li>
          </ul>
        </Section>

        {/* Professional Experience */}
        <Section title="Professional Experience">
          <ul className="space-y-6">
            <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-600 before:rounded-full">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900">Sales and Marketing Expert</h3>
                <span className="text-slate-500 font-medium">Enjoy General Trading</span>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-700 ml-2">
                <li>Managed client relationships and generated new business opportunities.</li>
                <li>Developed and executed marketing strategies to promote products and services.</li>
                <li>Conducted market research to optimize sales processes.</li>
                <li>Led product presentations, campaigns, and promotional events.</li>
                <li>Analyzed competitor activities and market conditions.</li>
              </ul>
            </li>
          </ul>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="flex flex-wrap gap-3">
            {[
              "Verbal & Written Communication",
              "Critical Thinking & Problem-Solving",
              "Research & Analysis",
              "Team Collaboration",
              "Networking & Socializing",
              "Driving"
            ].map((skill, index) => (
              <span 
                key={index} 
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-100 transition-colors cursor-default border border-blue-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="Key Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Market Research</h3>
              <p className="text-slate-600 text-sm">Conducted comprehensive analysis for Enjoy General Trading, identifying key competitors and customer preferences to formulate a targeted sales strategy.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg mb-2 text-slate-900">Promotional Campaigns</h3>
              <p className="text-slate-600 text-sm">Developed and executed high-impact campaigns that significantly boosted product awareness and sales volume during key quarters.</p>
            </div>
          </div>
        </Section>

        {/* Languages */}
        <Section title="Languages">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
               <span className="font-bold text-slate-700">English</span>
               <span className="text-xs uppercase font-bold tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded">Fluent</span>
             </div>
             <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg">
               <span className="font-bold text-slate-700">Amharic</span>
               <span className="text-xs uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">Native Speaker</span>
             </div>
           </div>
        </Section>

      </main>

      <Footer />
    </div>
  );
};

export default App;