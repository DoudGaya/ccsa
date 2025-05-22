'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronDown, ExternalLink } from 'lucide-react';

export default function EducationalInstitutions() {
  interface Institution {
    type: string;
    category: string;
    name: string;
    shortName: string;
    url: string;
  }

  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this from an API
    // For this example, we'll import it directly
    import('../../lib/universities.json')
      .then((data) => {
        setInstitutions(data.default);
        setFilteredInstitutions(data.default);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading institutions data:', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (institutions.length > 0) {
      let filtered = institutions;

      if (selectedType !== 'All') {
        filtered = filtered.filter(institution => institution.type === selectedType);
      }

      if (selectedCategory !== 'All') {
        filtered = filtered.filter(institution => institution.category === selectedCategory);
      }

      if (searchTerm.trim() !== '') {
        filtered = filtered.filter(institution => 
          institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          institution.shortName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredInstitutions(filtered);
    }
  }, [searchTerm, selectedType, selectedCategory, institutions]);

  // @ts-ignore
  const uniqueTypes = ['All', ...new Set(institutions.map(institution => institution.type))];
  //@ts-ignore
  const uniqueCategories = ['All', ...new Set(institutions.map(institution => institution.category))];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nigerian Educational Institutions Directory
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search institutions..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Type filter */}
            <div className="relative">
              <select
                className="w-full p-2 border rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {uniqueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
            </div>

            {/* Category filter */}
            <div className="relative">
              <select
                className="w-full p-2 border rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Results count */}
          <p className="text-gray-600 mb-4">
            Showing {filteredInstitutions.length} of {institutions.length} institutions
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className={`p-1 ${
                  institution.category === 'Federal' ? 'bg-green-500' : 
                  institution.category === 'State' ? 'bg-blue-500' : 'bg-purple-500'
                }`}></div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${
                        institution.type === 'University' ? 'bg-blue-100 text-blue-800' : 
                        institution.type === 'Polytechnic' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {institution.type}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{institution.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{institution.shortName}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">{institution.category}</span>
                    <a 
                      href={institution.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      Visit Website
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredInstitutions.length === 0 && !isLoading && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">No institutions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
// 'use client';

// import { useState, useEffect } from 'react';
// import { Search, ChevronDown, ExternalLink } from 'lucide-react';

// export default function EducationalInstitutions() {
//   const [institutions, setInstitutions] = useState([]);
//   const [filteredInstitutions, setFilteredInstitutions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedType, setSelectedType] = useState('All');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // In a real application, you would fetch this from an API
//     // For this example, we'll import it directly
//     import('../../lib/universities.json')
//       .then((data) => {
//         setInstitutions(data.default);
//         setFilteredInstitutions(data.default);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error loading institutions data:', error);
//         setIsLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (institutions.length > 0) {
//       let filtered = institutions;

//       if (selectedType !== 'All') {
//         filtered = filtered.filter(institution => institution.type === selectedType);
//       }

//       if (selectedCategory !== 'All') {
//         filtered = filtered.filter(institution => institution.category === selectedCategory);
//       }

//       if (searchTerm.trim() !== '') {
//         filtered = filtered.filter(institution => 
//           institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           institution.shortName.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       setFilteredInstitutions(filtered);
//     }
//   }, [searchTerm, selectedType, selectedCategory, institutions]);

//   const uniqueTypes = ['All', ...new Set(institutions.map(institution => institution.type))];
//   const uniqueCategories = ['All', ...new Set(institutions.map(institution => institution.category))];

//   return (
//     <div className="bg-gray-50 min-h-screen py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
//           Nigerian Educational Institutions Directory
//         </h1>

//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             {/* Search input */}
//             <div className="relative">
//               <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search institutions..."
//                 className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>

//             {/* Type filter */}
//             <div className="relative">
//               <select
//                 className="w-full p-2 border rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={selectedType}
//                 onChange={(e) => setSelectedType(e.target.value)}
//               >
//                 {uniqueTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
//             </div>

//             {/* Category filter */}
//             <div className="relative">
//               <select
//                 className="w-full p-2 border rounded-md appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 {uniqueCategories.map((category) => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
//             </div>
//           </div>

//           {/* Results count */}
//           <p className="text-gray-600 mb-4">
//             Showing {filteredInstitutions.length} of {institutions.length} institutions
//           </p>
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredInstitutions.map((institution, index) => (
//               <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//                 <div className={`p-1 ${
//                   institution.category === 'Federal' ? 'bg-green-500' : 
//                   institution.category === 'State' ? 'bg-blue-500' : 'bg-purple-500'
//                 }`}></div>
//                 <div className="p-6">
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${
//                         institution.type === 'University' ? 'bg-blue-100 text-blue-800' : 
//                         institution.type === 'Polytechnic' ? 'bg-green-100 text-green-800' : 
//                         'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {institution.type}
//                       </span>
//                       <h3 className="text-lg font-bold text-gray-800 mb-1">{institution.name}</h3>
//                       <p className="text-sm text-gray-600 mb-4">{institution.shortName}</p>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium text-gray-500">{institution.category}</span>
//                     <a 
//                       href={institution.url} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
//                     >
//                       Visit Website
//                       <ExternalLink size={14} className="ml-1" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {filteredInstitutions.length === 0 && !isLoading && (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <p className="text-gray-600">No institutions found matching your criteria.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }